let myLeads=[]
const inputEl=document.getElementById("input-el")
const saveInput=document.getElementById("saveinput-btn")
const saveTab=document.getElementById("savetab-btn")
const deleteAll=document.getElementById("delete-btn")
const ulEl=document.getElementById("ul-el")
const leadLocalStorage=JSON.parse(localStorage.getItem("myLeads"))

if(leadLocalStorage){
    myLeads=leadLocalStorage
    render(myLeads)
}

saveInput.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})

saveTab.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteAll.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

function render(leads){
    myList=""
    for(let i=0;i<leads.length;i++){
        myList+=`<li><a target="_blank" href="${leads[i]}">${leads[i]}
        </a>
        </li>`
    }
    ulEl.innerHTML=myList
}