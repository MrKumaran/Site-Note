// Popup screen
const homePopup = document.getElementById("homePopup")
const newNotePopup = document.getElementById("newNotePopup")
const fullViewNotePopup = document.getElementById("noteFullView")

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

// getting data from local storage
const savedNotes = JSON.parse(localStorage.getItem("myNotes")) || []

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
    // Note list unorder list
    const notesList = document.getElementById("noteList")
    notesList.innerHTML = ""

    // header li-span
    const headerLi = document.createElement("li")
    const headerSpan = document.createElement("span")
    const faviconHeaderSpace = document.createElement("img")
    const domainNameHeader = document.createElement("p")
    const noteTitleHeader = document.createElement("p")
    const notesHeader = document.createElement("p")

    headerSpan.id = "headerSpan"
    faviconHeaderSpace.src = "favicon.svg"
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
        const icon = document.createElement("i")

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

        // delete icon
        icon.className = "bi bi-trash deleteIcon"

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
         span.appendChild(icon)
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
    // Check for click on li element in noteList ul
    notesList.addEventListener("click", function(event) {
        const li = event.target.closest(".noteListLI")
        if (li && notesList.contains(li)) {
            fullViewNote(li.dataset.note)
            }
        }
    )
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
                noteTitle.value = ''
                notes.value = ''
            }
        )
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
    const [favIconUrl, domain, url, title, note] = savedNotes[index]
    
    // Dom element
    const titleArea = document.getElementById("titleArea")
    const noteViewUrl = document.getElementById("noteViewUrl")
    const noteFavIcon = document.getElementById("noteFavIcon")
    const noteDomain = document.getElementById("noteDomain")
    const noteArea = document.getElementById("noteArea")
    
    // content
    titleArea.textContent = title
    noteViewUrl.href = url
    noteFavIcon.src = favIconUrl
    noteDomain.textContent = domain
    noteArea.textContent = note

    const backIcon = document.getElementById("backIconID")
    backIcon.addEventListener("click", exitFullViewNote)
}

function exitFullViewNote(){
    homePopup.style.display = 'block'
    fullViewNotePopup.style.display = 'none'
}

// All popup functions
async function toast(message) {
    var x = document.getElementById("toast");
    x.innerText = message
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000)
}
