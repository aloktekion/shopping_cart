const shop = document.getElementById('shop')

let basket = JSON.parse(localStorage.getItem('data')) || []

const generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      // how to render html element using map ;
      let { id, name, price, desc, img } = x // object destructuring ;
      let search = basket.find((x) => x.id === id) || []
      return ` <div id="product-id-${id}class="item">
      <img width="220" src="${img}" alt="this will be shown when no img is found">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2><i class="bi bi-currency-rupee"></i>${price}</h2>
            <div class="button">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id = "${id}" class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i> 
            </div>
        </div>
      </div>
    </div>`
    })
    .join('')) //why join ;
}

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

  update(selectedItem.id)
}

const update = (id) => {
  const c = document.getElementById(id) // query selctor is not working ;
  const search = basket.find((x) => {
    return x.id === id
  })
  c.innerHTML = search.item
  calculation()
}

const calculation = () => {
  const cartAmount = document.getElementById('cartAmount')
  cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0) //will go through one more time;
}
calculation()
generateShop()
