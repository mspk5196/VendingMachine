let CurrentTime = document.getElementById("time");
let time;

setInterval(() => {
    time = new Date();
    CurrentTime.innerHTML = time;
});

let ItemList = document.getElementById("productPrice");

let productImg = document.getElementById("productImg");
let numberItems = document.getElementById("numberItems");
let cartNumber = document.getElementById("cartNumber");
let addCartBtn = document.getElementById("addCart");

// let addToCart = document.createElement('button');
// addToCart.id = "addCartBtn";
// addToCart.textContent = "+";
// addToCart.onclick = "addItemCart(event)";

// let reduceItem = document.createElement('button');
// reduceItem.id = "reduceItem";
// reduceItem.textContent = "-";
// reduceItem.onclick = "reduceCartItem(event)";

function addItemCart(event) {
    let numberItem = event.target.nextElementSibling;
    let currentValue = parseInt(numberItem.value) || 0;
    let newValue;
    if (numberItem.value >= 0 && numberItem.value <= 19) {
        newValue = currentValue + 1;
        numberItem.value = newValue;
    } else {
        alert("Maximum cart limit for one product reached");
    }
    grossTotal();
}
function reduceCartItem(event) {
    let numberItem = event.target.previousElementSibling;
    let currentValue = parseInt(numberItem.value) || 0;
    if (numberItem.value >= 1) {
        let newValue = currentValue - 1;
        numberItem.value = newValue;
    }
    // grossTotal();
    // if (numberItem.value == 0) {
    //     let cartItems = document.getElementById("cartItem");
    //     cartItems.style.display = "none";
    // }
    grossTotal();
}

let cartProducts = document.getElementById("cartProducts");

function addCart(event) {

    let productItem = event.target.parentElement;

    let Name = productItem.querySelector('img').alt;
    let productName = `<span>${Name}</span>`;

    let Image = productItem.querySelector('img').src;
    let productImage = `<img src="${Image}" id="cartImg"`;

    let productPrice = parseFloat(productItem.querySelector('p').dataset.price);

    const cartItem = document.createElement('div');
    cartItem.id = "cartItem";
    cartItem.style.display = "block";

    quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.id = "qtyInput";
    quantityInput.min = 1;
    quantityInput.max = 20;
    quantityInput.readOnly = "readonly";
    quantityInput.setAttribute('value', '1');

    let priceDisplay = `<h4 data-price="${productPrice}">Price(per Item): Rs. ${productPrice}</h4>`;

    cartItem.innerHTML = productImage + productName + priceDisplay + "<p>Quantity: </p>" + "<button id='addCartBtn' onclick='addItemCart(event); stockQtyLeft(event);'>+</button>" + quantityInput.outerHTML + "<button id='reduceItem' onclick='reduceCartItem(event); stockQtyLeft(event);'>-</button>" + "<h5 id='stockLeftText'>Stock Left : <span id='stockLeft'>19</span></h5>";

    cartProducts.appendChild(cartItem);


    grossTotal();
}

function stockQtyLeft() {
    for (let cartItem of cartProducts.children) {

        // console.log(stockLeft);

        let quantityInput = cartItem.querySelector("#qtyInput");
        let stockLeft = cartItem.querySelector("#stockLeft");
        stockLeft.value = '20';
        let numStkLeft = parseInt(stockLeft.value) || 0;

        stockLeft.innerHTML = numStkLeft - quantityInput.value;
    }

}

let grossPriceText = document.getElementById("grossPrice");
let pymtPriceText = document.getElementById("pymtGrossAmt");
let totQtyText = document.getElementById("totQtyText");
let pymtTotItems = document.getElementById("pymtTotItems");
let totalCost;
let totQty;
function grossTotal() {

    totalCost = 0;
    totQty = 0;
    for (let cartItem of cartProducts.children) {
        let quantityInput = cartItem.querySelector("#qtyInput");
        let productPrice = parseFloat(cartItem.querySelector('h4').dataset.price);

        totalCost += quantityInput.value * productPrice;
        console.log(productPrice);

        totQty += parseInt(quantityInput.value);
        console.log(totQty);
    }

    totQtyText.textContent = `${totQty}`;
    pymtTotItems.textContent = `${totQty}`
    grossPriceText.textContent = `${totalCost.toFixed(2)}`;
    pymtPriceText.textContent = `${totalCost.toFixed(2)}`;
}
function showCartBtn() {

    if (document.getElementById("cartItem") == null) {
        alert("Add products to view cart");
    }
    else {
        let cartDiv = document.getElementById("cartDiv");
        let totDiv = document.getElementById("visibility");
        totDiv.style.display = "none";
        body.style.backgroundColor = "rgba(0, 0, 0, 0.24)";
        header.style.backgroundColor = "rgba(127, 255, 212, 0.4)"
        cartDiv.style.display = "block";
    }

}

function cancelBtn() {
    let cartDiv = document.getElementById("cartDiv");
    let totDiv = document.getElementById("visibility");
    totDiv.style.display = "block";
    body.style.backgroundColor = "white";
    header.style.backgroundColor = "aquamarine"
    cartDiv.style.display = "none";

    location.reload();
}

function addProducts() {
    let cartDiv = document.getElementById("cartDiv");
    let totDiv = document.getElementById("visibility");
    let discountArea = document.getElementById("discountArea");
    totDiv.style.display = "block";
    body.style.backgroundColor = "white";
    header.style.backgroundColor = "aquamarine"
    cartDiv.style.display = "none";
    discountArea.style.display = "none";

    disctCalculate();
}
let timeLeft = document.getElementById("timeLeft");

function payBtn() {
    console.log(totalCost);

    if (totalCost === 0) {
        alert("Please add some product.");
        location.reload();
    }
    else {
        let cartDiv = document.getElementById("cartDiv");
        let totDiv = document.getElementById("visibility");
        let paymentArea = document.getElementById("paymentArea");
        let discountArea = document.getElementById("discountArea");
        totDiv.style.display = "none";
        body.style.backgroundColor = "white";
        header.style.backgroundColor = "aquamarine"
        cartDiv.style.display = "none";
        paymentArea.style.display = "none";
        disctCalculate();
        discountArea.style.display = "block";
    }
}

let disctAmtText = document.getElementById("disctAmtText");

let disctAmtTextinDisct = document.getElementById("disctAmtTextinDisct");

let disctPercent = document.getElementById("disctPercent");

let disctStatus = document.getElementById("disctStatus");

let inputDiscount = document.getElementById("inputDiscount");

let discountPayBtn = document.getElementById("discountPay");

function disctCalculate() {

    console.log(inputDiscount.value);

    console.log(totalCost);

    if (totalCost > "100.00") {

        alert("YOUR DISCOUNT CODE IS 'PURCHASE20'(Case Sensitive)");

        inputDiscount.disabled = false;

        // discountPayBtn.textContent = "Pay";

        disctStatus.textContent = "ELIGIBLE";

        if (inputDiscount.value == "PURCHASE20") {

            let disctAmt = totalCost - (totalCost * (0.2));
            console.log(disctAmt);

            disctPercent.textContent = "20%";

            disctAmtText.textContent = `${disctAmt.toFixed(2)}`;
            disctAmtTextinDisct.textContent = `${disctAmt.toFixed(2)}`;


            // pymtArea();
        }
        else if (inputDiscount.value == "") {

            pymtPriceText.textContent = `${totalCost.toFixed(2)}`;

            disctAmtText.textContent = `${totalCost.toFixed(2)}`;
            disctAmtTextinDisct.textContent = `${totalCost.toFixed(2)}`;

            disctPercent.textContent = "0%(No discount applied)";

            // pymtArea();
        }
        else {
            alert("Invalid Discount Code");

            disctPercent.textContent = "0%(No discount applied)";

            inputDiscount.value = "";
        }
    }
    else {
        inputDiscount.disabled = true;

        pymtPriceText.textContent = `${totalCost.toFixed(2)}`;

        disctAmtText.textContent = `${totalCost.toFixed(2)}`;
        disctAmtTextinDisct.textContent = `${totalCost.toFixed(2)}`;

        disctPercent.textContent = "0%(No discount applied)";

        discountPayBtn.textContent = "Pay without discount";

        disctStatus.textContent = "NOT ELIGIBLE";

        let discountSubmit = document.getElementById("discountSubmit");
        discountSubmit.disabled = true;
        let discountEdit = document.getElementById("discountEdit");
        discountEdit.disabled = true;
    }

}

function disctPayBtn() {

    if (!(inputDiscount.value == "PURCHASE20")) {

        if (inputDiscount.value == "") {
            disctCalculate();
            pymtArea();
        }
        else {
            inputDiscount.value = "";

            alert("Invalid Discount Code");
        }

    }
    else {
        pymtArea();
    }

}

function disctSmtBtn() {

    disctCalculate();

    console.log(disctAmtText);

    let disctDetailsDiv = document.getElementById("disctDetailsDiv");

    if (inputDiscount.value == "PURCHASE20") {
        disctDetailsDiv.style.display = "block";

        inputDiscount.disabled = true;

        discountPayBtn.textContent = "Pay";
    }
    else {
        alert("Enter correct discount and submit");
        inputDiscount.value = "";
    }

}

function disctEdtBtn() {
    if (inputDiscount.disabled == true) {
        inputDiscount.disabled = false;
    }
    else {
        alert("There is nothing to edit.");
    }
}

function pymtArea() {
    let cartDiv = document.getElementById("cartDiv");
    let totDiv = document.getElementById("visibility");
    let paymentArea = document.getElementById("paymentArea");
    let discountArea = document.getElementById("discountArea");
    totDiv.style.display = "none";
    body.style.backgroundColor = "white";
    header.style.backgroundColor = "aquamarine"
    cartDiv.style.display = "none";
    paymentArea.style.display = "block";
    discountArea.style.display = "none";

    timeLeft.innerHTML = "05" + ":" + "00";
    startTimer();


    function startTimer() {
        var presentTime = timeLeft.innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));
        if (s == 59) { m = m - 1 }
        if (m < 0) {
            return
        }

        timeLeft.innerHTML =
            m + ":" + s;


        if (timeLeft.textContent == ("00:00")) {
            let pymtFailBtn = document.getElementById("pymtFail");
            pymtFailBtn.style.display = "block";

            let paidBtn = document.getElementById("paid");
            paidBtn.style.display = "none";

            let pymtCancelBtn = document.getElementById("pymtCancelBtn");
            pymtCancelBtn.style.display = "block";

        }

        setTimeout(startTimer, 1000);
    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) {
            sec = "0" + sec
        };

        if (sec < 0) {
            sec = "59"
        };
        return sec;
    }
}
function pymtFailed() {
    payBtn();
    let pymtFailBtn = document.getElementById("pymtFail");

    pymtFailBtn.style.display = "none";

    let paidBtn = document.getElementById("paid");
    paidBtn.style.display = "none";

    let pymtCancelBtn = document.getElementById("pymtCancelBtn");
    pymtCancelBtn.style.display = "block";
}
function paid() {
    let dispenseText = document.getElementById("dispense");

    timeLeft.style.color = "green";


    let pymtCancelBtn = document.getElementById("pymtCancelBtn");
    pymtCancelBtn.style.display = "block";
    pymtCancelBtn.disabled = true;

    dispenseText.textContent = "Dispensed your item, Thank You for your purchase.  The page will go to home after 10 Seconds."
    timeLeft.textContent = "00:10";
    setTimeout(() => {
        location.reload();
    }, 9000);
}
