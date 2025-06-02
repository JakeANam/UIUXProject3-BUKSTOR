// 자바스크립트 애니메이션 

// 공통 화면 - 도서목록 애니메이션
let listButton = document.getElementsByClassName("bookListButton");

for (let i of listButton) {
    // 도서 목록 버튼 클릭시 슬라이드
    i.onclick = function() {
        let listBody = i.parentNode.getElementsByTagName("ul")[0];
        let moveLeft = horizonalSlideKeyframe("-1100px");
        let moveRight = horizonalSlideKeyframe("0");
        let resetLeft = horizonalSlideKeyframe("0");
        let presetRight = horizonalSlideKeyframe("-1100px");
        let moveOptions = setAnimationOption(1000);
        let resetOptions = setAnimationOption(0);

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

// 상세페이지 - 탭 바꾸기
function changeTabContents(choosen) {
    const allContents = document.getElementById("tabContents").children;
    for (let i of allContents) {
        console.log(i);
        i.style.display = "none";
        allContents[choosen].animate(fadeInOutKeyframe(0), setAnimationOption(0));
    }

    allContents[choosen].style.display = "block";
    allContents[choosen].animate(fadeInOutKeyframe(1), setAnimationOption(100));
}

// 관련 함수
// 키프레임 설정
// 가로 이동 키프레임
function horizonalSlideKeyframe(moveTo) {
    return [{transform: "translateX(" + moveTo + ")"}];
}

// 페이드 인 & 아웃 키프레임
function fadeInOutKeyframe(opacityOption) {
    return[{opacity: opacityOption}];
}

// 애니메이션 설정
function setAnimationOption(milisecond) {
    const moveOptions = {
        duration: milisecond,
        easing: "ease-in",
        iterations: 1,
        fill: "forwards"
    };

    return moveOptions;
}

