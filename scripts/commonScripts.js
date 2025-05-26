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
        headerBottom.style.left = "0"
    }
    
}

fixHeader(); // 첫 화면 헤더 고정
window.addEventListener("scroll", function(){
    fixHeader();
});
