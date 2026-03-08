let myLeads = []
const inputEl = document.getElementById("input-el")
const saveInput = document.getElementById("saveinput-btn")
const saveTab = document.getElementById("savetab-btn")
const deleteAll = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const warningEl = document.getElementById("warning-el") // Grab the warning element
const leadLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadLocalStorage) {
    myLeads = leadLocalStorage
    render(myLeads)
}

inputEl.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        saveInput.click() // Simulate a button click
    }
})

inputEl.addEventListener("input", function() {
    warningEl.textContent = ""
})

saveInput.addEventListener("click", function() {
    // Check if input is NOT empty
    if (inputEl.value.trim() !== "") {
        myLeads.push(inputEl.value.trim())
        inputEl.value = ""
        warningEl.textContent = "" // Clear any existing warning
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    } else {
        // Show the warning message if it IS empty
        warningEl.textContent = "Please enter a valid link or text!"
    }
})

saveTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteAll.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

ulEl.addEventListener("click", function(e) {
    if (e.target.classList.contains("trash-icon")) {
        const index = e.target.getAttribute("data-index")
        myLeads.splice(index, 1) 
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})

function render(leads) {
    let myList = "" 
    for (let i = 0; i < leads.length; i++) {
        myList += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
                <img src="trash.png" class="trash-icon" data-index="${i}" alt="Delete">
            </li>
        `
    }
    ulEl.innerHTML = myList
}