const notesContainer=document.querySelector(".notes-container");
const createBtn=document.querySelector(".btn");
const searchInput = document.querySelector(".search-input");
let notes= document.querySelectorAll(".input-box");

function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
        notes = document.querySelectorAll(".input-box"); // Update notes collection
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            };
        });
    }

    
}
showNotes();


function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML)
}

createBtn.addEventListener("click",()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className="input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage();

})

notesContainer.addEventListener("click",function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "p"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onKeyup = function(){
                updateStorage();
            }
        })
    }
})

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const allNotes = document.querySelectorAll(".input-box");

    allNotes.forEach(note => {
        const noteContent = note.textContent.toLowerCase();
        if (noteContent.includes(searchTerm)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
});



document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})











