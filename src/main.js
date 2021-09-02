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

let window

function createWindow() {
    window = new BrowserWindow({
        width: 1920,
        height: 1080,
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
    getProducts
}