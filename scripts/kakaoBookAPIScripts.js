// KakaoBook API 관련 Scripts
// openAPI url: https://dapi.kakao.com/v3/search/book
// API key: 6e914df201615b9585e5b533703a66e3
// 상세 내용: https://developers.kakao.com/

/**
 * @summary kakaoBook openAPI URL
 */
const kakaoBookURL =  "https://dapi.kakao.com/v3/search/book?"

/**
 * @summary kakaoBook URL 검색 내용 생성성
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
        sort: toSort,
        page: pageNeed,
        size: sizeNeed,
        target: searchIn
    };

    return kakaoBookParameter;
}

/**
 * @summary async-fetch 방식으로 책 검색 시행, JSON 형태로 결과 출력
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
 * @summary Promise 형태의 data를 Object형태로 바꾼 후 main용 list 생성
 * @param {Promise} originalData Promise 형태의 data
 */
async function makePromiseList(promiseData) {
    promiseData.then(function(data){
        const allBookInfo = data.documents;
        for(let i in allBookInfo){
            
            let bookIndex =  $('.bookList>li').eq(i);
            bookIndex.children('img').attr('src', allBookInfo[i].thumbnail);
            bookIndex.children('p:eq(0)').text(allBookInfo[i].title);
            bookIndex.children('p:eq(1)').text(allBookInfo[i].publisher);
            bookIndex.children('p:eq(2)').text(allBookInfo[i].authors);
            bookIndex.children('p:eq(3)').text("￦ " + putCommaInNumber(allBookInfo[i].price));
        }
    });
}

/**
 * @summary 숫자에 , 추가 (ex: 1234500 → 1,234,500)
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