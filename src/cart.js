const label = document.getElementById('label')
const shopping = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem('data')) || []

const calculation = () => {
  const cartAmount = document.getElementById('cartAmount')
  cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0) //will go through one more time;
}
calculation()

const generateShoppingCart = () => {
  if (basket.length !== 0) {
    return (shopping.innerHTML = basket
      .map((x) => {
        let { id, item } = x
        const search = shopItemData.find((y) => y.id === id)

        return `
            <div class = "cart-items">
              <img width = "100px" src="${search.img}">
              <div class = "details">
                  <div class = "title-price-x">
                   <h3>${search.name}</h3>
                   <h3><i class="bi bi-currency-rupee"></i>${search.price}</h3>
                   <i onclick = "removeItem(${id})" class="bi bi-x-lg"></i>
                  </div>
                  <div class = "button"> 
                 
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id = "${id}" class="quantity">${item}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i> 
                  </div>
                  <h4> <i class="bi bi-currency-rupee"></i>${
                    item * search.price
                  }</h4>
              </div> 
             </div> 
            `
      })
      .join(''))
  } else {
    label.innerHTML = `<h2>Cart is Empty</h2>
        <a href="index.html">
         <button class="HomeBtn">Back to Home</button>
        </a>`
    shopping.innerHTML = ''
  }
}

generateShoppingCart()

const increment = (id) => {
  let selectedItem = id

  const search = basket.find((x) => {
    return x.id === selectedItem.id
  })

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    })
  } else {
    search.item += 1
  }
  localStorage.setItem('data', JSON.stringify(basket))
  generateShoppingCart()
  update(selectedItem.id)
}

const decrement = (id) => {
  let selectedItem = id

  const search = basket.find((x) => {
    return x.id === selectedItem.id
  })

  if (search === undefined || search.item === 0) {
    return
  } else {
    search.item -= 1
  }
  basket = basket.filter((x) => x.item !== 0) //filtering the data here;
  localStorage.setItem('data', JSON.stringify(basket))
  generateShoppingCart()

  update(selectedItem.id)
}

const update = (id) => {
  const c = document.getElementById(id) // query selctor is not working ;
  const search = basket.find((x) => {
    return x.id === id
  })
  c.innerHTML = search.item
  calculation()
  tot_cal()
}

const removeItem = (id) => {
  let selectedItem = id
  basket = basket.filter((x) => x.id !== selectedItem.id)
  localStorage.setItem('data', JSON.stringify(basket))
  generateShoppingCart()
  tot_cal()
  calculation()
}

let tot_cal = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x
        const search = shopItemData.find((y) => y.id === id)
        return item * search.price
      })
      .reduce((x, y) => x + y, 0)
    label.innerHTML = `
       <h2>Total Bill : <i class="bi bi-currency-rupee"></i> ${amount}</h2>
       <button class = "checkOut">CheckOut</button>
       <button onclick = "clearAll()" class = "removeAll">removeAll</button>
       `
  } else return
}
tot_cal()

const clearAll = () => {
  basket = []
  generateShoppingCart()
  localStorage.setItem('data', JSON.stringify(basket))
  calculation()
}
