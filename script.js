
const btnSave = document.getElementById("btn-save");
const btnDelete = document.getElementById("btn-delete")
let inputEl = document.getElementById("input-el");
const renderItems = document.getElementById("show-items");
let btnSaveCurrent = document.getElementById("btn-save-current")

let set = {websites : [], titles : []} 
let x = JSON.parse(localStorage.getItem("websites"))

if (x != null){
    console.log("Websites")
    set = x
    renderSites(set)
}

btnSave.addEventListener("click", function(){
    let x = inputEl.value;
    if (x != ""){
        set.websites.unshift(x)
        let temp = prompt("Enter website name")
        if (temp == null) {
            set.titles.unshift("No website name given!!")
        }else {
            set.titles.unshift(temp)
        }
        inputEl.value = "" 
        localStorage.setItem("websites",JSON.stringify(set))
        renderSites(set)
    }else{
        alert("Input box is empty!!!")
    }
});

btnSaveCurrent.addEventListener("click", function(){
    
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        set.websites.unshift(tabs[0].url)
        set.titles.unshift(tabs[0].title)
        
        localStorage.setItem("websites",JSON.stringify(set))
        renderSites(set)
    })
})

function renderSites(sites){
    let listItems = ""
    
    for(let i=0; i<sites.websites.length; i+=1){
        // listItems += "<li> <a target='_blank' href='#'>"+websites[i]+"</a></li>";
        
        listItems += `
        <div class="sites">
            <li> 
                <p>${sites.titles[i]}</p>
                <a id="x" target='_blank' href='${sites.websites[i]}'>

                    ${sites.websites[i].length > 35? sites.websites[i].substring(0,35)+"..." : sites.websites[i]}
                </a>
            </li>
            <button class="delete"  id ="${i}">X</button>
        </div>
        ` 
    }//onClick="deleteSite(${i})"
    renderItems.innerHTML = listItems;
    deleteBtnWork()   
}

btnDelete.addEventListener("dblclick", function(){
    console.log("Clicked")
    localStorage.clear()
    set = {websites : [], titles : []} 
    renderSites(set)
    
});

function deleteBtnWork(){
    for(let i=0; i<set.websites.length; i+=1){
        document.getElementById(i).addEventListener("click", function(){
            deleteSite(i)
        })
    }
}



function deleteSite(index){ 
    set.websites.splice(index, 1)
    set.titles.splice(index, 1)
    localStorage.setItem("websites", JSON.stringify(set))
    set = JSON.parse(localStorage.getItem("websites"))
    renderSites(set)
}




// let openBox = document.getElementById("box");

// localStorage.setItem("myWebsites", "www.youtube.com")
// console.log(localStorage.getItem("myWebsites"))
// localStorage.clear()

//     let btn = document.querySelectorAll(".delete");
//     console.log(btn)
//     for(let i=0; i<websites.length; i+=1){
//         btn[i].addEventListener("click", function(){
//             console.log(btn[i].id)
//             deleteSite(btn[i].id)
//         })
//     }
// })

// const x = window.location.href
    // websites.push(x)
    // inputEl.value = ""
    // localStorage.setItem("websites",JSON.stringify(websites))
    // renderSites(websites);