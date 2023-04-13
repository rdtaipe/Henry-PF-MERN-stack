import brandModel from '../models/brand'


export const allBrands = async (req,res) =>{
    const brand = await brandModel.find({})
    if (brand) {
        res.status(200).json(brand)
    }
    else{
        res.status(400).json({message: 'Something went Wrong'})
    }
}

export const createBrand= async (req,res)=>{
    const {name} = req.body
    if (name){
        const brand= await brandModel.find({})
        const brandN= brand.filter((f)=> f.name === name)
        if(brandN === []){
            res.status(400).json({message: 'The Brand Already exists'})
        } else {
            try {
                const newBrand= new brandModel({
                    name:name,
                })
                const result = await newBrand.save()
                /////////////////////////////
                res.status(200).json(result)
                ////////////////////////////

            } catch (error) {
                res.status(400).json({message: 'Create Brand', error: error})
            }
        }
    }
}

export const updateBrand = async (req, res) => {
    const { name, id } = req.body
    if (!id || !name) {
        res.status(400).json({ msj: 'something went wrong' })
    } else {
        try {
            await brandModel
                .findByIdAndUpdate(
                    id,
                    {
                        name: name,
                    },
                    { new: true }
                ) // este ultimo parámetro hace que nos devuelva el doc actualizado

                .then(() => {
                    res.status(200).json({ msj: 'Brand Successfully Updated' })
                })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msj: 'something went wrong', err: err })
        }
    }
}

