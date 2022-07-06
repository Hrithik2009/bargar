let addToCart = document.querySelectorAll('.cart-btn');
let cartCounter = document.querySelector('#cartCounter');


addToCart.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        let menu = JSON.parse(btn.dataset.menu); // The data becomes a JavaScript object.
        // const name = menu.name;
        try {
            const res = await fetch('/update-cart', {
              method: 'POST',
              body: JSON.stringify({menu}),
              headers: { 'content-type': 'application/json' }
            });
            const str = await res.text();    // reads the actual body
            const jsonData = JSON.parse(str); 
            cartCounter.innerText = jsonData.totalQty;
          }
          catch (err) {
            console.log(err);
          }
        
    });
});