const productForm = document.getElementById('productForm');

const { remote } = require('electron')
const main = remote.require('./main')



const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productsList = document.getElementById('products')

let products = []


productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newProduct = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value,
    }

    const result = await main.createProduct(newProduct);
    console.log(result)

    productForm.reset();
    productName.focus();

    getProducts();
})

function deleteProduct(id) {
    console.log(id)
}

function renderProducts(products) {
    productsList.innerHTML = '';
    products.forEach(product => {
        productsList.innerHTML += `
            <div class="card card-body my-2 animate__animated animate__fadeInLeft">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <h3>${product.price}</h3>
                <p>
                    <button class="btn btn-secondary">
                        EDITAR
                    </button>
                    <button class="btn btn-danger" onClick="deleteProduct(1)">
                        BORRAR
                    </button>
                    
                </p>
            </div>
        `;
    })
}

const getProducts = async () => {
    products = await main.getProducts();
    renderProducts(products);
}

async function init() {
    await getProducts();
}

init();