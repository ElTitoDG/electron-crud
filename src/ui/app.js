const productForm = document.getElementById('productForm');

const { remote } = require('electron')
const main = remote.require('./main')



const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productsList = document.getElementById('products')

let products = []
let editingStatus = false;
let editProductId = '';


productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newProduct = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value,
    }

    if (!editingStatus) {
        const result = await main.createProduct(newProduct);
        console.log(result)
    } else {
        await main.updateProduct(editProductId, newProduct);

        editingStatus = false;
        editProductId= '';
    }

    productForm.reset();
    productName.focus();

    getProducts();
})

async function deleteProduct(id) {
   const response = confirm('¿Seguro que quieres borrarlo?')
   if (response) {
        await main.deleteProduct(id)
        getProducts();
   }
   return;
}

async function editProduct(id) {
    const product = await main.getProductById(id);
    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.description;

    editingStatus = true;
    editProductId = product.id;

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
                    <button class="btn btn-secondary" onClick="editProduct('${product.id}')">
                        EDITAR
                    </button>
                    <button class="btn btn-danger" onClick="deleteProduct('${product.id}')">
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