// bookDetail.html 용

document.getElementsByTagName("footer")[0].style.marginBottom = "100px";

let tabBar = document.getElementById("tabBar");
let tabBarLocation = window.pageYOffset + tabBar.getBoundingClientRect().top;


function fixTabBar() {
    if (tabBarLocation - window.pageYOffset < 73) {
        tabBar.style.position = "fixed";
        tabBar.style.top = "73px";
        tabBar.style.left = (-1 * this.window.scrollX) + "px";
    } else {
        tabBar.style.position = "relative";
        tabBar.style.left =  "0";
    }

    if (window.innerWidth < 1200) {
        tabBar.style.width = "1200px";
    } else {
        tabBar.style.width = "100%";
    }
}


function fixPurchase() {
    const purchaseWrap = document.getElementById("purchase").getElementsByClassName("wrap")[0];
    purchaseWrap.style.left = (-1 * this.window.scrollX) + "px";
}

// 도서 개요
document.addEventListener("DOMContentLoaded", async function () {
    try {
        
        const response = await fetch("./1162540168 9791162540169.txt");
        if (!response.ok) {
            this.location.href = "./warningNoBook.html"
        }
        const data = await response.text();
        const bookAbstract = document.getElementById("bookAbstract").getElementsByTagName("div")[0];
        bookAbstract.innerHTML += data;
        
    } 
    catch (error) {
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