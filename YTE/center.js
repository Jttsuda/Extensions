const re = /https:\/\/www.youtube.com\/results/;
const input = document.querySelector("input");

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

function setMargin() {
    waitForElm('ytd-search').then((elm) => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 2500) {elm.style.marginLeft = '20%';}
        else if (windowWidth > 1900) {elm.style.marginLeft = '10%';}
    });
}

function centerContent() {
    if (re.test(window.location.href)) setMargin();
}

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") setMargin();
});

window.onclick = centerContent;
window.onresize = centerContent;
centerContent();