// Popup screen
const homePopup = document.getElementById("homePopup")
const newNotePopup = document.getElementById("newNotePopup")
const fullViewNotePopup = document.getElementById("noteFullView")

//  Home popup buttons
const newNoteBTN = document.getElementById("new-btn")
const deleteAllBTN = document.getElementById("delete-all-btn")

// Newnote popup buttons
const saveBTN = document.getElementById("save-btn")
const cancelBTN = document.getElementById("cancel-btn")

// Full view popup buttons
const deleteNoteBTN = document.getElementById("deleteNote")
const saveEditBTN = document.getElementById("saveEdit")

// Note list unorder list
const notesList = document.getElementById("noteList")

// getting data from local storage
const savedNotes = JSON.parse(localStorage.getItem("myNotes")) || []

// Event listeners - Home page
newNoteBTN.addEventListener("click", newNote)
deleteAllBTN.addEventListener("dblclick", deleteAllNotes)
deleteAllBTN.addEventListener("click", ()=>toast("Double click to Delete all"))

// Check for click on li element in noteList ul
notesList.addEventListener("click", (event) => {
    const li = event.target.closest(".noteListLI")
    if (li && notesList.contains(li)) {
        fullViewNote(li.dataset.note)
    }
})

// Event listeners - New Note Page
saveBTN.addEventListener("click", saveNotes)
cancelBTN.addEventListener("click", quitNoteMaking)

// start render notes
renderNotes()

// Home popup functions
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

async function renderNotes() {
    notesList.innerHTML = ""

    // header li-span
    const headerLi = document.createElement("li")
    const headerSpan = document.createElement("span")
    const faviconHeaderSpace = document.createElement("img")
    const domainNameHeader = document.createElement("p")
    const noteTitleHeader = document.createElement("p")
    const notesHeader = document.createElement("p")

    headerSpan.id = "headerSpan"
    faviconHeaderSpace.src = "asset/favicon.svg"
    faviconHeaderSpace.id = "faviconImage"
    faviconHeaderSpace.alt = "favicon icon"
    domainNameHeader.textContent = "Domain"
    noteTitleHeader.textContent = "Title"
    notesHeader.textContent = "Note"

    headerSpan.appendChild(faviconHeaderSpace)
    headerSpan.appendChild(domainNameHeader)
    headerSpan.appendChild(noteTitleHeader)
    headerSpan.appendChild(notesHeader)
    headerLi.appendChild(headerSpan)
    notesList.appendChild(headerLi)

    // loop to render all notes in local storage
    for (let i = savedNotes.length-1; i > -1 ; i--) {
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
        noteTitle.textContent = title.length > 15 ? title.substring(0, 15).trim() + "..." : title
        notes.textContent = note.length > 50 ? note.substring(0, 50).trim() + "..." : note

        // li class name
        li.className = "noteListLI"

        // li-note to identifiy
        li.dataset.note = i

        // appending tags
         domainName.appendChild(link)
         span.appendChild(img)
         span.appendChild(domainName)
         span.appendChild(noteTitle)
         span.appendChild(notes)
         li.appendChild(span)
         notesList.appendChild(li)

        /*
        0-> li
        1-> span
        2-> img
        3-> domain
        4-> noteTitle
        5-> notes
        
        layout in html equivalent
        <li class = "noteListLI" dataSet=${title}>
            <span class = "spanItems">
                <img src=${favIconUrl} alr = "Site icon"/>
                <p id="domain"><a id = "link" href= ${url} target="_blank">${domainName}</a></p>
                <p id="noteTtile">${title}</p>
                <p id ="notes">${note}</p>
                <i class = "bi bi-trash deleteIcon"></i>
            </span>
        </li>
        */
    }
}

// Save notes popup functions
function saveNotes() {
    const noteTitle = document.getElementById("title")
    const notes = document.getElementById("Note")
    let Notes = savedNotes
    if (noteTitle.value && notes.value) {
        chrome.tabs.query({
                active: true,
                currentWindow: true
            }, 
            function(tabs){
                const url = new URL(tabs[0].url)
                const match = url.hostname.match(/^(?:www\.)?([a-zA-Z0-9-]+)\.com$/) // need to change regex
                const domain = match ? match[1] : null
                Notes.push([tabs[0].favIconUrl, domain, url, noteTitle.value, notes.value])
                localStorage.setItem("myNotes", JSON.stringify(Notes))
            }
        )
        setTimeout(
            ()=>{
                noteTitle.value = ''
                notes.value = ''
                homePopup.style.display = 'block'
                newNotePopup.style.display = 'none'
                toast("Notes Saved")
                renderNotes()
            }, 100)
        
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

function quitNoteMaking() {
    const noteTitle = document.getElementById("title")
    const notes = document.getElementById("Note")
    noteTitle.value = ''
    notes.value = ''
    homePopup.style.display = 'block'
    newNotePopup.style.display = 'none'
}

// Note full view popup function
function fullViewNote(index){
    homePopup.style.display = 'none'
    fullViewNotePopup.style.display = 'flex'
    const backIcon = document.getElementById("backIconID")
    const [favIconUrl, domain, url, title, note] = savedNotes[index]
    
    // Dom element
    const titleArea = document.getElementById("titleArea")
    const noteViewUrl = document.getElementById("noteViewUrl")
    const noteFavIcon = document.getElementById("noteFavIcon")
    const noteDomain = document.getElementById("noteDomain")
    const noteArea = document.getElementById("noteArea")
    
    // content - on load
    titleArea.value = ''
    noteArea.value = ''
    noteFavIcon.src = ''
    noteViewUrl.href = ''
    noteDomain.textContent = ''

    // content - to display
    titleArea.value = title
    noteViewUrl.href = url
    noteFavIcon.src = favIconUrl
    noteDomain.textContent = domain
    noteArea.value = note
    
    // button functionality
    backIcon.addEventListener("click", exitFullViewNote)

    deleteNoteBTN.onclick = () => {
        savedNotes.splice(index,1)
        localStorage.setItem("myNotes", JSON.stringify(savedNotes))
        toast("Deleted")
        exitFullViewNote()
    }
    saveEditBTN.onclick = () => {
        savedNotes[index] = [favIconUrl, domain, url, titleArea.value, noteArea.value]
        localStorage.setItem("myNotes", JSON.stringify(savedNotes))
        toast("Updated")
        exitFullViewNote()
    }
}

function exitFullViewNote(){
    homePopup.style.display = 'block'
    fullViewNotePopup.style.display = 'none'
    renderNotes()
}

// All popup functions
async function toast(message) {
    var x = document.getElementById("toast");
    x.innerText = message
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000)
}
