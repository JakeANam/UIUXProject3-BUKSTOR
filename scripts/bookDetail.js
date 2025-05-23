// bookDetail 용

document.getElementsByTagName("footer")[0].style.marginBottom = "100px";

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


window.addEventListener("scroll", function(){
    // showBigBannerImg();
});