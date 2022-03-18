const leftCross = document.querySelector(".tips-tricks__cross-left");
const rightCross = document.querySelector(".tips-tricks__cross-right");
const dots = document.querySelectorAll(".slider");
let transform = 635;
document.querySelector(".tips-tricks-wrapper").style.transform = "translateX("+transform+"px)";

const slider = () => {
    leftCross.onclick = (() => {
        dots.forEach((item, i)=>{
            if (item.classList.contains("dot_focused") && !(i === 0)) {
                transform+=423;
                document.querySelector(".tips-tricks-wrapper").style.transform = "translateX("+transform+"px)";
                item.classList.add("dot_unfocused");
                item.classList.remove("dot_focused");
                dots[i - 1].classList.add("dot_focused");
                dots[i - 1].classList.remove("dot_unfocused");
            }
        })

    });

    rightCross.onclick = (() => {
        let stop = false;
        dots.forEach((item, i)=>{
            if (item.classList.contains("dot_focused") && !(i === dots.length-1) && !stop) {
                transform-=423;
                document.querySelector(".tips-tricks-wrapper").style.transform = "translateX("+transform+"px)";
                item.classList.add("dot_unfocused");
                item.classList.remove("dot_focused");
                dots[i+1].classList.add("dot_focused");
                dots[i+1].classList.remove("dot_unfocused");
                stop=!stop;
            }
        })
    });
}

export {slider}