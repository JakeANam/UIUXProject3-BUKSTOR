// bookDetail.html 용
// 사용할 책 정보
// 도서 제목: 유튜브의 신
// 저자: 대도서관
// ISBN: 1162540168 9791162540169

// 도서 정보가 존재하면 작동 - 외부 txt 파일을 불러들이기 위해

document.getElementsByTagName("footer")[0].style.marginBottom = "100px";

// 상세정보 태그 고정
let tabContents = document.getElementById("tabContents");
let tabBar = document.getElementById("tabBar");
let tabBarLocation = window.pageYOffset + tabBar.getBoundingClientRect().top;
function fixTabBar() {
    // if (tabBarLocation - window.pageYOffset < 73) {
    //     tabBar.style.position = "fixed";
    //     tabBar.style.top = "73px";
    //     tabBar.style.left = (-1 * this.window.scrollX) + "px";
    // } else {
    //     tabBar.style.position = "relative";
    //     tabBar.style.left =  "0";
    // }

    // if (window.innerWidth < 1200) {
    //     tabBar.style.width = "1200px";
    // } else {
    //     tabBar.style.width = "100%";
    // }
}

/**
 * @description 화면 하단에 구매 태그 고정
 */
function fixPurchase() {
    const purchaseWrap = document.getElementById("purchase").getElementsByClassName("wrap")[0];
    purchaseWrap.style.left = (-1 * this.window.scrollX) + "px";
}

// 도서 개요 - 기타 정보 가져오기
async function bringAbstract(promiseData) {
    promiseData.then(function(data) {
        document.getElementById("bookAbstract").getElementsByTagName("h1")[0].innerText
            = data.documents[0].title;

        const abstractInfo = document.getElementById("bookAbstract").getElementsByTagName("ul")[0].getElementsByTagName("li");
        abstractInfo[0].innerHTML += data.documents[0].isbn;
        abstractInfo[1].innerHTML += data.documents[0].authors;
        abstractInfo[2].innerHTML += data.documents[0].publisher;
        abstractInfo[3].innerHTML += getDateForm(data.documents[0].datetime);

        document.getElementById("purchase").getElementsByTagName("p")[1].innerText
            = "￦ " + putCommaInNumber(data.documents[0].price);

        oneBook.eachPrice.value = data.documents[0].price;
        oneBook.totalPrice.value = oneBook.eachPrice.value
    });
}

// 도서 개요 - 부제, 컨텐츠 가져오기
async function abstractContent(textLocation) {
    try {
        const response = await fetch(textLocation + "/abstract.txt");
        
        if (!response.ok) {
            throw new Error("네트워크 상의 문제가 발생했습니다.");
        }

        const data = await response.text();
        document.getElementById("bookAbstract").getElementsByClassName("addAbstract")[0].innerHTML = data
    } catch (error) {
        console.error("경고! 다음 이유로 컨텐츠를 불러들이지 못했습니다!: ", error)
    }
}

/**
 * @description 도서 상세 정보 가져와서 표시하기
 * @param {string} textLocation txt파일의 위치
 * @param {string} infoClass 상세 정보 내용, bookInfo의 class 이름
 */
async function bringDetailedData(textLocation, infoClass){
    const bookInfo = document.getElementById("bookInfo");
    const textUrl = textLocation + "/" + infoClass + ".txt";

    try {
        const response = await fetch(textUrl);
        
        if (!response.ok) {
            throw new Error("네트워크 상의 문제가 발생했습니다.");
        }

        const data = await response.text();
        bookInfo.getElementsByClassName(infoClass)[0].innerText = data
    } catch (error) {
        console.error("경고! 다음 이유로 컨텐츠를 불러들이지 못했습니다!: ", error)
    }
}

// 환불 규정
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("./bookInfos/환불 규정.txt");
        
        if (!response.ok) {
            throw new Error("네트워크 상의 문제가 발생했습니다.");
        }

        const data = await response.text();
        document.getElementById("problemSolving").innerHTML += data
    } catch (error) {
        console.error("경고! 다음 이유로 컨텐츠를 불러들이지 못했습니다!: ", error)
    }
});

const minusAmoumt = document.getElementById("purchase").getElementsByTagName("ul")[1].getElementsByTagName("li")[0];
const plusAmoumt = document.getElementById("purchase").getElementsByTagName("ul")[1].getElementsByTagName("li")[2];
const changeAmount = document.getElementById("purchase").getElementsByTagName("ul")[1].getElementsByTagName("li");
for (let i of changeAmount) {
    
    i.onclick = function() {
        console.log(i.innerHTML);
        if(i.innerHTML == "+") {
            oneBook.amount.value++;
        } else if (oneBook.amount.value > 1){
            oneBook.amount.value--;
        }
        changeAmount[1].innerText = oneBook.amount.value;
        oneBook.totalPrice.value = oneBook.eachPrice.value * oneBook.amount.value;

        document.getElementById("purchase").getElementsByTagName("p")[1].innerText
            = "￦ " + putCommaInNumber(oneBook.totalPrice.value);
    }
}

// 태그 내용 변경
function changeTabContents(choosen){
    const allContents = document.getElementById("tabContents").children;
    for (let i of allContents) {
        i.style.display = "none";
    }

    allContents[choosen].style.display = "block";
}

// 리뷰 가져오기
async function loadReviews() {
    try {
        const response = await fetch('./bookReviews.json');
        const reviews = await response.json();
        const reviewList = document.getElementById("bookReview").getElementsByClassName("reviewList")[0];
        if (reviews.length > 0) {
           
            for (let i of reviews){
                const oneReview = document.createElement("li");

                const reviewer = document.createElement("ul");
                reviewer.setAttribute("class", "reviewer");
                const reviewName = document.createElement("li");
                reviewName.innerText = i.id;
                const reviewDate = document.createElement("li");
                reviewDate.innerText = getDateForm(i.date);
                
                const reviewStars = document.createElement("li");
                for (let j = 0; j < i.stars; j++) {
                    reviewStars.innerHTML += '<i class="fa-solid fa-star"></i>';
                }

                reviewer.append(reviewDate, reviewStars, reviewName);

                const commentReview = document.createElement("p");
                commentReview.innerText = i.comment;

                oneReview.append(reviewer, commentReview);
                reviewList.appendChild(oneReview);
            }

        } else {
            const oneReview = document.createElement("li");
            reviewDate.innerText = "리뷰가 없습니다! 첫번째 리뷰를 써 주세요!";
            reviewList.appendChild(oneReview);
        }
 
    } catch (error) {
        console.log('에러발생! : ' + console.error());
    }
    
}

// 화면 표시 시 실행
fixPurchase();
fixTabBar();
changeTabContents(0);
loadReviews();
window.addEventListener("scroll", function(){
    fixPurchase();
    fixTabBar();
});