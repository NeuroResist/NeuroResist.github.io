import {blockRender} from "/js/render.js"


// Взятие носков с параметрами
const goods = JSON.parse(localStorage.getItem("goods"));


let filtered = [];
goods.forEach((item)=>{
    if(item.like == true) {
        filtered.push(item);
    }
})

console.log(filtered)
const blocks = document.createElement('div');
blocks.classList.add("center", "center__wrap", "main-block");


blockRender(filtered, blocks, "likes");

