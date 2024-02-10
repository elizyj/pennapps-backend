/* Dropdown menus*/
let dropdowns = document.getElementsByClassName("dropdown");

for (let i = 0; i < dropdowns.length; i++) {
    let currSelect = dropdowns[i].getElementsByTagName("select")[0];

    /* Create clickable div that will display the options */
    let selected = document.createElement("DIV");
    selected.setAttribute("class", "select-selected");
    selected.innerHTML = currSelect.options[currSelect.selectedIndex].innerHTML;
    /*  Create div containing all the options with display toggled by previous div  */
    let choices = document.createElement("DIV");
    choices.setAttribute("class", "dropdown-items select-hidden");

    for (let j = 0; j < currSelect.length; j++) {
        let choice = document.createElement("DIV");
        choice.innerHTML = currSelect.options[j].innerHTML;
        choice.onclick = function (e) {
            let parentSelect = this.parentNode.parentNode.getElementsByTagName("select")[0];
            let displ = this.parentNode.previousSibling;
            for (let k = 0; k < parentSelect.length; k++) {
                if (parentSelect.options[k].innerHTML == this.innerHTML) {
                    parentSelect.selectedIndex = k;
                    displ.innerHTML = this.innerHTML;
                    let toUpdate = this.parentNode.getElementsByClassName("update-select");
                    for (let l = 0; l < toUpdate.length; k++) {
                        toUpdate[l].removeAttribute("class");
                    }
                    this.setAttribute("class", "update-select");
                    break;
                }
            }
            displ.click();
        }
        choices.appendChild(choice);
    }

    dropdowns[i].appendChild(selected);
    dropdowns[i].appendChild(choices);

    /* Close other dropdowns and open or close the current one */
    if (!currSelect.disabled) {
        selected.addEventListener("click", function (e) {
            e.stopPropagation();
            closeAllSelected(this);
            this.nextSibling.classList.toggle("select-hidden");
            this.classList.toggle("select-arrow-active");
        });
    }
}

/* Close all dropdowns */
const closeAllSelected = (el) => {
    let arr = [];
    let items = document.getElementsByClassName("dropdown-items");
    let selected = document.getElementsByClassName("select-selected");
    for (let i = 0; i < selected.length; i++) {
        if (el == selected[i]) {
            arr.push(i)
        } else {
            selected[i].classList.remove("select-arrow-active");
        }
    }

    for (let i = 0; i < items.length; i++) {
        if (arr.indexOf(i)) {
            items[i].classList.add("select-hidden");
        }
    }
}

/* If the user clicks anywhere outside the select box, close all select boxes: */
document.addEventListener("click", closeAllSelected);
