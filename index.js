// Popup screen
const homePopup = document.getElementById("homePopup")
const newNotePopup = document.getElementById("newNotePopup")

//  Home popup buttons
const newNotebtn = document.getElementById("new-btn")
const deleteAllbtn = document.getElementById("delete-btn")

// Newnote popup buttons
const savebtn = document.getElementById("save-btn")
const cancelbtn = document.getElementById("cancel-btn")

// Event listeners - Home page
newNotebtn.addEventListener("click", newNote)
deleteAllbtn.addEventListener("dblclick", deleteAllNotes)
deleteAllbtn.addEventListener("click", function(){
    toast("Double click to Delete all")
})

// Event listeners - New Note Page
savebtn.addEventListener("click", saveNotes)
cancelbtn.addEventListener("click", quitNoteMaking)

// Refresh list
setInterval(renderNotes,100);

function newNote() {
    homePopup.style.display = 'none'
    newNotePopup.style.display = 'flex'
}

function deleteAllNotes() {
    if(localStorage){
        localStorage.clear()
        toast("Deleted all Notes")
        renderNotes()
    }
}

function saveNotes() {
    const noteTitle = document.getElementById("title")
    const notes = document.getElementById("Note")
    let Notes = JSON.parse( localStorage.getItem("myNotes") ) || []
    if (noteTitle.value && notes.value) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            console.log(tabs)
            console.log(tabs[0])
            const url = new URL(tabs[0].url)
            Notes.push([tabs[0].favIconUrl, url.hostname, tabs[0].url, noteTitle.value, notes.value])
            localStorage.setItem("myNotes", JSON.stringify(Notes))
            noteTitle.value = ''
            notes.value = ''
        })
        homePopup.style.display = 'block'
        newNotePopup.style.display = 'none'
        toast("Notes Saved")
        renderNotes()
        }
    else {
        if (noteTitle.value) {
            toast("Notes can't be blank")
        }
        else {
            toast("Title can't be blank")
        }
    }
}

function toast(message) {
    var x = document.getElementById("toast");
    x.innerText = message
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000)
}

function quitNoteMaking() {
    document.getElementById("title").value = ''
    document.getElementById("Note").value = ''
    homePopup.style.display = 'block'
    newNotePopup.style.display = 'none'
}

async function renderNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("myNotes")) || []
    const notesList = document.getElementById("noteList")
    notesList.innerHTML = ""
    /*
    const headerLi = document.createElement("li")
    const headerSpan = document.createElement("span")
    const titleHeader = document.createElement("p")
    const siteHeader = document.createElement("p")
    const notesHeader = document.createElement("p")
    headerSpan.id = "titleTag"
    titleHeader.textContent = "Title"
    siteHeader.textContent = "Site"
    notesHeader.textContent = "Notes"
    headerSpan.appendChild(titleHeader)
    headerSpan.appendChild(siteHeader)
    headerSpan.appendChild(notesHeader)
    headerLi.appendChild(headerSpan)
    notesList.appendChild(headerLi)
    */

    for (let i = 0; i < savedNotes.length; i++) {
        const [favIconUrl, domain, url, title, note] = savedNotes[i]
        
        // HTML tags creation
        const li = document.createElement("li")
        const span = document.createElement("span")
        const img = document.createElement("img")
        const domainName = document.createElement("p")
        const noteTitle = document.createElement("p")
        const link = document.createElement("a")
        const notes = document.createElement("p")

        // img
        img.src = favIconUrl
        img.alt = "Site icon"

        // link
        link.href = url
        link.target = "_blank"
        link.textContent = domain

        // p tag items
        noteTitle.textContent = title
        notes.textContent = note
        
        // appending tags
        /* 
        0-> li
        1-> span
        2-> img
        3-> domain
        4-> noteTitle
        5-> notes

        example:
        <li>
            <span>
                <img src=${favIconUrl} alr = "Site icon"/>
                <p id="domain"><a id = "link" href= ${url} target="_blank">${domainName}</a></p>
                <p id="noteTtile">${title}</p>
                <p id ="notes">${note}</p>
            </span>
        </li>
        */
        domainName.appendChild(link)
        span.appendChild(img)
        span.appendChild(domainName)
        span.appendChild(noteTitle)
        span.appendChild(notes)
        li.appendChild(span)
        notesList.appendChild(li)
    }
    
    /* 
    Old cold didn't work for a tag as expected so re-write it with JS Html DOM creations

    let savedNotes = JSON.parse( localStorage.getItem("myNotes") ) || []
    const notesList = document.getElementById("noteList")
    let listItems = 
            <li>
                <span id = "titleTag"><p>Title</p><p>Site</p><p>Notes</p></span>
            </li>
            
    count = savedNotes.length 
    for(let _ = 0; _ < count; _++){
        listItems += 
        <li>
            <span><p>${savedNotes[_][0]}</p><p><a target='_blank' href='${tabURL}'>${savedNotes[_][1]}</a></p><p>${savedNotes[_][2]}</p></span>
        </li>
    
    }
    notesList.innerHTML = listItems
    */
}
