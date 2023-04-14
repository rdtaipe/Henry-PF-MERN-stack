import addressModel from '../models/address.js'


export const getAddress= async(req,res)=>{
    const {id} =req.query
    const allAddress= await addressModel.find({})
    if(id){
        const result=allAddress.filter(d=>d.userId===id)
        if(result.lenght){
            res.status(200).json(result)
        }
        else{
            res.status(200).json({message:'Couldnt Find Address'})
        }
    }
    else{
        res.status(200).json(allAddress)
    }
}

export const createAddress= async(req,res)=>{
    const {street,codeNumber,phoneNumber,houseNumber,cp,city,userId,country}=req.body
    if(codeNumber<1 || phoneNumber<1 || houseNumber<1 || cp<1 || !city || !userId || !country){
        res.status(400).json({message:'All Data required'})
    }
    else{
        const createAdd= new addressModel({
            street: street,
            codeNumber: codeNumber,
            phoneNumber: phoneNumber,
            houseNumber: houseNumber,
            cp: cp,
            city: city,
            userId: userId,
            country: country,
        })
        ////////////////////////////
        try {
            const result = await createAdd.save()
            res.status(200).json(result)
          } catch (err) {
            res.status(500).json({
              msj: 'Couldnt Create Address'
            })
        }
        ///////////////////////////
    }
}

export const updateAddress=async (req,res)=>{
    const {street,codeNumber,phoneNumber,houseNumber,cp,city,userId,country}=req.body
    if(codeNumber<1 || phoneNumber<1 || houseNumber<1 || cp<1 || !city || !userId || !country){
        res.status(400).json({message:'All Data required'})
    }else{
    if(id){
        const allAddress= await addressModel.find({})
        const result= allAddress.filter(f=>f._id==id)
        console.log(result)
        if(result.length){
            await addressModel.findByIdAndUpdate(id,{
                street:street,
                codeNumber:codeNumber,
                phoneNumber:phoneNumber,
                houseNumber:houseNumber,
                cp:cp,
                city:city,
                userId:userId,
                country:country
            },{ new: true })
            .then(()=>{
                res.status(200).json({msj:'Address updated'})
            })

        }else{
            res.status(400).json({msj:'Address no fuond'})
        }
    }else{
        res.status(400).json({msj:'id is required'})
    }
 }
}

