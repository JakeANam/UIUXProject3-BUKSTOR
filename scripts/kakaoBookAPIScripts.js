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
 * @param {string} toSort 검색 결과 정렬 방법 / accuracy: 정확도순(기본), latest: 발간일순
 * @param {number} pageNeed 결과 페이지 번호 / 기본값 1
 * @param {number} sizeNeed 표시할 데이터(Document) 수 / 기본값 10, 최대 50
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
 * @description Promise 형태의 data를 Object형태로 바꾼 후 index.html의 list 생성
 * @param {Promise} promiseData Promise 형태의 data (도서 정보 다수 존재)
 * @param {Number} listSort mainpage에서 윗쪽부터 list 순번
 * @param {String} listClass mainpage 목록 종류(className) / 기본값='mainBookList'
 */
async function mainPromiseList(promiseData, listSort, listClass='mainBookList') {
    
    promiseData.then(function(data) {
        let mainBookList = document.getElementsByClassName(listClass)[listSort].getElementsByTagName("ul")[0];
        //5개 기준 ul width 100%
        if (listClass=='mainBookList') {
            mainBookList.style.width = (20 * data.documents.length) + "%";    
        } else if (listClass == 'searchBookList') {
            mainBookList.innerHTML = "";
        }

        const allBookInfo = data.documents;

        // 도서 검색을 실시하면 검색 결과 설정
        if (listClass == 'searchBookList') {
            document.getElementById("searchResultSign").getElementsByTagName("span")[1].innerText = allBookInfo.length;
        }

        for (let i in allBookInfo) {
            // a tag 생성
            let listA = makeATag("", "javascript:moveToDetail(asyncDetail)");
            let listIndex = document.createElement("li");

            // 도서 이미지
            let bookImg = treatThumbnail(allBookInfo[i].thumbnail, Number(i));
            listA.append(bookImg);

            // 제목
            let title = document.createElement("p");
            title.innerText = allBookInfo[i].title;
            
            // 출판사
            let publisher = document.createElement("p");
            publisher.innerText = allBookInfo[i].publisher;

            // 저자
            let authors = document.createElement("p");
            authors.innerText = allBookInfo[i].authors;

            // 가격
            let price = document.createElement("p");
            price.innerText = ("￦ " + putCommaInNumber(allBookInfo[i].price));

            // 메인 도서 목록일 때 삽입 방법
            if (listClass == 'mainBookList') {
                listA.append(title, publisher, authors, price);
                listIndex.appendChild(listA);
            
            // 검색 목록일 때 삽입 방법
            } else if (listClass == 'searchBookList') {
                let searchTexts = document.createElement("div");
                let contents = document.createElement("p");
                contents.innerText = allBookInfo[i].contents;
                searchTexts.append(title, publisher," / ", authors, price, contents);

                let searchButtons = document.createElement("div");
                searchButtons.setAttribute("class", "searchButtons")
                let detail = makeATag("자세히 보기", "javascript:moveToDetail(asyncDetail)");
                let saveBook = makeATag("찜하기");
                let gift = makeATag("선물하기");
                let cart = makeATag("장바구니");
                let purchase = makeATag("구매하기");
                
                searchButtons.append(detail, saveBook, gift, cart, purchase);
                
                listIndex.append(listA, searchTexts, searchButtons);
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

/**
 * @description Promise 형태에 존재하는 이미지(thumbnail)를 list의 표시하기 위해 처리 후 <img>형태로 출력
 * @param {String} thumbnailURL 도서 이미지의 url
 * @param {Number} thumbnailIndex mainpage에서 윗쪽부터 list 순번
 * @returns {Object}  <img> 형태의 도서 이미지
 */
function treatThumbnail(thumbnailURL, thumbnailIndex) {
    let thumbnail;
    if (thumbnailURL == '' || thumbnailURL == null) {
        thumbnail = document.createElement("div");
        const subLogo = document.createElement("img");
        const subText = document.createElement("p");
        subText.innerHTML = "이미지<br>준비중입니다!"
        subLogo.setAttribute("src", "./icons/logoRound.png");
        subLogo.setAttribute('alt', '메인도서목록' + (thumbnailIndex + 1));
        thumbnail.append(subLogo, subText);
    } else {
        thumbnail = document.createElement("img");
        thumbnail.setAttribute('src', thumbnailURL);
        thumbnail.setAttribute('alt', '메인도서목록' + (thumbnailIndex + 1));
    }
    
    return thumbnail;
}

// 상세페이지로 이동
async function moveToDetail(promiseData) {
    promiseData.then(async function(data) {
        let filename = "./bookInfos/" + data.documents[0].isbn + '/도서개요.txt';
            let response;
            try {
                response = await fetch(filename);

                if (!response.ok) {                    
                    this.location.href = "./warningNoBook.html"
                } else {
                    alertPromiseData(promiseData);
                    this.location.href = './bookDetail.html'
                }
            }
             catch (error) {
                this.location.href = "./warningNoBook.html"
            }
        });
}

/**
 * @description 상세페이지에 보내기 위한 도서 정보 표시
 * @param {Promise} promiseData Promise 형태의 data (도서 정보 하나 존재)
 * @param {Number} listSort mainpage에서 윗쪽부터 list 순번
 * @param {String} listClass mainpage 목록 종류(className) / 기본값='mainBookList'
 */
async function alertPromiseData(promiseData) {
    promiseData.then(function(data) {
        let alertMessage = "현재 보유 중인 도서가 한 종류 밖에 없습니다.\n\n현재 보유 중인 도서:\n";
        alertMessage += "   도서명: " + data.documents[0].title +"\n"; 
        alertMessage += "   저자: " + data.documents[0].authors +"\n"; 
        alertMessage += "   isbn: " + data.documents[0].isbn +"\n"; 
        alert(alertMessage);
    });
}

/**
 * @description Promise 형태의 data를 Object형태로 바꾼 후 index.html의 list 생성
 * @param {Promise} promiseData Promise 형태의 data
 * @param {Number} listSort mainpage에서 윗쪽부터 list 순번
 * @param {String} listClass mainpage 목록 종류(className) / 기본값='mainBookList'
 * @returns {Object} Promise 형태의 data 
 */
async function detailPromiseData(promiseData) {
    promiseData.then(function(data) {

        const bookAbstract = document.getElementById("bookAbstract").getElementsByTagName("div")[0];
        const title = document.createElement("h1");
        title.innerText = data.documents[0].isbn;
        bookAbstract.appendChild(title);

        bookAbstract.getElementsByTagName("h1")[0].innerHTML
            += data.documents[0].title;
    });
}