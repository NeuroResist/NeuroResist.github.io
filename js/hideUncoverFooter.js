
const menuElements = document.querySelectorAll(".footer-content__item");
for(let item of menuElements){
    let isClicked = false;
    item.onclick = ()=>{
        if(window.innerWidth<1040) {
            console.log(item.querySelector(".list"))
            if (!isClicked) {
                item.querySelector(".list").classList.add("display-block")
            } else {
                item.querySelector(".list").classList.remove("display-block")
            }
            isClicked = !isClicked;
        }
    }
}



