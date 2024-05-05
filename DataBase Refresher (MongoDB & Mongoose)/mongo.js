const MongoClient = require('mongodb').MongoClient;

// pass: vfkrRleWHOsSoDMS
const url = 'mongodb+srv://rayan:vfkrRleWHOsSoDMS@cluster0.cyggnwx.mongodb.net/products_test?retryWrites=true&w=majority';

const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };

    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db();
        const result = db.collection('products').insertOne(newProduct);

    } catch (error) {
        return res.json({message: "Cannot store data!"})
    }
    client.close();

    res.json(newProduct);
};

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url);

    let products;

    try {
        await client.connect();
        console.log('connection');

        const db = client.db();
        console.log('database');
        
        const collection = db.collection('products');
        console.log('collection');

        products = await collection.find().toArray();
        console.log('data come');

    } catch (error) {
        return res.json({message: 'Could not retrieve products.'})
    }
    client.close();

    res.json(products);
}; 


exports.createProduct = createProduct;
exports.getProducts = getProducts;


// const MongoClient = require('mongodb').MongoClient;

// const url =
// 'mongodb+srv://rayan:vfkrRleWHOsSoDMS@cluster0.cyggnwx.mongodb.net/products_test?retryWrites=true&w=majority';

// const createProduct = async (req, res, next) => {
//   const newProduct = {
//     name: req.body.name,
//     price: req.body.price
//   };
//   const client = new MongoClient(url);

//   try {
//     await client.connect();
//     const db = client.db();
//     const result = db.collection('products').insertOne(newProduct);
//   } catch (error) {
//     return res.json({message: 'Could not store data.'});
//   };
//   client.close();

//   res.json(newProduct);
// };



// const getProducts = async (req, res, next) => {
//     const client = new MongoClient(url);

//     try {
//         await client.connect();
//         const db = client.db();
//         const products = await db.collection('products')

//     } catch (error) {
//         return res.json({message: 'Could not retrieve products.'})
//     }
// };

// exports.createProduct = createProduct;
// exports.getProducts = getProducts;
