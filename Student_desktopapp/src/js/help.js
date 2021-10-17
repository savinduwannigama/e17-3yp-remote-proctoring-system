/* This can be an external module */
class Collapse {
    constructor(prefix = "collapse") {
        this.prefix = prefix;
        this.collapseList = [...document.getElementsByClassName(prefix)];
        registerCollapses(this);
        registerClickHandler(this);
    }
}

function registerCollapses(collapse) {
    let idCount = 0;
    collapse.collapseList.forEach((cl) => {
        if (cl.classList && cl.classList.contains(collapse.prefix)) {
            let nodeList = [...cl.childNodes].filter((cn) => cn.nodeName == "DIV");
            nodeList[0].dataset.toggle = idCount;
            nodeList[0].dataset.after = ">";
            nodeList[1].dataset.id = idCount;
            idCount++;
        }
    });
}

function registerClickHandler(collapse) {
    const collapses = document.getElementsByClassName(`${collapse.prefix}-title`);
    [...collapses].forEach((c) => {
        c.addEventListener("click", () => {
            const id = c.dataset.toggle;
            const body = document.querySelector(`[data-id="${id}"]`);
            [...collapses].forEach((t) => {
                t.dataset.after = ">";
            });
            const bodies = document.getElementsByClassName(`${collapse.prefix}-body`);
            [...bodies].forEach((b) => {
                if (b != body) b.style.display = "none";
            });
            if (body.style.display == "none") {
                body.style.display = "block";
                c.dataset.after = "^";
            } else {
                body.style.display = "none";
            }
        });
    });
}

/* This is the code to add in the script file*/
/* The parameter should be the prefix of the Collapse */
new Collapse("collapse");