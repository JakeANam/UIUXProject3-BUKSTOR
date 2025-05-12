// 공통 script

fixHeader();
function fixHeader(){
    if (window.scrollY >= 25) {
        let headerBottom = this.document.getElementsByClassName("headerBottom")[0];
        headerBottom.style.position = "fixed";
        headerBottom.style.top = '0';
        headerBottom.style.left = (-1 * this.window.scrollX) + "px"
    }
}


// 스크롤시 헤더 고정
window.addEventListener("scroll", function(){
    let headerBottom = this.document.getElementsByClassName("headerBottom")[0];
    
    if(this.window.scrollY >= 25) {
        fixHeader();
        // headerBottom.style.position = "fixed";
        // headerBottom.style.top = '0';
        // headerBottom.style.left = (-1 * this.window.scrollX) + "px"
        //headerBottom.style.left = "50%";
        //headerBottom.style.transform = "translateX(-50%)"
    } else {
        headerBottom.style.position = "relative";
        headerBottom.style.left = 0;
        // headerBottom.style.transform = "translateX(0)"
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

window.addEventListener('resize', function(){
    mainBookThumbnailResizing();
});

