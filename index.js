const tbody = document.querySelector("tbody");
const body = document.querySelector("body");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const affirmativeRadio = document.querySelector("#affirmative");
const negativeRadio = document.querySelector("#negative");
const submitBtn = document.querySelector(".submitBtn");
const dialog = document.querySelector("dialog");

const myLibrary = [];

function Book(id, title, author, pages, readStatus){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    this.toggleReadStatus = function(){
        let newStatus = !(this.readStatus);
        this.readStatus = newStatus;
    }
}

function addBookToLibrary({title, author,pages, readStatus}){
    let id = crypto.randomUUID();
    let newBook = new Book(id, title, author, pages, readStatus);
    myLibrary.push(newBook);
}

function createBookRows(){
    const bookRows = [];
   myLibrary.forEach((book, index) => {
        let row = document.createElement("tr");
        let dataCell = document.createElement("td");
        dataCell.classList.add("number");
        dataCell.textContent = index + 1;
        
        row.appendChild(dataCell);

        for(let entry in book){
            if(entry == "readStatus"){
                let dataCell = document.createElement("td");
                let statusSpan = document.createElement("span");
                let toggleReadStatusBtn = document.createElement("button");
                if(book[entry] == true){
                    toggleReadStatusBtn.textContent = "Mark as not read";
                    statusSpan.textContent = "Read";
                    statusSpan.classList.add("un-read")

                }else{
                    toggleReadStatusBtn.textContent = "Mark as read"
                    statusSpan.textContent = "Not Read"
                    statusSpan.classList.add("read")
                }

                toggleReadStatusBtn.addEventListener("click", () => {
                    book.toggleReadStatus();
                    displayBooks();
                })

                dataCell.appendChild(statusSpan)
                dataCell.appendChild(toggleReadStatusBtn);

                dataCell.setAttribute('id', "status")

                row.appendChild(dataCell);
            }else if(entry != "id" && entry != "toggleReadStatus"){ // Exclude id value and the toggleReadStatus function from data cells
                let dataCell = document.createElement("td");
                dataCell.textContent = book[entry];
                dataCell.classList.add(entry);

                row.appendChild(dataCell)
            }
        }
        
        let btnDataCell = document.createElement("td");
        let delBtn = document.createElement("button");
        delBtn.textContent = "Remove Book";
        delBtn.classList.add("delBtn");
        delBtn.setAttribute("id", book.id);

        delBtn.addEventListener("click", removeBook)

        btnDataCell.appendChild(delBtn);

        row.appendChild(btnDataCell);

        bookRows.push(row);
   })
    
   return bookRows;
}

function removeBook(event){
    let index = myLibrary.findIndex(book => {
        return book.id === event.target.id;
    });

    myLibrary.splice(index, 1);

    displayBooks()
}

let userPrompt = document.createElement("p");
userPrompt.textContent = "No books in your library. Click the 'Add New Book' button above to add."; 

function displayBooks(){
    tbody.replaceChildren() // removes all children to allow re-rendering of book rows
    
    if(myLibrary.length == 0){ 
        body.appendChild(userPrompt);
        return;
    }
     
    userPrompt.remove();

    let rows = createBookRows()
    rows.forEach(row => {
        tbody.appendChild(row)
    })
}
let bookSample = {title: "When the Sun goes Down", author: "Emilia Ilieva", pages: 345, readStatus: true} // Sample book to be displayed on page load
addBookToLibrary(bookSample)
let bookSample2 = {title: "Psychology of Money", author: "Morgan Housel", pages: 175,  readStatus: false}
addBookToLibrary(bookSample2)
displayBooks();

function isBookRead(affirmative){
    return affirmative.checked? true : false;
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const book = {};
   
    if(title.value){
        book.title = title.value;
        if(author.value){
             book.author = author.value;
             if(pages.value){
                book.pages = pages.value;
                isBookRead(affirmativeRadio)? book.readStatus = true : book.readStatus = false;
                addBookToLibrary(book);
                displayBooks()
                resetInputFields()
                dialog.close()
                
             }else{
                pages.focus();
             }
        }else{
            author.focus();
        }
    }else{
        title.focus();
    }
    
})

function resetInputFields(){
    title.value = "";
    author.value = "";
    pages.value = "";
    negativeRadio.checked = true;
}