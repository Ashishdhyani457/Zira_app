let TC = document.querySelector(".ticket-container");
let allfilters = document.querySelectorAll(".filter");
let deletebutton = document.querySelector(".delete");
let modelvisible = false;
let selectedpriority = "pink";
let selectedticketcolor = undefined;
function loadticket(priority) {
    let alltaskdata = localStorage.getItem("alltask");
  if (alltaskdata != null) {
    let data = JSON.parse(alltaskdata);
        if(priority){
            data=data.filter(function(ticket){
                return ticket.selectedpriority==priority;
            })
        }
      TC.innerHTML="";
        for (let i = 0; i < data.length; i++) {
            let ticket = document.createElement("div");
            ticket.classList.add("ticket")
            ticket.innerHTML = `<div class="ticket-color ticket-color-${data[i].selectedpriority}"></div>
            <div class="ticket-id">${data[i].taskid}</div>
            <div class="task">
             ${data[i].task}
        </div>`;
            ticket.addEventListener("click", function (e) {
                if (e.currentTarget.classList.contains("active")) {
                    e.currentTarget.classList.remove("active");
                } else {
                    e.currentTarget.classList.add("active");
                }
            });
            TC.appendChild(ticket);
        }
    }
}

loadticket();


for (let i = 0; i < allfilters.length; i++) {
    allfilters[i].addEventListener("click", filterhandler);
}
function filterhandler(e) {
    if (e.currentTarget.classList.contains("active")) {
        e.currentTarget.classList.remove("active");
        loadticket();
    } else {
        let selectedfilter = document.querySelector(".filter.active");
        if (selectedfilter != null) {
            selectedfilter.classList.remove("active");
        }
        e.currentTarget.classList.add("active");
        loadticket(e.currentTarget.children[0].classList[0].split("-")[0]);
    }

    //    if(e.currentTarget.classList.contains("active")){
    //        e.currentTarget.classList.remove("active");
    //    }
    //    else{
    //         e.currentTarget.classList.add("active");
    //    }
}

let addbutton = document.querySelector(".add");
addbutton.addEventListener("click", showmodel);
function showmodel(e) {
    if (!modelvisible) {
        let model = document.createElement("div");
        model.classList.add("model")
        model.innerHTML = `<div class="input-container" data-type="false" contenteditable="true">
    <span class="placeholder">Enter your text here!</span>
</div>

<div class="priority-list">
<div class="pink-model-filter model-filter active"></div>
<div class="blue-model-filter model-filter"></div>
<div class="black-model-filter model-filter"></div>
<div class="green-model-filter model-filter"></div>
</div>`;
        TC.appendChild(model);
        selectedpriority = "pink";
        let tasktyper = document.querySelector(".input-container")
        tasktyper.addEventListener("click", function (e) {
            if (e.currentTarget.getAttribute("data-type") == "false") {
                e.currentTarget.innerHTML = "";
                e.currentTarget.setAttribute("data-type", "true")
            }

        })
        tasktyper.addEventListener("keypress", addticket.bind(this, tasktyper));
        modelvisible = true;
        let modelfilters = document.querySelectorAll(".model-filter");
        for (let i = 0; i < modelfilters.length; i++) {
            modelfilters[i].addEventListener("click", selectpriority);
        }
    }
}

function selectpriority(e) {
    let activefilter = document.querySelector(".model-filter.active");
    activefilter.classList.remove("active");
    selectedpriority = e.currentTarget.classList[0].split("-")[0];
    e.currentTarget.classList.add("active");
}
function addticket(tasktyper, e) {
    if (e.key == "Enter" && tasktyper.innerText.trim() != "") {
    //     let ticket = document.createElement("div");
    //     ticket.classList.add("ticket")
        let id = uid();
        let task = tasktyper.innerText;
    //     ticket.innerHTML = `<div class="ticket-color ticket-color-${selectedpriority}"></div>
    //     <div class="ticket-id">${id}</div>
    //     <div class="task">
    //      ${task}
    // </div>`;
        document.querySelector(".model").remove();
        modelvisible = false;

    //     ticket.addEventListener("click", function (e) {
    //         if (e.currentTarget.classList.contains("active")) {
    //             e.currentTarget.classList.remove("active");
    //         } else {
    //             e.currentTarget.classList.add("active");
    //         }
    //     });
    //     TC.appendChild(ticket);
        let alltaskdata = localStorage.getItem("alltask");
        if (alltaskdata == null) {
            data = [{ "taskid": id, "task": task, "selectedpriority": selectedpriority }];
            localStorage.setItem("alltask", JSON.stringify(data));
        } else {
            let data = JSON.parse(alltaskdata);
            data.push({ "taskid": id, "task": task, "selectedpriority": selectedpriority });
            localStorage.setItem("alltask", JSON.stringify(data));
        }
        let selectedfilter = document.querySelector(".filter.active");
        if(selectedfilter){
            let priority=selectedfilter.children[0].classList[0].split("-")[0];
            loadticket(priority);
        }else{
            loadticket();
        }
        
    }
    
    else if (e.key == "Enter") {
        e.preventDefault();
        alert("you have not typed anything");
    }
}

deletebutton.addEventListener("click", function (e) {
    let selectedtickets = document.querySelectorAll(".ticket.active");
    let alltasks = JSON.parse(localStorage.getItem("alltask"));
    for (let i = 0; i < selectedtickets.length; i++) {
        selectedtickets[i].remove();
        alltasks = alltasks.filter(function (data) {
            return data.taskid != selectedtickets[i].querySelector(".ticket-id").innerText;
        })
        localStorage.setItem("alltask", JSON.stringify(alltasks));
    }
})

