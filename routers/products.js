const {Product}=require("../models/product.js");
const express= require("express");
const router=express.Router();


router.get("/", async(req, res)=>{
    // const product = {
    //     id:1,
    //     name:'chopper',
    //     image:'some_url',
    // }
    const productList=await Product.find();

    if(!productList){
        res.status(500).json({success:false})
    }

    res.status(200).send(productList);
});

router.get('/:id', async(req, res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        res.status(500).json({message:"The product with this item id was not found"})
    }
    res.status(200).send(product);
});




router.post("/", function(req, res){
   const product = new Product({
    name:req.body.name,
    image:req.body.image,
    countInStock: req.body.countInStock
   })

product.save().then((createdProduct=>{
    res.status(201).json(createdProduct)
})).catch((err)=>{
    res.status(500).json({
        error:err,
        success:false
    })
})
});

router.put('/:id', async(req, res)=>{
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            image:req.body.image,
            countInStock: req.body.countInStock 
        },
        {new:true}
    )
    if(!product){
        res.status(400).json({message:"Item cannot be updated!"})
    }
    res.status(200).send(product);
});

router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({success: true, message:"Product deleted successfully"})
        }else{
            return res.status(404).json({success: true, message:"Product not found"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error:err})
    })
    });

module.exports=router;