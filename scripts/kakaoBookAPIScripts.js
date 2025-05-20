// KakaoBook API 관련 Scripts
// openAPI url: https://dapi.kakao.com/v3/search/book
// API key: 6e914df201615b9585e5b533703a66e3
// 상세 내용: https://developers.kakao.com/

/**
 * @description kakaoBook openAPI URL
 */
const kakaoBookURL =  "https://dapi.kakao.com/v3/search/book?"

/**
 * @description kakaoBook URL 검색 내용 생성성
 * @param {string} searchAbout 검색 내용
 * @param {string} searchIn 검색 조건 / title: 제목(기본), isbn: ISBN, publisher: 출판사, person: 인명
 * @param {string} toSort 검색 결과 정렬 순서 / accuracy: 정확도순(기본), latest: 발간일순
 * @param {number} pageNeed 결과 페이지 번호 / 기본값 1
 * @param {number} sizeNeed 표시할 데이터(Document) 수 / 기본값 10
 * @returns {object} KakaoBook open API에 사용할 parameter object
 */
function getkakaoBookURLParameter(searchAbout, searchIn = "title", toSort = "accuracy", pageNeed = 1, sizeNeed = 10) {
    const kakaoBookParameter = {
        query: searchAbout,
        target: searchIn,
        sort: toSort,
        page: pageNeed,
        size: sizeNeed
    };

    return kakaoBookParameter;
}

/**
 * @description async-fetch 방식으로 책 검색 시행, JSON 형태로 결과 출력
 * @param {URLSearchParams} kakaoBookParameter 검색 URL 내용
 * @returns {Promise} Promise 형태의 data 
 */
async function searchKakaoBookData_async(kakaoBookParameter) {
    // URL 생성
    const searchParameter = new URLSearchParams(kakaoBookParameter);
    const asyncURL = kakaoBookURL + `${searchParameter}`;

    const response = await fetch(asyncURL, {
        method: 'GET',
        headers: {
            Authorization: "KakaoAK 6e914df201615b9585e5b533703a66e3"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
    } 

    return await response.json();
}

/**
 * @description Promise 형태의 data를 Object형태로 바꾼 후 main용 list 생성
 * @param {Promise} promiseData Promise 형태의 data
 * @param {Number} listSort mainpage에서 윗쪽부터 list 순번
 * @param {String} listClass mainpage 목록 종류(className) / 기본값='mainBookList'
 */
async function mainPromiseList(promiseData, listSort, listClass='mainBookList') {
    
    promiseData.then(function(data) {
        let mainBookList = document.getElementsByClassName(listClass)[listSort].getElementsByTagName("ul")[0];
        //5개 기준 ul width 100%
        if (listClass=='mainBookList') {
            mainBookList.style.width = (20 * data.documents.length) + "%";    
        }

        const allBookInfo = data.documents;
        for (let i in allBookInfo) {
            let listIndex = document.createElement("li");

            let bookImg = treatThumbnail(allBookInfo[i].thumbnail, i);
            listIndex.append(bookImg);
            let title = document.createElement("p");
            title.innerText = allBookInfo[i].title;

            if (listClass=='mainBookList') {
            let publisher = document.createElement("p");
            publisher.innerText = allBookInfo[i].publisher;

            let authors = document.createElement("p");
            authors.innerText = allBookInfo[i].authors;

            let price = document.createElement("p");
            price.innerText = ("￦ " + putCommaInNumber(allBookInfo[i].price));

            listIndex.append(title, publisher, authors, price);
            }
            
            mainBookList.appendChild(listIndex);    
        }

        if (allBookInfo.length <= 5) {
        let a = mainBookList.parentNode.parentNode;
            for (let i of a.childNodes){
                if (i.innerText == "<" || i.innerText == ">") {
                    i.style.display = "none";
                }
            }
        }
    });
}

function treatThumbnail(thumbnailURL, thumbnailIndex) {
    let thumbnail;
    if (thumbnailURL == '' || thumbnailURL == null) {
        thumbnail = document.createElement("div");
        const subLogo = document.createElement("img");
        const subText = document.createElement("p");
        subText.innerHTML = "이미지<br>준비중입니다!"
        subLogo.setAttribute("src", "./icons/logoRound.png");
        subLogo.setAttribute('alt', '메인도서목록' + (Number(thumbnailIndex) + 1));
        thumbnail.append(subLogo, subText);
    } else {
        thumbnail = document.createElement("img");
        thumbnail.setAttribute('src', thumbnailURL);
        thumbnail.setAttribute('alt', '메인도서목록' + (Number(thumbnailIndex) + 1));
    }
    
    return thumbnail;
}

/**
 * @description 숫자에 , 추가 (ex: 1234500 → 1,234,500)
 * @param {number} 입력 받은 숫자
 * @returns {string}  ,가 추가된 숫자
 */
function putCommaInNumber(inputNum){
    let newNum = "";
    inputNum = String(inputNum);

    do{
        if(inputNum.length > 3){
            newNum = ',' + inputNum.slice(-3) + newNum;
            inputNum = inputNum.slice(0, -3);
        }else{
            newNum = inputNum + newNum;
            inputNum = '';
        } 
    } while(inputNum.length > 0);

    return newNum;
};

/*
function makeList(ajaxResult){
    const allBookInfo = ajaxResult.documents;
    for(let i in allBookInfo){
        let bookIndex =  $('.bookList>li').eq(i);
        bookIndex.children('img').attr('src', allBookInfo[i].thumbnail);
        bookIndex.children('p:eq(0)').text(allBookInfo[i].title);
        bookIndex.children('p:eq(1)').text(allBookInfo[i].publisher);
        bookIndex.children('p:eq(2)').text(allBookInfo[i].authors);
        bookIndex.children('p:eq(3)').text("￦ " + putCommaInNumber(allBookInfo[i].price));
    }
}
*/