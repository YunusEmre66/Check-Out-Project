//suat hocayla yapılan 


const taxRate=0.18;
const shippingPrice=20;
const shippingFreePrice=300;

window.addEventListener('load',()=>{
    localStorage.setItem('taxRate',taxRate)
    localStorage.setItem('shippingPrice',shippingPrice)
    localStorage.setItem('shippingFreePrice',shippingFreePrice)
    cartCalculate()
})

const productDiv=document.querySelector('.products');

productDiv.addEventListener('click',(e)=>{

    if(e.target.classList.contains('fa-minus')){   //! tıkladığım yerin classlarında fa minus içeren class varsa true döndürür.
        if(e.target.parentElement.querySelector('.quantity').innerText>1){ //!quantitiy 1 den büyük olduğu müddetçe çalışsın
            e.target.parentElement.querySelector('.quantity').innerText--
        }else{
            let cevap= confirm(`${e.target.parentElement.parentElement.querySelector('h2').innerText} silinsin mi?`)
            if(cevap){
                e.target.closest('.product').remove()    
            }
        }
    }else if(e.target.classList.contains('fa-plus')){
        e.target.previousElementSibling.innerText++
    }else if(e.target.classList.contains('remove-product')){
        e.target.closest('.product').remove()
}

productCalculate(e.target)
cartCalculate()
})

//!productler icerisineki toplama islemleri 
function productCalculate(btn){
    const productInfoDiv=btn.parentElement.parentElement;
    const price=productInfoDiv.querySelector('.product-price strong')
    const quantity=productInfoDiv.querySelector('.quantity')

    const productTotalHesap=Number(price.innerText)*Number(quantity.innerText)

    const productTotal=productInfoDiv.querySelector('.price')
    productTotal.innerText=productTotalHesap.toFixed(2)
}


function cartCalculate(){
const pricest=document.querySelectorAll('.price')
const pricestDizi=[...pricest] //!arraye dönüştürür ve içine atar bütün price ları 

const subTotal=pricestDizi.reduce((top,pric)=>top+Number(price.innerText),0).toFixed(2) //! bütün priceları bu şekilde toplar.

const subCart=document.getElementById('subtotalCart')
subCart.innerText=subTotal;

const tax=subtotal*localStorage.getItem('taxRate');
const taxCart=document.getElementById('taxRateCart')
taxCart.innerText=tax.toFixed(2);



const shippingPrice=parseFloat(subTotal>0 && subTotal<localStorage.shippingFreePrice ? localStorage.shippingPrice:0);
const shipping=document.getElementById('shippingCart')
shipping.textContent=shippingPrice


document.getElementById('totalCart').innerText= (Number(subTotal) + Number(tax) + Number(shippingPrice)).toFixed(2)

}
// Suatercan
// Suatercan#6254