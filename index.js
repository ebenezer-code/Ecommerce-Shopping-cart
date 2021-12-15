if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (let i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i];
            button.addEventListener('click', removeCartItem)
            
        }

    var quantityInputs = document.getElementsByName('cart-quan-input')
        for (let i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged)
            
        }

        var addToCartButtons = document.getElementsByClassName('shop-item-btn')
         for (let i = 0; i < addToCartButtons.length; i++) {
             var add = addToCartButtons[i];
             add.addEventListener('click', addToCartClicked)
             
         };

            document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
};

 function purchaseClicked() {
     alert('Thanks for Purchasing');
     var cartItems = document.getElementsByClassName('cart-items')[0]
     while (cartItems.hasChildNodes()) {
         cartItems.removeChild(cartItems.firstChild)
     }
     updateCartTotal()
 };

 function removeCartItem(event) {
     alert('You are about to remove cart item,sure??')
     var buttonClicked = event.target
     buttonClicked.parentElement.parentElement.remove()
     updateCartTotal();
    };

function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) ||  input.value <=0){
        input.value = 1;
    }
    updateCartTotal();
}
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var image = shopItem.getElementsByClassName('shop-item-img')[0].src;
    addToCart(title,price,image)
    updateCartTotal();
 }


 function addToCart(title,price,image) {
    var cartRow = document.createElement('div');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemName = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0;  i < cartItemName.length; i++) {
        if(cartItemName[i].innerText === title) {
            alert('This item has already been added to cart')
            return;
        };
    }
       var cartRowContents  =`
           <div class="cart-item cart column">
                   <img class="cart-item-image" src="${image}"width="100" height="100">
               
                   <span class="cart-item-title">${title}</span>
                  
           </div>
           <span class="cart-price cart-column">${price}</span>
           <div class="cart-quan cart-column">
                   <input class="cart-quan-input" type="number" value="1">
                   <button class="btn btn-danger " type="button">REMOVE</button>
                   
               </div>`
              cartRow.innerHTML = cartRowContents
              cartItems.append(cartRow)
              cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
              cartRow.getElementsByClassName('cart-quan-input')[0].addEventListener('change', quantityChanged);
      
   }
             
    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-Items')[0];
        var cartRows = cartItemContainer
         cartRows = document.getElementsByClassName('cart-row')[0];
        var total = 0
        for (let i = 0; i < cartRows.length; i++){
              var cartRow = cartRows[i]; 
              var priceElement = cartRow.getElementsByClassName('cart-price')[0];
              var quantityElement = cartRow.getElementsByClassName('cart-quan-input');
              var price = parseFloat(priceElement.innerText.replace('$',''));
              var quantity = quantityElement.value
              console.log(quantity)
              total = total + (price * quantity)      
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText ='$'+ total
    }
