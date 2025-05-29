// 공통 script

// 스크롤시 헤더 고정
function fixHeader() {
    const headerBottom = document.getElementsByClassName("headerBottom")[0];
    const searchListLayer = document.getElementById("searchListLayer");

    if (window.pageYOffset >= 25) {
        headerBottom.style.position = "fixed";
        headerBottom.style.top = '0';
        headerBottom.style.left = (-1 * this.window.scrollX) + "px"

        searchListLayer.style.top = '75px';
        

    } else {
        headerBottom.style.position = "relative";
        headerBottom.style.left = '0';

        searchListLayer.style.top = (75 - window.pageYOffset) + "px";
        
    }
    searchListLayer.style.height = (window.innerHeight) + "px";
}

// 검색 엔진 열기
function openSearchpop() {
    const searchPopup = document.getElementById("searchPopup");
    if (searchPopup.style.top == "75px") {
        searchPopup.style.top = "25px";
    } else {
        searchPopup.style.top = "75px";
    }   
}

function goSearchBook() {
    const searchValue = searchBook.searchValue;
    if (searchValue.value == "") {
        alert("검색어를 입력해주세요!");
        searchValue.focus();
    } else {
        openSearchpop();
        setTimeout(function() {
            const searchPopup = document.getElementById("searchListLayer");
            searchPopup.style.display = "block";
        }, 1000);
    }
}

function setSearchListHeight() {
    // const searchListLayer = document.getElementById("searchListLayer");
    let listHeight = 0;
    if (window.pageYOffset >= 25) {
        listHeight = "calc(100% - 75px)";
    } else {
        listHeight = "calc(100% - " + (100 - window.pageYOffset) + "px)";
    }
    
    return listHeight;
}

fixHeader(); // 첫 화면 헤더 고정
window.addEventListener("scroll", function(){
    fixHeader();
});



// 상세페이지로 이동준비
const urlDetail = getkakaoBookURLParameter("1162540168", "isbn");
asyncDetail = searchKakaoBookData_async(urlDetail);

/**
 * @description 숫자에 , 추가 (ex: 1234500 → 1,234,500)
 * @param {number} inputNum 입력 받은 숫자
 * @returns {string}  ,가 추가된 숫자
 */
function putCommaInNumber(inputNum) {
    let newNum = "";
    inputNum = String(inputNum);

    do{
        if(inputNum.length > 3) {
            newNum = ',' + inputNum.slice(-3) + newNum;
            inputNum = inputNum.slice(0, -3);
        } else {
            newNum = inputNum + newNum;
            inputNum = '';
        } 
    } while(inputNum.length > 0);

    return newNum;
};

/**
 * @description 날짜 형태 맞춰서 출력 (0000년 0월 0일)
 * @param {string} inputDate 날짜 입력
 * @returns {string} 날짜 출력 (0000년 0월 0일)
 */
function getDateForm(inputDate) {
    const dateset = new Date(inputDate);
    let publishDay = dateset.getFullYear() + "년 ";
    publishDay += (dateset.getMonth() + 1) + "월 ";
    publishDay += dateset.getDate() + "일"

    return publishDay;
}

document.scrollTop = 0; // 처음 시작할 때는 페이지 맨 위로 설정