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

addBookToLibrary("The 10X Rule", "Grant Cardone", 240, "read");
