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

// let slideBullet = document.getElementsByClassName("swiper-pagination-bullet")[0];
// slideBullet.addEventListener("click", function(){
//     slideBullet.setAttribute("class", "swiper-pagination-bullet")
// });

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

document.scrollTop = 0;
