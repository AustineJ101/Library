const tbody = document.querySelector("tbody");

const myLibrary = [];

function Book(id, title, author, pages, readStatus){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author,pages, readStatus){
    let id = crypto.randomUUID();
    let newBook = new Book(id, title, author, pages, readStatus);
    myLibrary.push(newBook);
}

addBookToLibrary("The 10X Rule", "Grant Cardone", 240, true);

addBookToLibrary("The 4 - Hour Work Week", "Timothy Ferris", 280, false);

addBookToLibrary("The Art of Spending Money", "Morgan Housel", 175, true);

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

        btnDataCell.appendChild(delBtn);

        row.appendChild(btnDataCell);

        bookRows.push(row);
   })
    
   return bookRows;
}

function displayBooks(){
    let rows = createBookRows()
    rows.forEach(row => {
        tbody.appendChild(row)
    })
}

displayBooks();