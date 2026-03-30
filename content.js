chrome.storage.local.get(["targetScroll"], (data) => {
    if (data.targetScroll && data.targetScroll.url === window.location.href) {
        setTimeout(() => {
            window.scrollTo({
                top: data.targetScroll.y,
                behavior: 'smooth'
            })
        }, 600)
        
        chrome.storage.local.remove("targetScroll")
    }
})