//wireframe 용
/**
 * @description p요소에 내용 넣어서 생성
 * @param {String} content p요소에 넣을 Text
 */
/*
function makePElement(content){
    let pElement = document.createElement("p");
    pElement.appendChild(document.createTextNode(content));
    return pElement;
}
*/
/**
 * @description mainpage 도서 목록 생성
 * @param {Number} listIndex mainpage 도서 리스트 번호(맨 위부터 첫번째: 0)
 * @param {Number} booksAmount 도서 리스트에 표시할 도서 수
 */
/*
function makeMainBookList (listIndex, booksAmount) {
    let mainBookList = document.getElementsByClassName("ookList")[listIndex].getElementsByTagName("ul")[0];

    //let listBody = document.createElement
    //5개 기준 ul width 100%
    mainBookList.style.width = (20 * booksAmount) + "%";
    for (let i = 0; i < booksAmount; i++) {
        let listIndex = document.createElement("li");
        listIndex.style.width = "210px";
        let bookImg = document.createElement("img");
        bookImg.setAttribute('src', allBookInfo[i].thumbnail);
        bookImg.setAttribute('alt', '메인도서목록' + (i + 1));

        let title = document.createElement("p");

        let publisher = document.createElement("p");
        publisher.innerText = allBookInfo[i].authors;

        let author = document.createElement("p");
        let price = document.createElement("p");
        listIndex.append(bookImg, title, publisher, author, price);
        mainBookList.appendChild(listIndex);
    }

    if (booksAmount <= 5) {
        let a = mainBookList.parentNode.parentNode;
        for (let i of a.childNodes){
            if (i.innerText == "<" || i.innerText == ">") {
                i.style.display = "none";
            }
        }
    }
}
*/
//메인메뉴 도서목록 애니메이션
let listButton = document.getElementsByClassName("bookListButton");
for (let i of listButton) {
    i.onclick = function() {
        let listBody = i.parentNode.getElementsByTagName("ul")[0];
        let moveLeft = HorizonalSlideKeyframe("-1100px");
        let moveRight = HorizonalSlideKeyframe("0");
        let resetLeft = HorizonalSlideKeyframe("0");
        let presetRight = HorizonalSlideKeyframe("-1100px");
        let moveOptions = SetAnimationOption(1000);
        let resetOptions = SetAnimationOption(0);

        let toMoveOut;
        // 왼쪽으로 이동
        if (i.innerText == "<") {
            for (let i = 0; i < 5; i++) {
                toMoveOut = listBody.childNodes[i].cloneNode(true);
                listBody.appendChild(toMoveOut);
            }
            
            listBody.style.width = (Number((listBody.style.width).slice(0,-1)) + 100) + "%";
            let animateList = listBody.animate(moveLeft, moveOptions);
            animateList.onfinish = function() {
                for (let i = 0; i < 5; i++) {
                    listBody.removeChild(listBody.childNodes[0]);
                }
                listBody.style.width = (Number((listBody.style.width).slice(0,-1)) - 100) + "%";
                listBody.animate(resetLeft, resetOptions);
            }

        // 오른쪽으로 이동
        } else {
            let lastIndex = listBody.childNodes.length - 1;
            for (let i = lastIndex; i > lastIndex - 5; i--) {
                toMoveOut = listBody.childNodes[lastIndex].cloneNode(true);
                listBody.prepend(toMoveOut);
            }
            
            listBody.style.width = (Number((listBody.style.width).slice(0,-1)) + 100) + "%";
            listBody.animate(presetRight, resetOptions);
            let animateList = listBody.animate(moveRight, moveOptions);
            animateList.onfinish = function() {
                for (let i = lastIndex + 5; i > lastIndex; i--) {
                    listBody.removeChild(listBody.childNodes[i]);
                }
                listBody.style.width = (Number((listBody.style.width).slice(0,-1)) - 100) + "%";
            }
        }
    }
}

function HorizonalSlideKeyframe(moveTo){
    return [{transform: "translateX(" + moveTo + ")"}];
}

function SetAnimationOption(milisecond){
    const moveOptions = {
        duration: milisecond,
        easing: "ease-in",
        iterations: 1,
        fill: "forwards"
    };

    return moveOptions;
}

document.scrollTop = 0;
