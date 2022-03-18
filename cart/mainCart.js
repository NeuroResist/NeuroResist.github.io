import {blockRender} from "/js/render.js"


// Взятие носков с параметрами
const goods = JSON.parse(localStorage.getItem("goods"));


let filtered = [];
goods.forEach((item)=>{
    if(item.cart == true) {
        filtered.push(item);
    }
})

console.log(filtered)
const blocks = document.createElement('div');
blocks.classList.add("center", "center__wrap", "main-block");

let price = 0;
filtered.forEach((item)=>{
    price+=item.price*item.total;
});
localStorage.setItem("totalPrice", JSON.stringify(price));


document.querySelectorAll(".totalMoneyBlock__count-of-money").forEach((item)=>{
    item.innerText = price + "₽";
})



blockRender(filtered, blocks, "cart");

