// 공통 script

// 스크롤시 헤더 고정
function fixHeader() {
    const headerBottom = document.getElementsByClassName("headerBottom")[0];

    if (window.pageYOffset >= 25) {
        headerBottom.style.position = "fixed";
        headerBottom.style.top = '0';
        headerBottom.style.left = (-1 * this.window.scrollX) + "px"
    } else {
        headerBottom.style.position = "relative";
        headerBottom.style.left = '0';
    }
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

// 검색 엔진 세팅하기
function fixSearchList() {
    const searchListLayer = document.getElementById("searchListLayer");
    let searchValue = searchBook.searchValue.value
    
    // Y위치가 위에서 25px 아래부터는 
    if (window.pageYOffset >= 25) {
        searchListLayer.style.top = '75px';
    } else {
        searchListLayer.style.top = (100 - window.pageYOffset) + "px";
    }
    searchListLayer.style.height = "calc(100% - " + searchListLayer.style.top + ")";

    // 화면 너비 1200px 기준으로 위치 선정
    let toTranslate = 'translate(';
    
    if (window.innerWidth < 1200) {
        searchListLayer.style.left = (-1 * window.pageXOffset) + "px";
        
        searchListLayer.style.transform = 'translate(0, -100%)';
        toTranslate += '0, '
    } else {
        searchListLayer.style.left = '50%';
        toTranslate += '-50%, '
        searchListLayer.style.transform = 'translate(-50%, -100%)';
    }
    
    // 검색 내용이 없다면 다시 올리기
    if (searchValue == "") {
        toTranslate += '-100%)';
    } else {
        toTranslate += '0%)';   
    }

    searchListLayer.style.transform = toTranslate;
}

// 도서 검색하기
function goSearchBook() {
    let searchValue = searchBook.searchValue.value;
    
    const searchAmount = 20;

    if (searchValue == "") {
        alert("검색어를 입력해주세요!");
        searchValue.focus();
    } else {
        openSearchpop();

        // const oldSearchedData = document.getElementsByClassName("searchBookList")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
        // if (oldSearchedData.length > 0) {
        //     clearSearchBook();
        // }

        const urlSearch = getkakaoBookURLParameter(searchValue,  undefined, undefined, undefined, searchAmount);
        const asyncSearch = searchKakaoBookData_async(urlSearch);
        mainPromiseList(asyncSearch, 0, "searchBookList");
        document.getElementById("searchResultSign").getElementsByTagName("span")[0].innerText = "\"" + searchValue + "\"";
        document.getElementById("searchResultSign").getElementsByTagName("span")[1].innerText = searchAmount;
        
        setTimeout(function() {
            searchListLayer.style.display = 'block';
            fixSearchList();
        }, 1000);
    }
}

// 검색 초기화
function clearSearchBook() {
    searchBook.searchValue.value = "";
    fixSearchList();
    setTimeout(function() {
        document.getElementsByClassName("searchBookList")[0].getElementsByTagName("ul")[0].innerHTML = "";
    }, 2000);
}

// 상세페이지로 이동준비
const urlDetail = getkakaoBookURLParameter("1162540168", "isbn");
asyncDetail = searchKakaoBookData_async(urlDetail);


// 기타 함수 모음
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

// 
function makeATag(textA, href="#") {
    const buttonA = document.createElement("a");
    buttonA.setAttribute("href", href);
    buttonA.innerText = textA;
    return buttonA;
}

// 공통 화면 설정
document.scrollTop = 0; // 처음 시작할 때는 페이지 맨 위로 설정

fixHeader(); // 첫 화면 헤더 고정
fixSearchList()
window.addEventListener("scroll", function() {
    fixHeader();
    fixSearchList()
});

window.addEventListener("resize", function() {
    fixSearchList();
});



