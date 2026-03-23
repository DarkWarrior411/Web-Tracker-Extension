let myLeads = []
const inputEl = document.getElementById("input-el")
const saveInput = document.getElementById("saveinput-btn")
const saveTab = document.getElementById("savetab-btn")
const deleteAll = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const warningEl = document.getElementById("warning-el")
const leadLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadLocalStorage) {
    myLeads = leadLocalStorage
    render(myLeads)
}

function isDuplicate(urlToCheck) {
    return myLeads.some(lead => {
        if (typeof lead === 'string') return lead === urlToCheck
        return lead.url === urlToCheck
    })
}

inputEl.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        saveInput.click()
    }
})

inputEl.addEventListener("input", function() {
    warningEl.textContent = ""
})

saveInput.addEventListener("click", function() {
    const val = inputEl.value.trim()
    if (val !== "") {
        if (isDuplicate(val)) {
            warningEl.textContent = "Already saved in your list!"
            warningEl.style.color = "#ffaa00"
        } else {
            myLeads.push({ title: val, url: val })
            inputEl.value = ""
            warningEl.textContent = "" 
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        }
    } else {
        warningEl.textContent = "Please enter a valid link or text!"
        warningEl.style.color = "red"
    }
})

saveTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentUrl = tabs[0].url
        const currentTitle = tabs[0].title
        
        if (isDuplicate(currentUrl)) {
            warningEl.textContent = "This tab is already saved!"
            warningEl.style.color = "#ffaa00"
        } else {
            myLeads.push({ title: currentTitle, url: currentUrl })
            warningEl.textContent = ""
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        }
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
        const leadTitle = typeof leads[i] === 'string' ? leads[i] : leads[i].title
        const leadUrl = typeof leads[i] === 'string' ? leads[i] : leads[i].url
        
        myList += `
            <li>
                <a target="_blank" href="${leadUrl}">
                    ${leadTitle}
                </a>
                <img src="trash.png" class="trash-icon" data-index="${i}" alt="Delete">
            </li>
        `
    }
    ulEl.innerHTML = myList
}
