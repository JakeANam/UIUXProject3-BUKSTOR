//wireframe 용
/**
 * @description p요소에 내용 넣어서 생성
 * @param {String} content p요소에 넣을 Text
 */
function makePElement(content){
    let pElement = document.createElement("p");
    pElement.appendChild(document.createTextNode(content));
    return pElement;
}

/**
 * @description
 * @param {Number} listIndex mainpage 도서 리스트 번호(맨 위부터 첫번째: 0)
 * @param {Number} booksAmount 도서 리스트에 표시할 도서 수
 */
function makeMainBookList (listIndex, booksAmount) {
    let mainBookList = document.getElementsByClassName("bookList")[listIndex].getElementsByTagName("ul")[0];

    //5개 기준 ul width 100%
    mainBookList.style.width = (20 * booksAmount) + "%";
    for (let i = 0; i < booksAmount; i++) {
        let listIndex = document.createElement("li");
        listIndex.style.width = "calc((100% / " + booksAmount + " - 10px)";
        let bookImg = document.createElement("img");
        
        let title = makePElement("책제목");
        let publisher = makePElement("출판사");
        let author = makePElement("저자");
        let price = makePElement("10,000");
        listIndex.append(bookImg, title, publisher, author, price);
        mainBookList.appendChild(listIndex);
    }

    if (booksAmount <= 5) {
        let a = mainBookList.parentNode;
        alert(a.previousSibling.className);
        //document.getElementsByClassName("bookListButton")[0].style.display = "none";
    }
    //console.log(mainBookList.getElementsByTagName("li"));
}


