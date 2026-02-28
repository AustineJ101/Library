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
                if(book[entry] == true){
                    dataCell.textContent = "Read";
                    dataCell.classList.add("status-read")
                }else{
                    dataCell.textContent = "Not Read";
                    dataCell.classList.add("status-not-read");
                }
                row.appendChild(dataCell);
            }else if(entry != "id"){ // Exclude id value from data cells
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
let bookSample = {title: "The Great River", author: "Austine Juma", pages: 345, readStatus: true} // Sample book to be displayed on page load
addBookToLibrary(bookSample)
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