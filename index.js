// Popup screen
const homePopup = document.getElementById("homePopup")
const newNotePopup = document.getElementById("newNotePopup")

//  Home popup buttons
const newNotebtn = document.getElementById("new-btn")
const deleteAllbtn = document.getElementById("delete-btn")

// Newnote popup buttons
const savebtn = document.getElementById("save-btn")
const cancelbtn = document.getElementById("cancel-btn")
const savetabbtn = document.getElementById("save-tab-btn")

// Tab URL
let tabURL = ''

// Event listeners
newNotebtn.addEventListener("click", newNote)
deleteAllbtn.addEventListener("dblclick", deleteAllNotes)
deleteAllbtn.addEventListener("click", function(){
    toast("Double click to Delete all")
})
savebtn.addEventListener("click", saveNotes)
cancelbtn.addEventListener("click", cancelNoteMaking)
savetabbtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        tabURL = tabs[0].url
    })
})

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
        Notes.push([title.value, domainName.value, notes.value, tabURL])
        title.value = ''
        domainName.value = ''
        notes.value = ''
        tabURL = ''
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

function renderNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("myNotes")) || [];
    const notesList = document.getElementById("noteList");
    notesList.innerHTML = "";
    const headerLi = document.createElement("li");
    const headerSpan = document.createElement("span");
    headerSpan.id = "titleTag";
    const titleHeader = document.createElement("p");
    titleHeader.textContent = "Title";
    const siteHeader = document.createElement("p");
    siteHeader.textContent = "Site";
    const notesHeader = document.createElement("p");
    notesHeader.textContent = "Notes";
    headerSpan.appendChild(titleHeader);
    headerSpan.appendChild(siteHeader);
    headerSpan.appendChild(notesHeader);
    headerLi.appendChild(headerSpan);
    notesList.appendChild(headerLi);

    // Loop through saved notes
    for (let i = 0; i < savedNotes.length; i++) {
        const [title, siteText, note, url] = savedNotes[i];
        const li = document.createElement("li");
        const span = document.createElement("span");
        const titleEl = document.createElement("p");
        titleEl.textContent = title;
        const siteEl = document.createElement("p");
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.textContent = siteText;
        siteEl.appendChild(link);
        const noteEl = document.createElement("p");
        noteEl.textContent = note;
        span.appendChild(titleEl);
        span.appendChild(siteEl);
        span.appendChild(noteEl);
        li.appendChild(span);
        notesList.appendChild(li);
    }
}
