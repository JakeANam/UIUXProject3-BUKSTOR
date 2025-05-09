// 공통 script
// 스크롤시 헤더 고정
window.addEventListener("scroll", function(){
    let headerBottom = this.document.getElementsByClassName("headerBottom")[0];
    if(this.window.scrollY >= 25) {
        headerBottom.style.position = "fixed";
        headerBottom.style.top = '0';
    } else {
        headerBottom.style.position = "relative";
    }
});

// 책 이미지 높이 설정(너비:높이 = API 특성상 2:3)
function mainBookThumbnailResizing(){
    // alert('yo');
    let imageList = document.getElementsByClassName('bookList')[0].getElementsByTagName('img');

    for (let i = 0; i < imageList.length; i++) {
        imageList[i].style.height = String(imageList[i].width * 1.5) + "px";
    }
}

window.addEventListener('resize', mainBookThumbnailResizing);

