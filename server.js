const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/productModel')

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.get("/",(req,res) =>
{
    const message = "Welcome to Marketplace application"; 
    res.send({ message })
})
//get all
app.get('/product', async(req,res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
)
//get using id
app.get('/product/:id', async(req,res) =>{
    try {
        const {id} =req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
)

//create product
app.post('/product', async(req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put('/product/:id', async(req, res)=>{
    try {
        const {id} =req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        //if product is noot found
        if(!product){
            return res.status(404).json({message:'cannot find any product with ID ${id}'})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete a product by id
app.delete('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Delete all products
app.delete('/product', async (req, res) => {
    try {
        
        const result = await Product.deleteMany({});
        
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No products found to delete.' });
        }

        res.status(200).json({ message: 'All products have been deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search for products by name
app.get('/product', async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: "Please provide a 'name' query parameter." });
        }

        const products = await Product.find({ name: { $regex: name, $options: 'i' } });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found matching the provided name.' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


mongoose.set("strictQuery",false)

mongoose.connect('mongodb+srv://NathanielComp229:301231884@cluster0.c3vhbwr.mongodb.net/Marketplace?retryWrites=true&w=majority')
.then(() =>{
    console.log('connected to MongoDB')
    app.listen(5000, ()=> {
        console.log('Server is running on port 5000')
    });
    
}).catch((error) =>{
    console.log(error)
})