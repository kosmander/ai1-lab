const msg: string = "Hello!";
alert(msg);

const stylesDictionary: Record<string, string> = {
    "Style #1": "style-1.css",
    "Style #2": "style-2.css",
    "Style #3": "style-3.css"
};

let currentStyle: string = "Style #1";

function changeStyle(styleName: string): void {
    const styleFileName = stylesDictionary[styleName];

    const oldStyleLink = document.getElementById('dynamic-style');
    if (oldStyleLink) {
        oldStyleLink.remove();
    }

    const head = document.head;
    const newStyleLink = document.createElement('link');
    newStyleLink.id = 'dynamic-style';
    newStyleLink.rel = 'stylesheet';
    newStyleLink.href = styleFileName;

    head.appendChild(newStyleLink);

    currentStyle = styleName;
    console.log(`Style changed to: ${currentStyle}`);
}

function createStyleLinksArea(): void {
    const nav = document.createElement("nav");
    nav.id = 'style-switcher';

    const list = document.createElement('ul');

    Object.keys(stylesDictionary).forEach((styleName) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = "#";
        a.textContent = `Change style to: ${styleName}`;

        a.addEventListener('click', (e) => {
            e.preventDefault();
            changeStyle(styleName);
        });

        li.appendChild(a);
        list.appendChild(li);
    });

    nav.appendChild(list);

    document.body.prepend(nav);
}

document.addEventListener('DOMContentLoaded', () => {
    createStyleLinksArea();
    changeStyle(currentStyle);
})