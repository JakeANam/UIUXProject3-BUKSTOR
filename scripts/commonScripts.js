// 공통 script

// 스크롤시 헤더 고정
function fixHeader(){
    let headerBottom = this.document.getElementsByClassName("headerBottom")[0];
 
    if (window.pageYOffset >= 25) {
        headerBottom.style.position = "fixed";
        headerBottom.style.top = '0';
        headerBottom.style.left = (-1 * this.window.scrollX) + "px"
    }else {
        headerBottom.style.position = "relative";
    }
}


fixHeader(); // 첫 화면 헤더 고정
showBigBannerImg();
window.addEventListener("scroll", function(){
    fixHeader();
    showBigBannerImg();
});


// 책 이미지 높이 설정(너비:높이 = API 특성상 2:3)
/*
function mainBookThumbnailResizing(){
    // alert('yo');
    let imageList = document.getElementsByClassName('bookList')[0].getElementsByTagName('img');

    for (let i = 0; i < imageList.length; i++) {
        imageList[i].style.height = String(imageList[i].width * 1.5) + "px";
    }
}

window.addEventListener('resize', function(){
    mainBookThumbnailResizing();
});
*/
// 대형 배너의 특정 위치에서 이미지 FadeIn
function showBigBannerImg() {
    // 대형 배너
    let wideBanner = document.getElementById("wideBanner");
    // 브라우저 기준 대형 배너 위치 (맨 위에 있으면 0)
    let wideBannerLocationY = wideBanner.getBoundingClientRect().top;
    if (window.innerHeight - 200 > wideBannerLocationY){
        wideBanner.getElementsByTagName("img")[0].style.opacity = "1";
    }
}