const homePopup = document.getElementById("homePopup")
const newNotePopup = document.getElementById("newNotePopup")
const newNotebtn = document.getElementById("new-btn")
const deleteAllbtn = document.getElementById("delete-btn")
const savebtn = document.getElementById("save-btn")
const cancelbtn = document.getElementById("cancel-btn")
const savedNotes = JSON.parse( localStorage.getItem("myNotes") ) || []

newNotebtn.addEventListener("click", newNote)
deleteAllbtn.addEventListener("dblclick", deleteAllNotes)
deleteAllbtn.addEventListener("click", function(){
    toast("Double click to Delete all")
})
savebtn.addEventListener("click", saveNotes)
cancelbtn.addEventListener("click", cancelNoteMaking)

function newNote() {
    homePopup.style.display = 'none'
    newNotePopup.style.display = 'flex'
}

function deleteAllNotes() {
    localStorage.clear()
    toast("Deleted all Notes")
}

function saveNotes() {
    const title = document.getElementById("title")
    const domainName = document.getElementById("domain")
    const notes = document.getElementById("Note")
    let Notes = savedNotes
    if (title.value && notes.value) {
        Notes.push([title.value, domainName.value, notes.value])
        localStorage.setItem("myNotes", JSON.stringify(Notes))
        toast("Notes Saved")
        title.value = ''
        domainName.value = ''
        notes.value = ''
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
    const title = document.getElementById("title")
    const domainName = document.getElementById("domain")
    const notes = document.getElementById("Note")
    title.value = ''
    domainName.value = ''
    notes.value = ''
    homePopup.style.display = 'block'
    newNotePopup.style.display = 'none'
}