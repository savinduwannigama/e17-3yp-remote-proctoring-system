function sortListDir() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById("cards");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        b = list.getElementsByTagName("LI");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;

            if (dir == "asc") {
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function myFunction() {
    // Declare variables
    var input, filter, ul, li, name, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("cards");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        name = li[i].getElementsByTagName("p")[1];
        txtValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


var courseJSON = '{"code":["CO227","CO321","CO322","CO323","CO324","CO325","EE386"], "name":["Computer Engineering Project", "Embedded System", "Data Structure and Algorithm","Computer Communication","Network and Web Application","Computer and Network Security","Ellectronic II"]}';


function makeCourseList(json) {
    var array = JSON.parse(json);
    // Create the list element:
    var list = document.getElementById('cards');

    for (var i = 0; i < array.code.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        var code = document.createElement('p');
        var name = document.createElement('p');
        item.id = i.toString();

        // Set its contents:
        item.className = 'card'
        code.innerHTML = array.code[i];
        name.innerHTML = array.name[i];
        item.appendChild(code);
        item.appendChild(name);

        // Add it to the list:
        list.appendChild(item);
    }

}


makeCourseList(courseJSON);


var btn = document.getElementById("cards").getElementsByTagName('li')
var btncount = btn.length;
for (var i = 0; i < btncount; i += 1) {
    btn[i].onclick = function() {
        alert(this.id)
    }
}