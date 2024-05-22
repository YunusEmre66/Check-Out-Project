//sezer hocanın yaptığı 


const taxRate = 0.18; //! burada ki değerleri daha sonradan oynadığımızda localstorageda da değiştirmiş olur.
const shippingPrice = 20;
const shippingFreePrice = 300;

window.addEventListener(`load`, () => {   //! click gibi bir event load da
    localStorage.setItem(`taxRate`, taxRate)   //! her bir değerimiizi localstorage a kaydediyoruz ki daha sonra çağırdığımızda kullanabilelim
    localStorage.setItem(`shipppingPrice`, shippingPrice)
    localStorage.setItem(`shippingFreePrice`, shippingFreePrice)

    calculateCartPrice() //!sayfa yüklendiğinde price ların toplamı çıkması için bu fonksiyonu da buraya yerleştirdik 
})

const productDiv = document.querySelector(`.products`)

productDiv.addEventListener(`click`, (event) => {    //! products de herhangi bir yere tıkladığımızda çalışacak
    if (event.target.className == "fa-solid fa-minus") { //! tıkladığımızda şu classa denk geliyorsa
        if (event.target.parentElement.querySelector(`.quantity`).innerText > 1) {  //!tıklanan yerin içindeki quantity 1 den büyükse
            event.target.parentElement.querySelector(`.quantity`).innerText--

        } else {
            if (
                confirm(
                    `${event.target.parentElement.parentElement.querySelector(`h2`).innerText //! parentin içindeki elementi aldık queryselector ile element de alabiliyoruz.
                    } will be deleted`
                )

            ) {
                event.target.closest(`product`).remove()  //! product classına kadar onu alır ve siler. en yakınındaki productu alır
            }

        }
    } else if (event.target.className == "fa-solid fa-plus") { 
        event.target.previousElementSibling.innerText++

    } else if (event.target.className == "remove-product") {
        event.target.closest(`.product`).remove() ///! remove a basınca product classına ait bütün elementleri silecek. Yani, bu kod dizisi, bir olayın tetiklendiği öğe üzerindeki en yakın üst öğe içindeki .product sınıfına sahip öğeyi kaldırır.
        // event.target.parentElement.parentElement.parentElement.remove()  bu şekilde de yazabilirdik.
    }
    calculateProductPrice(event.target)
    calculateCartPrice()

})

const calculateProductPrice = (btn) => {
    const productInfoDiv = btn.parentElement.parentElement;
    const price = Number(productInfoDiv.querySelector(`.product-price strong`).innerText)
    const quantity = Number(productInfoDiv.querySelector(`.quantity`).innerText)
    const productTotalDiv = productInfoDiv.querySelector(`.price`)

    productTotalDiv.innerText = (price * quantity).toFixed(2)
}

const calculateCartPrice = () => {
    const productTotalPricesDivs = document.querySelectorAll(`.price`)
    const subtotal = [...productTotalPricesDivs].reduce((acc, price) => acc + Number(price.innerText), 0) //! 0 artı herşeyi topluyor. 
    const taxPrice = subtotal * localStorage.getItem(`taxRate`) //! burada ki string olmasına rağmen geri çağırıp çarptığımızda number bir değer veriyor. number * string = number oluyor yani
    const shippingPrice = parseFloat(subtotal > 0 && localStorage.getItem(`shippingFreePrice`) < subtotal ? localStorage.getItem(`shippingPrice`) : 0
    ) //! eğer öyleyse 20 değilse 0 değeri ver.

    const totalCart = subtotal + taxPrice + shippingPrice;
    document.querySelector(`#subtotalCart`).innerText = subtotal.toFixed(2);
    document.querySelector(`#taxRateCart`).innerText = taxPrice.toFixed(2);
    document.querySelector(`#shippingCart`).innerText = shippingPrice.toFixed(2);
    document.querySelector(`#totalCart`).innerText = totalCart.toFixed(2);

}




