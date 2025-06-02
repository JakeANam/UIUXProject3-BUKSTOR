// index.html 용

// Swiper 적용
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    effect: "fade",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

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