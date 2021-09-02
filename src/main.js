const {BrowserWindow, Notification} = require('electron')
const {getConnection} = require('./database')

async function createProduct(product) {
    try {
        const conn = await getConnection();
        product.price = parseFloat(product.price)
        const result = await conn.query('INSERT INTO product SET ?', product)

        new Notification({
            title: 'ElectronDB',
            body: 'Nuevo Producto guardado'
        }).show();

        product.id = result.insertId;
        return product;
    } catch (error) {
        console.log(error)
    }
}

async function getProducts() {
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM product ORDER BY id DESC')
    console.log(results)
    return results;
}

async function deleteProduct(id) {
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM product WHERE id = ?', id);
    console.log(result)
    return result;
}

let window

function createWindow() {
    window = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    })
    window.loadFile('src/ui/index.html');
}

module.exports = {
    createWindow,
    createProduct,
    getProducts,
    deleteProduct
}