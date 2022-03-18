const render = (item, blocks, page) => {

    const block = document.createElement('div');     // Создание блока для контента
    block.classList.add("block", "center__block", "center")


    const img = document.createElement('img');      // добавление Картинки
    img.setAttribute("src", item.img);

    const price = document.createElement('p');      // Добавление Цены
    price.innerHTML = "Rp " + item.price;
    price.classList.add("text", "block__price")

    const name = document.createElement('p');      // Добавление Названия
    const containerName = document.createElement('div');


    const counter = document.createElement('div');
    const deleteGood = document.createElement('div');


    if (page === "cart") {
        counter.classList.add("counter");
        const counterLeftCross = document.createElement('button');
        counterLeftCross.classList.add("counter__counterLeftCross");
        counterLeftCross.innerText = "-"
        const counterRightCross = document.createElement('button');
        counterRightCross.classList.add("counter__counterRightCross");
        counterRightCross.innerText = "+"
        const counterNumber = document.createElement('span');
        counterNumber.innerText = item.total;
        counterNumber.classList.add("counter__counterNumber");
        counter.appendChild(counterLeftCross);
        counter.appendChild(counterNumber);
        counter.appendChild(counterRightCross);

        // Функция увеличения и уменьшения количества товара
        counterLeftCross.onclick = () => {
            const goods = JSON.parse(localStorage.getItem("goods"))
            let totalCount = localStorage.getItem("cartItems");
            let good = goods.find(good => good.id === item.id)
            if (good.total - 1 !== 0) {
                let totalPrice = +localStorage.getItem("totalPrice");
                totalPrice -= good.price;
                localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
                good.total = good.total - 1;
                totalCount--;
                localStorage.setItem("cartItems", JSON.stringify(totalCount));
                counterNumber.innerText = good.total;
                localStorage.setItem("goods", JSON.stringify(goods))
                document.querySelector(".cartCount").innerHTML = totalCount;
                document.querySelector(".totalMoneyBlock__count-of-items").innerHTML = getNoun(totalCount);
                document.querySelectorAll(".totalMoneyBlock__count-of-money").forEach((item) => {
                    item.innerText = +totalPrice + "₽";
                })
            }
        }
        counterRightCross.onclick = () => {
            const goods = JSON.parse(localStorage.getItem("goods"))
            let totalCount = localStorage.getItem("cartItems");
            let good = goods.find(good => good.id === item.id)
            let totalPrice = +localStorage.getItem("totalPrice");
            totalPrice += good.price;
            localStorage.setItem("totalPrice", JSON.stringify(totalPrice))

            good.total = good.total + 1;
            totalCount++;
            console.log(totalCount + "___" + item.total)
            localStorage.setItem("cartItems", JSON.stringify(totalCount));
            counterNumber.innerText = good.total;
            localStorage.setItem("goods", JSON.stringify(goods))
            document.querySelector(".cartCount").innerHTML = totalCount;
            document.querySelector(".totalMoneyBlock__count-of-items").innerHTML = getNoun(totalCount);
            document.querySelectorAll(".totalMoneyBlock__count-of-money").forEach((item) => {
                item.innerText = +totalPrice + "₽";
            })
        }

        // Кнопка Удалить товар из корзины
        const deleteGoodButton = document.createElement('button');
        deleteGoodButton.classList.add("deleteButton");
        deleteGoodButton.innerText = "Удалить из корзины";
        deleteGood.appendChild(deleteGoodButton)
        deleteGood.classList.add("block-for-description-and-counter")
    }
    name.innerHTML = item.name;
    name.classList.add("block__name")
    containerName.appendChild(name);
    containerName.appendChild(counter);
    containerName.classList.add("block-for-header-and-counter");


    const description = document.createElement('h6');      // Добавление Описания
    description.innerHTML = item.description;
    description.classList.add("block__description");


    if (item.isNew) {
        const isNew = document.createElement('div');
        const isNewTextP = document.createElement('p');

        isNew.classList.add("circle");
        isNew.classList.add("circle__text");
        isNewTextP.innerText = "New";
        isNew.appendChild(isNewTextP);
        block.appendChild(isNew);
    }

    if (item.sale) {
        const isNew = document.createElement('div');
        const isNewTextP = document.createElement('p');

        isNew.classList.add("circle");
        isNew.classList.add("circle__sale");
        isNew.classList.add("circle__text");
        isNewTextP.innerText = "-" + item.sale + "%";
        isNew.appendChild(isNewTextP);
        block.appendChild(isNew);
    }


    const hover = document.createElement('div');
    hover.classList.add("hover");
    const blockButton = document.createElement('button');
    const blockDiv = document.createElement('div');
    const blockShare = document.createElement('div');
    const blockShareA = document.createElement('a');
    const blockShareImg = document.createElement('img');
    const blockLike = document.createElement('div');
    const blockLikeA = document.createElement('div');
    const blockLikeImg = document.createElement('img');

    blockButton.innerText = "Add to cart";
    blockButton.classList.add("hover__input");
    blockLikeImg.setAttribute("src", "../img/Furniture/Like.svg");

    blockLikeImg.style.marginRight = "10px"

    blockDiv.appendChild(blockButton);
    blockShareImg.setAttribute("src", "../img/Furniture/Share.svg");
    blockShareImg.style.marginRight = "10px";

    blockDiv.classList.add("block-div");

    blockDiv.appendChild(blockShare);
    blockShare.classList.add("block-div__share")
    blockShare.appendChild(blockShareA)
    blockShareA.textContent = "Share";
    blockShareA.prepend(blockShareImg)

    blockDiv.appendChild(blockLike);
    blockLike.classList.add("block-div__like")
    blockLike.appendChild(blockLikeA);
    blockLikeA.textContent = "Like";
    blockLikeA.prepend(blockLikeImg);


    blockShareA.setAttribute("href", "#")
    blockShareA.classList.add("link")
    blockLikeA.setAttribute("href", "#")
    blockLikeA.classList.add("link")
    blockLikeA.classList.add("link__like")

    const buy = blockButton;
    const favorite = blockLikeA;

    if (page!=="cart"){
    const cartLikeShare = document.createElement('div');
    cartLikeShare.appendChild(blockButton);
    cartLikeShare.appendChild(blockDiv);
    cartLikeShare.classList.add("cartLikeShare");
    block.appendChild(cartLikeShare);
    block.appendChild(hover);
    }
    deleteGood.prepend(description)

    // Добавление всего в блок, а потом блок на страницу
    block.appendChild(img);
    block.appendChild(containerName);
    block.appendChild(deleteGood);
    block.appendChild(price);


    //block.appendChild(buyAndFavorite)
    block.style.margin = "0 12px 28px 12px"
    blocks.appendChild(block);


    // При рендере добавление Лайков и В корзину

    favorite.onclick = () => {
        const goods = JSON.parse(localStorage.getItem("goods"))
        let good = goods.find(good => good.id === item.id)
        let likeCounterOnclick = localStorage.getItem("likes")

        if (!good.like) {
            likeCounterOnclick++;
            favorite.firstChild.setAttribute("src", "../img/Furniture/Like-red.svg");
        } else {
            likeCounterOnclick--;
            favorite.firstChild.setAttribute("src", "../img/Furniture/Like.svg");

        }
        good.like = !good.like;

        localStorage.setItem("goods", JSON.stringify(goods))

        localStorage.setItem("likes", likeCounterOnclick)
        document.querySelector(".likeCount").innerHTML = likeCounterOnclick;
    }


    deleteGood.onclick = buy.onclick = () => {
        const goods = JSON.parse(localStorage.getItem("goods"))
        let good = goods.find(good => good.id === item.id)
        let buyCounter = localStorage.getItem("cartItems")
        let totalPrice = +localStorage.getItem("totalPrice");


        if (!good.cart) {
            buyCounter++;
            totalPrice += good.price;
            buy.innerHTML = "Remove from cart";
        } else {
            buyCounter--;
            totalPrice -= good.price;
            buy.innerHTML = "Add to cart";
            // Если убрали из Корзины товар, то обнулить его total до 1,
            // отрисовать новые Итого и счетчик cartItems, Cart == false, удалить элемент из корзины
            if (page === "cart") {
                totalPrice -= good.price * (good.total - 1);
                buyCounter -= good.total - 1;
                good.total = 1;
                document.querySelectorAll(".block__name").forEach((item) => {
                    if(item.textContent===good.name){
                        item.parentNode.parentNode.parentNode.removeChild(item.parentNode.parentNode);
                    }
                })
            }
        }
        good.cart = !good.cart;

        localStorage.setItem("goods", JSON.stringify(goods))
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        localStorage.setItem("cartItems", buyCounter)
        document.querySelector(".cartCount").innerHTML = buyCounter;
        if (page === "cart") {
            document.querySelector(".totalMoneyBlock__count-of-items").innerHTML = getNoun(buyCounter);
            document.querySelectorAll(".totalMoneyBlock__count-of-money").forEach((item) => {
                item.innerText = +totalPrice + "₽";
            })
        }
    }


    if (!item.like) {
        favorite.firstChild.setAttribute("src", "../img/Furniture/Like.svg");

    } else {
        favorite.firstChild.setAttribute("src", "../img/Furniture/Like-red.svg");
    }

    if (!item.cart) {
        buy.innerHTML = "Add to cart";
    } else {
        buy.innerHTML = "Remove from cart";
    }

    // Функция отрисовки слова "товар" в зависимости от количесвта товаров
    const getNoun = (number) => {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return number + " товаров";
        }
        n %= 10;
        if (n === 1) {
            return number + " товар";
        }
        if (n >= 2 && n <= 4) {
            return number + " товара";
        }
        return number + " товаров";
    }

    let buyCounter = localStorage.getItem("cartItems")
    document.querySelector(".likeCount").innerHTML = localStorage.getItem("likes");
    document.querySelector(".cartCount").innerHTML = buyCounter;


    // Если отрисовка страницы Корзины
    if (page === "cart") {
        document.querySelector(".totalMoneyBlock__count-of-items").innerHTML = getNoun(buyCounter);
    }


}

// Рендер каждого блока по массиву, 1 элемент - 1 блок
const blockRender = (goods, blocks, page) => {
    goods.forEach((item) => {
        render(item, blocks, page)
    })

    document.querySelector(".block-with-furniture").appendChild(blocks)
}


export {blockRender};





