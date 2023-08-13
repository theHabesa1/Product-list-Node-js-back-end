
const getAllProductsStatic = async (req,res) =>{
    res.status(200).json({msg:"product testing staric routing"})
}

const getAllProducts = async (req,res) =>{
    res.status(200).json({msg:"product testing routing"})
}

module.exports={
    getAllProductsStatic,
    getAllProducts,
}