// Popup screen
const homePopup = document.getElementById("homePopup")
const newNotePopup = document.getElementById("newNotePopup")

//  Home popup buttons
const newNotebtn = document.getElementById("new-btn")
const deleteAllbtn = document.getElementById("delete-btn")

// Newnote popup buttons
const savebtn = document.getElementById("save-btn")
const cancelbtn = document.getElementById("cancel-btn")

// Event listeners
newNotebtn.addEventListener("click", newNote)
deleteAllbtn.addEventListener("dblclick", deleteAllNotes)
deleteAllbtn.addEventListener("click", function(){
    toast("Double click to Delete all")
})
savebtn.addEventListener("click", saveNotes)
cancelbtn.addEventListener("click", cancelNoteMaking)

// Refresh list
setInterval(renderNotes(),100);


function newNote() {
    homePopup.style.display = 'none'
    newNotePopup.style.display = 'flex'
}

function deleteAllNotes() {
    if(localStorage){
        localStorage.clear()
        savedNotes = []
    }
    toast("Deleted all Notes")
    renderNotes()
}

function saveNotes() {
    const title = document.getElementById("title")
    const domainName = document.getElementById("domain")
    const notes = document.getElementById("Note")
    let Notes = JSON.parse( localStorage.getItem("myNotes") ) || []
    if (title.value && notes.value) {
        Notes.push([title.value, domainName.value, notes.value])
        title.value = ''
        domainName.value = ''
        notes.value = ''
        homePopup.style.display = 'block'
        newNotePopup.style.display = 'none'
        localStorage.setItem("myNotes", JSON.stringify(Notes))
        toast("Notes Saved")
        renderNotes()
        }
    else {
        if (title.value) {
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
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function cancelNoteMaking() {
    document.getElementById("title").value = ''
    document.getElementById("domain").value = ''
    document.getElementById("Note").value = ''
    homePopup.style.display = 'block'
    newNotePopup.style.display = 'none'
}

function renderNotes(){
    let savedNotes = JSON.parse( localStorage.getItem("myNotes") ) || []
    const notesList = document.getElementById("noteList")
    let listItems = `
            <li>
                <span><p>Title</p><p>Sitename</p><p>Notes</p></span>
            </li>
            `
    count = savedNotes.length 
    for(let _ = 0; _ < count; _++){
        listItems += `
        <li>
            <span><p>${savedNotes[_][0]}</p><p>${savedNotes[_][1]}</p><p>${savedNotes[_][2]}</p></span>
        </li>
    `
    }
    notesList.innerHTML = listItems
}