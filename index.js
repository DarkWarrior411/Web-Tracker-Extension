let myLeads = []
const searchEl = document.getElementById("search-el")
const inputEl = document.getElementById("input-el")
const saveInput = document.getElementById("saveinput-btn")
const saveTab = document.getElementById("savetab-btn")
const deleteAll = document.getElementById("delete-btn")
const exportBtn = document.getElementById("export-btn")
const importBtn = document.getElementById("import-btn")
const importFile = document.getElementById("import-file")
const ulEl = document.getElementById("ul-el")
const warningEl = document.getElementById("warning-el")

chrome.storage.sync.get("myLeads", function(data) {
    if (data.myLeads) {
        myLeads = data.myLeads
        render(myLeads)
    }
})

function isDuplicate(urlToCheck) {
    return myLeads.some(lead => {
        if (typeof lead === 'string') return lead === urlToCheck
        return lead.url === urlToCheck
    })
}

searchEl.addEventListener("input", function(e) {
    const searchQuery = e.target.value.toLowerCase()
    const filteredLeads = myLeads.filter(lead => {
        const leadTitle = (typeof lead === 'string' ? lead : lead.title).toLowerCase()
        const leadUrl = (typeof lead === 'string' ? lead : lead.url).toLowerCase()
        return leadTitle.includes(searchQuery) || leadUrl.includes(searchQuery)
    })
    render(filteredLeads)
})

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
            myLeads.push({ title: val, url: val, scrollY: 0 })
            inputEl.value = ""
            searchEl.value = ""
            warningEl.textContent = "" 
            chrome.storage.sync.set({ myLeads: myLeads })
            render(myLeads)
        }
    } else {
        warningEl.textContent = "Please enter a valid link or text!"
        warningEl.style.color = "red"
    }
})

saveTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0]
        const currentUrl = currentTab.url
        const currentTitle = currentTab.title
        
        if (isDuplicate(currentUrl)) {
            warningEl.textContent = "This tab is already saved!"
            warningEl.style.color = "#ffaa00"
        } else {
            chrome.scripting.executeScript({
                target: {tabId: currentTab.id},
                func: () => window.scrollY
            }, (injectionResults) => {
                let scrollPos = 0
                if (injectionResults && injectionResults[0] && injectionResults[0].result) {
                    scrollPos = injectionResults[0].result
                }

                myLeads.push({ title: currentTitle, url: currentUrl, scrollY: scrollPos })
                searchEl.value = ""
                warningEl.textContent = ""
                chrome.storage.sync.set({ myLeads: myLeads })
                render(myLeads)
            })
        }
    })
})

deleteAll.addEventListener("dblclick", function() {
    chrome.storage.sync.remove("myLeads", function() {
        myLeads = []
        searchEl.value = ""
        render(myLeads)
    })
})

exportBtn.addEventListener("click", function() {
    const blob = new Blob([JSON.stringify(myLeads)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "web_tracker_backup.json"
    a.click()
    URL.revokeObjectURL(url)
})

importBtn.addEventListener("click", function() {
    importFile.click()
})

importFile.addEventListener("change", function(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result)
            if (Array.isArray(importedData)) {
                let newItemsAdded = 0
                importedData.forEach(item => {
                    const urlToCheck = typeof item === 'string' ? item : item.url
                    if (!isDuplicate(urlToCheck)) {
                        myLeads.push(item)
                        newItemsAdded++
                    }
                })
                
                if (newItemsAdded > 0) {
                    chrome.storage.sync.set({ myLeads: myLeads })
                    searchEl.value = ""
                    render(myLeads)
                    warningEl.textContent = `Successfully imported ${newItemsAdded} new items!`
                    warningEl.style.color = "rgb(5, 160, 5)"
                } else {
                    warningEl.textContent = "No new items to import (all duplicates)."
                    warningEl.style.color = "#ffaa00"
                }
            }
        } catch (err) {
            warningEl.textContent = "Invalid backup file!"
            warningEl.style.color = "red"
        }
    }
    reader.readAsText(file)
    e.target.value = "" 
})

ulEl.addEventListener("click", function(e) {
    if (e.target.classList.contains("trash-icon")) {
        const index = e.target.getAttribute("data-index")
        
        const deleteUrl = e.target.previousElementSibling.getAttribute("data-url")
        const actualIndex = myLeads.findIndex(lead => {
            const leadUrl = typeof lead === 'string' ? lead : lead.url
            return leadUrl === deleteUrl
        })

        if (actualIndex > -1) {
            myLeads.splice(actualIndex, 1) 
            chrome.storage.sync.set({ myLeads: myLeads })
            
            if (searchEl.value.trim() !== "") {
                const event = new Event('input')
                searchEl.dispatchEvent(event)
            } else {
                render(myLeads)
            }
        }
    } else if (e.target.classList.contains("lead-link")) {
        e.preventDefault() 
        const url = e.target.getAttribute("data-url")
        const scrollY = parseInt(e.target.getAttribute("data-scroll"), 10) || 0

        chrome.storage.local.set({ targetScroll: { url: url, y: scrollY } }, () => {
            chrome.tabs.create({ url: url })
        })
    }
})

function render(leads) {
    let myList = "" 
    for (let i = 0; i < leads.length; i++) {
        const leadTitle = typeof leads[i] === 'string' ? leads[i] : leads[i].title
        const leadUrl = typeof leads[i] === 'string' ? leads[i] : leads[i].url
        const leadScroll = leads[i].scrollY || 0
        
        myList += `
            <li>
                <a href="#" class="lead-link" data-url="${leadUrl}" data-scroll="${leadScroll}">
                    ${leadTitle}
                </a>
                <img src="trash.png" class="trash-icon" data-index="${i}" alt="Delete">
            </li>
        `
    }
    ulEl.innerHTML = myList
}