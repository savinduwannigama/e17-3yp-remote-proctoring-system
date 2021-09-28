var NotificationJSON = '{"sender":["Dr Isuru Nawinna","Dr Mahanama Wikramasinghe","Dr Isuru Nawinna"], "messege":["3YP: Note that we\'re starting the sesseion early tonight.Please join by 7.50 pm ", "Please enrol in the mock exam course on FoEOAS and make sure everything is fine.Read the exam candidate guidelines.Join the exam room no later than 4 PM.Some rooms may open early.", "CO321: Mech group \'s project session at 1.00 pm today. Bring your designs!"]}';

function makeNotificationList(json) {

    var array = JSON.parse(json);
    var nofications = array.sender.length

    // Create the list element:
    var list = document.getElementById('notificationPanel');

    if (nofications == 0) {
        var error = document.createElement('p');
        error.className = 'error';
        error.innerHTML = "no notification"
        list.appendChild(error);
    }



    for (var i = 0; i < nofications; i++) {
        // Create the list item:
        var item = document.createElement('div');
        var sender = document.createElement('div');
        var messege = document.createElement('div');

        // Set its contents:
        item.className = 'collapse'
        sender.className = 'collapse-title'
        messege.className = 'collapse-body'
        messege.id = i.toString();

        sender.innerHTML = array.sender[i];
        messege.innerHTML = array.messege[i];

        item.appendChild(sender);
        item.appendChild(messege);

        // Add it to the list:
        list.appendChild(item);
    }

}

makeNotificationList(NotificationJSON)



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




function myFunction() {
    // Declare variables
    var input, filter, ul, li, name, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('notificationPanel');
    li = ul.getElementsByClassName('collapse');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        name = li[i].getElementsByTagName("div")[1];
        txtValue = name.textContent || name.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            color(filter, name.id)
        } else {
            li[i].style.display = "none";
        }
    }
}

function color(textToSearch, id) {
    let paragraph = document.getElementById(id)
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let pattern = new RegExp(`${textToSearch}`, "gi");

    paragraph.innerHTML = paragraph.textContent.replace(pattern, match => `<mark>${match}</mark>`)
}