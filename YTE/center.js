const re1 = /https:\/\/www.youtube.com*/;
const re2 = /https:\/\/www.youtube.com\/results*/;

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function centerContent() {
    if (re2.test(window.location.href)) {
        waitForElm('ytd-search').then((elm) => {
            elm.style.marginLeft = '20%';
        });
    }
}

if (re1.test(window.location.href)) {
    centerContent();
    window.onclick = centerContent;
}
