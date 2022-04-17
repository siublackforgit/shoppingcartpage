let carts = document.querySelectorAll('.add-cart');
let cartnumber = document.querySelector('.cart span');
let productcarts=document.getElementById('productcarts');
let productcartstwo=document.getElementById('productcartstwo');
let products =[
    {
        name:"Greytshirt",
        tag:"greytshirt",
        price:80,
        incart:0

    },
    {
        name:"Greyhoodie",
        tag:"greyhoodie",
        price:90,
        incart:0

    },
    {
        name:"Blacktshirt",
        tag:"blacktshirt",
        price:100,
        incart:0

    },
    {
        name:"Blackhoodie",
        tag:"blackhoodie",
        price:80,
        incart:0

    }
]

for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',function(){
        
        cartitems(products[i]);
        cost(products[i]);
        display(products[i]);
        
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


function cartitems(product){
   console.log(product);
   let productnumbers = localStorage.getItem('cartNumbers');
   
   productnumbers = parseInt(productnumbers);
   console.log(typeof productnumbers);
   if(productnumbers){
       localStorage.setItem ('cartNumbers',productnumbers + 1);
       cartnumber.textContent= productnumbers + 1;
   }else {
       productnumbers = localStorage.setItem('cartNumbers' , 1);
       cartnumber.textContent=1
   }

   setitem(product);

}


function setitem(product){
    let productsincart = localStorage.getItem('productssincart');
    productsincart = JSON.parse(productsincart);

    if(productsincart != null){
       if (productsincart[product.tag] == undefined ){
        productsincart = {
            ...productsincart,
            [product.tag]:product
         }

       }
        productsincart[product.tag].incart += 1;
       

       
      
    }else{
        product.incart = 1;
        productsincart= {
            [product.tag]:product
        }
     
    }
       
    


    localStorage.setItem("productssincart",JSON.stringify(productsincart));

    
}



function cost(product){
    
    let cartcost = localStorage.getItem('storecartcost');
   
    console.log(product.price);

    if (cartcost == null){

        cartcost=parseInt(cartcost);
        console.log("pricetwo"+product.price);
        localStorage.setItem('storecartcost', product.price);
        
        
    }else{
        
        cartcost=parseInt(cartcost);
        console.log("priceone"+product.price);
        localStorage.setItem('storecartcost',cartcost+product.price);
        console.log(cartcost);
       
    }

    
    
}


function display(product){
    let productsincart = localStorage.getItem('productssincart');
    productsincart = JSON.parse(productsincart);

    let cartcost = localStorage.getItem('storecartcost');
    
    
    

    if(productsincart && cartitems){
        cartcost = parseInt(cartcost);
        productcarts.innerHTML='';
        Object.values(productsincart).map(  (item)=>{
            productcarts.innerHTML+=
            `<div class="productcartitems">
            <div class="product"><ion-icon name="close-circle"></ion-icon><img src="./img/${item.tag}.jpg" />
            <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price">
            <span>$${item.price}</span>
            </div>
            <div class="quantity">
            
            <ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon>
            ${item.incart}
            <ion-icon class ="increase"  = name="caret-forward-circle-outline"></ion-icon> 
            
           
            </div>
            <div class="total">
            ${item.incart * item.price}
            </div>
            </div>
           
            
            `
            
        });

        productcarts.innerHTML += `
        <div class="baskettotalContainer">
            <div class="basketspace">
            </div>
            <div class="baskettotal">
            <p>Basket Total</p>
            </div>
            <div class="baskettotalcost">
            <p>${cartcost}</p>
        </div>`

           
        

        
            
            
            
            
            
        
        deleteButton();
        manageproductsincart()
     }



}

function manageproductsincart(){
    let decrease=document.querySelectorAll('.decrease');
    let increase = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productssincart');
    cartItems = JSON.parse(cartItems);

    let productnumbers =localStorage.getItem('cartNumbers')
    productnumbers = parseInt(productnumbers);


    let cartcost = localStorage.getItem('storecartcost');


    for(let i=0;i<decrease.length;i++){
        decrease[i].addEventListener('click',()=>{
            let currentqty= decrease[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g,'').trim();
            if(cartItems[currentqty].incart>1){

                cartcost=parseInt(cartcost);
                localStorage.setItem('storecartcost',cartcost-cartItems[currentqty].price);

                cartItems[currentqty].incart -=1;
            localStorage.setItem('productssincart',JSON.stringify(cartItems));
            localStorage.setItem ('cartNumbers',productnumbers - 1);
            cartnumber.textContent= productnumbers - 1;
           
            
            display();
            onLoadCartNumbers();
            }else{
                alert("If your quantity is lower than 1 , delete it by clicking the delete button");
            }
            
            
        })
    }

    for(let i=0;i<increase.length;i++){
        increase[i].addEventListener('click',()=>{
            let currentqty=increase[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g,'').trim();
            cartItems[currentqty].incart +=1;

            localStorage.setItem('productssincart',JSON.stringify(cartItems));

            localStorage.setItem ('cartNumbers',productnumbers + 1);

            cartcost=parseInt(cartcost);
            localStorage.setItem('storecartcost',cartcost+cartItems[currentqty].price);
            cartnumber.textContent= productnumbers + 1;
        
            display();
            onLoadCartNumbers();
        })
    }
    
}


function deleteButton(){
    let deleteButton= document.querySelectorAll('.productcartitems ion-icon');
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productssincart');
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productName;
   
    let cartcost= localStorage.getItem('storecartcost');
    
    
    
    for(let i=0;i<deleteButton.length;i++){
        deleteButton[i].addEventListener('click',()=>{
             productName= deleteButton[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
             cartcost=parseInt(cartcost);
             console.log(productName);
             console.log(cartItems[productName]);
            localStorage.setItem('cartNumbers',productNumbers-cartItems[productName].incart);
            localStorage.setItem('storecartcost',cartcost-cartItems[productName].incart*cartItems[productName].price);
            delete cartItems[productName];
            
            localStorage.setItem('productssincart',JSON.stringify(cartItems));
            let productnumbers = localStorage.getItem('cartNumbers');
   
           
            
            display();
            onLoadCartNumbers();

            
    
        })
    }
}




onLoadCartNumbers();
display();