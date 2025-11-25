var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
        nextEl: "#next",
        prevEl: "#previous",
    },
});



async function loadProducts() {
    try {
        // Example API (free)
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const data = await response.json();

        productList = data.meals.map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            price: "$" + (Math.random() * 20 + 5).toFixed(2), // random price  
            image: meal.strMealThumb
        }));

        showCards();
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

loadProducts();




const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = document.querySelector('.fa-bars');
const searchInput = document.getElementById('search-input');    // Serach Input
const searchBtn = document.getElementById('search-btn');   // Search Btn
const clearBtn = document.getElementById('clear-btn');   // Clear Btn 



cartIcon.addEventListener('click', () => cartTab.classList.add('cart-tab-active'));
closeBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));
document.addEventListener('click', function (e) {
    // If cart is open AND click is outside cart AND click is NOT on cart icon
    if (
        cartTab.classList.contains('cart-tab-active') &&
        !cartTab.contains(e.target) &&
        !cartIcon.contains(e.target)
    ) {
        cartTab.classList.remove('cart-tab-active');
    }
});



hamburger.addEventListener('click', () => mobileMenu.classList.toggle('mobile-menu-active'));
hamburger.addEventListener('click', () => document.querySelector('.hamburger i').classList.toggle('fa-xmark'));



// FETCH  ITEM
let productList = [];
let cartProduct = [];  // it is used when we add to cart same item again again  

const updateTotals = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    document.querySelectorAll('.item').forEach(item => {

        const quantity = parseInt(item.querySelector('.quantity-value').textContent);
        const price = parseFloat(item.querySelector('.item-total').textContent.replace('$', ''));

        totalPrice += price;
        totalQuantity += quantity;
    });

    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    cartValue.textContent = totalQuantity;
}

const showCards = () => {

    productList.forEach(product => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');

        orderCard.innerHTML = `
        <div class="card-image">
            <img src="${product.image}" alt="">
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">${product.price}</h4>
        <a href="#" class="btn card-btn">Add to Cart</a>
        `;

        cardList.appendChild(orderCard);
        const cardBtn = orderCard.querySelector('.card-btn');
        cardBtn.addEventListener('click', (e) => {    // e helps us to donot reload the page after we click on add to cart 
            e.preventDefault();
            addToCart(product);
        });
    });
};




// They used for add to cart functionality when ite, is already here 
const addToCart = (product) => {

    const existingProduct = cartProduct.find(item => item.id === product.id);
    if (existingProduct) {
        alert('Item already in your cart!!');
        return;
    }

    cartProduct.push(product);
    let quantity = 1;
    let price = parseFloat(product.price.replace('$', ''));

    const cartItem = document.createElement('div');
    cartItem.classList.add('item');

    cartItem.innerHTML = `
    <div class="item-image">
        <img src="${product.image}" alt="">
    </div>
    <div class="detail">
        <h4>${product.name}</h4>
        <h4 class="item-total">${product.price}</h4>
    </div>
    <div class="flex">
        <a href="#" class="quantity-btn minus">
            <i class="fa-solid fa-minus"></i>
        </a>
        <h4 class="quantity-value">${quantity}</h4>
        <a href="#" class="quantity-btn plus">
            <i class="fa-solid fa-plus"></i>
        </a>
    </div>
    `;

    cartList.appendChild(cartItem);
    updateTotals();

    // Its is used when we click on inicrement and decerement 
    const plusBtn = cartItem.querySelector('.plus');
    const quantityValue = cartItem.querySelector('.quantity-value');
    const itemTotal = cartItem.querySelector('.item-total');
    const minusBtn = cartItem.querySelector('.minus');

    plusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        quantity++;
        quantityValue.textContent = quantity;
        itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;  // When we increase point then it will multiply it and increase the size the price of the item  and fix them ki kitne point lene h 
        updateTotals();
    });

    minusBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
            itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
            updateTotals();
        }
        else {
            cartItem.classList.add('slide-out');
            setTimeout(() => {
                cartItem.remove();
                cartProduct = cartProduct.filter(item => item.id !== product.id);
                updateTotals();
            }, 300)

        }

    })
}

const initApp = () => {
    fetch('product.json').then(response => response.json()).then(data => {
        productList = data;
        showCards();
    });
};
initApp();



// Search function 
function filterMenu() {
    const query = searchInput.value.toLowerCase().trim();
    const cards = cardList.querySelectorAll('.order-card');
    cards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        if (name.includes(query)) {
            card.style.display = 'block';
        }
        else {
            card.style.display = 'none';
        }
    });
    if (query.length > 0) {
        cardList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    filterMenu();
});
searchInput.addEventListener('input', filterMenu);   // Optional for history 



searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
        clearBtn.style.display = 'block';
    }
    else {
        clearBtn.style.display = 'none';
        filterMenu();
    }
});
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
    filterMenu();  // Reset filter to show all cards
});





