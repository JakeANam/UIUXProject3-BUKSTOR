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

//메인메뉴 도서목록 애니메이션
let listButton = document.getElementsByClassName("bookListButton");
for (let i of listButton) {
    i.onclick = function() {
        let listBody = i.parentNode.getElementsByTagName("ul")[0];
        let moveLeft = HorizonalSlideKeyframe("-1100px");
        let moveRight = HorizonalSlideKeyframe("0");
        let resetLeft = HorizonalSlideKeyframe("0");
        let presetRight = HorizonalSlideKeyframe("-1100px");
        let moveOptions = SetAnimationOption(1000);
        let resetOptions = SetAnimationOption(0);

        let toMoveOut;
        // 왼쪽으로 이동
        if (i.innerText == "<") {
            for (let i = 0; i < 5; i++) {
                toMoveOut = listBody.childNodes[i].cloneNode(true);
                listBody.appendChild(toMoveOut);
            }
            
            listBody.style.width = (Number((listBody.style.width).slice(0,-1)) + 100) + "%";
            let animateList = listBody.animate(moveLeft, moveOptions);
            animateList.onfinish = function() {
                for (let i = 0; i < 5; i++) {
                    listBody.removeChild(listBody.childNodes[0]);
                }
                listBody.style.width = (Number((listBody.style.width).slice(0,-1)) - 100) + "%";
                listBody.animate(resetLeft, resetOptions);
            }

        // 오른쪽으로 이동
        } else {
            let lastIndex = listBody.childNodes.length - 1;
            for (let i = lastIndex; i > lastIndex - 5; i--) {
                toMoveOut = listBody.childNodes[lastIndex].cloneNode(true);
                listBody.prepend(toMoveOut);
            }
            
            listBody.style.width = (Number((listBody.style.width).slice(0,-1)) + 100) + "%";
            listBody.animate(presetRight, resetOptions);
            let animateList = listBody.animate(moveRight, moveOptions);
            animateList.onfinish = function() {
                for (let i = lastIndex + 5; i > lastIndex; i--) {
                    listBody.removeChild(listBody.childNodes[i]);
                }
                listBody.style.width = (Number((listBody.style.width).slice(0,-1)) - 100) + "%";
            }
        }
    }
}

function HorizonalSlideKeyframe(moveTo){
    return [{transform: "translateX(" + moveTo + ")"}];
}

function SetAnimationOption(milisecond){
    const moveOptions = {
        duration: milisecond,
        easing: "ease-in",
        iterations: 1,
        fill: "forwards"
    };

    return moveOptions;
}

function moveToDetail(promiseData) {
    alertPromiseData(promiseData);
    location.href = './bookDetail.html';
}


showBigBannerImg();
document.scrollTop = 0; // 처음 시작할 때는 페이지 맨 위로 설정

window.addEventListener("scroll", function(){
    showBigBannerImg();
});