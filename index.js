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
        savedNotes = []
    }
    toast("Deleted all Notes")
    renderNotes()
}

function saveNotes() {
    const title = document.getElementById("title")
    const notes = document.getElementById("Note")
    let Notes = JSON.parse( localStorage.getItem("myNotes") ) || []
    let newNotes = []
    if (title.value && notes.value) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            newNotes.push(tabs[0].favIconUrl, tabs[0].title, tabs[0].url, title.value, notes.value) 
            Notes.push(newNotes)
            localStorage.setItem("myNotes", JSON.stringify(Notes))
            title.value = ''
            notes.value = ''
        })
        homePopup.style.display = 'block'
        newNotePopup.style.display = 'none'
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

function quitNoteMaking() {
    document.getElementById("title").value = ''
    document.getElementById("Note").value = ''
    homePopup.style.display = 'block'
    newNotePopup.style.display = 'none'
}

function renderNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("myNotes")) || [];
    const notesList = document.getElementById("noteList");
    notesList.innerHTML = "";
    /*
    const headerLi = document.createElement("li");
    const headerSpan = document.createElement("span");
    const titleHeader = document.createElement("p");
    const siteHeader = document.createElement("p");
    const notesHeader = document.createElement("p");
    headerSpan.id = "titleTag";
    titleHeader.textContent = "Title";
    siteHeader.textContent = "Site";
    notesHeader.textContent = "Notes";
    headerSpan.appendChild(titleHeader);
    headerSpan.appendChild(siteHeader);
    headerSpan.appendChild(notesHeader);
    headerLi.appendChild(headerSpan);
    notesList.appendChild(headerLi);*/

    for (let i = 0; i < savedNotes.length; i++) {
        const [title, siteText, note, url] = savedNotes[i];
        const li = document.createElement("li");
        const span = document.createElement("span");
        const titleEl = document.createElement("p");
        const siteEl = document.createElement("p");
        const link = document.createElement("a");
        const noteEl = document.createElement("p");
        titleEl.textContent = title;
        link.href = url;
        link.target = "_blank";
        link.textContent = siteText;
        siteEl.appendChild(link);
        noteEl.textContent = note;
        span.appendChild(titleEl);
        span.appendChild(siteEl);
        span.appendChild(noteEl);
        li.appendChild(span);
        notesList.appendChild(li);
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
