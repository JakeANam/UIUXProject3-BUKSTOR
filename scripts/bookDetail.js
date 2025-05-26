// bookDetail 용

document.getElementsByTagName("footer")[0].style.marginBottom = "100px";

function SetAnimationOption(milisecond){
    const moveOptions = {
        duration: milisecond,
        easing: "ease-in",
        iterations: 1,
        fill: "forwards"
    };

    return moveOptions;
}

// 상세페이지로 이동
function moveToDetail(promiseData) {
    alertPromiseData(promiseData);
    location.href = './bookDetail.html';
}


let tabBar = document.getElementById("tabBar");
let tabBarLocation = window.pageYOffset + tabBar.getBoundingClientRect().top;
function fixTabBar() {
    // console.log(tabBarLocation - window.pageYOffset)
    if (tabBarLocation - window.pageYOffset < 73) {
        tabBar.style.position = "fixed";
        tabBar.style.top = "73px";
        tabBar.style.width= "100%";
        tabBar.style.left = "50%";
        tabBar.style.transform = "translateX(-50%)";
    } else {
        tabBar.style.position = "relative";
    }
    // // alert(tabBarLocation);
}


function fixPurchase() {
    const purchaseWrap = document.getElementById("purchase").getElementsByClassName("wrap")[0];
    purchaseWrap.style.left = (-1 * this.window.scrollX) + "px";
}

// 부제 및 소개
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("./도서 부제 및 소개.txt");
        
        if (!response.ok) {
            throw new Error("네트워크 상의 문제가 발생했습니다.");
        }
        const data = await response.text();
        return await data;
    } catch (error) {
        console.error("경고! 다음 이유로 컨텐츠를 불러들이지 못했습니다!: ", error)
    }
});



// 환불 규정
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("./환불 규정.txt");
        
        if (!response.ok) {
            throw new Error("네트워크 상의 문제가 발생했습니다.");
        }

        const data = await response.text();
        document.getElementById("problemSolving").innerHTML += data
        return await data;
    } catch (error) {
        console.error("경고! 다음 이유로 컨텐츠를 불러들이지 못했습니다!: ", error)
    }
});

fixPurchase();
fixTabBar();
window.addEventListener("scroll", function(){
    fixPurchase();
    fixTabBar();
});