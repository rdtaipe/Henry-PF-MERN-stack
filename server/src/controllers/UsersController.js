import userModel from '../models/user'
import {createCart} from './CartController'
// import {e} from './E'

export const allUsers = async (req, res, next) => {
    const {id}= req.query
    try {
        if(!id){
            res.status(400).send({msg:"No ID passed. Cannot access data"})
        }
        
        const user = await userModel.findById(id)

        if(!user.isAdmin){
            res.status(400).send({msg:"Access denied. User is not admin"})
        }
        const response = await userModel.find({})
        

        const users = response?.map((us) => {
            const User = {
                id: us._id,
                fullName: us.fullName,
                email: us.email,
                birthDate: us.birthDate,
                genre: us.genre,
                country: us.country,
                address: us.address,
                tel: us.tel,
                image: us.image,
                isAdmin: us.isAdmin,
                active: us.active,
            }
            return User
        })

        if (users.length > 0) res.status(200).send(users)
        else return { msg: 'There are not users in the DB' }
    } catch (error) {
        console.error("Error occurred. Users couldn't be shown.")
        next(error)
    }
}


export const userLoggin = async (req, res, next) => {
    const {name, picture }=req.body
    try {
        const { email } = req.params

        const Us = await userModel.findOne({email:email})

        if(!Us){
            const User = {
                fullName: name,
                email: email,
                image: picture,
                active: true,
                isAdmin: false,
            }
            const response = await userModel.create(User)

            const cart = await createCart(response._id)
            console.log('create carrito: '+ cart)

            await EmeilerConfig(User.email, User.fullName)
            
            res.status(200).send({
                msg:"User created succesfully",
                data:User,
                db_response: response        
            })
        } else if (Us.active === false){
            res.status(403).send({msg: "User Blocked"})
        }
        else{res.status(200).send(Us)}

    } catch (error) {
        console.error("Error occurred. User couldn't be shown.")
        next(error)
    }
}


export const userProfile = async (req, res, next) => {
    const { id } = req.params
    try {
        if (id) {
        const Us = await userModel.findById(id)
            
        res.status(200).send(Us)

        } else res.send(400).send("There's no ID to find an User")
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const createUser = async (req, res, next) => {
    let {
        fullName,
        email,
        password,
        birthDate,
        genre,
        country,
        address,
        tel,
        image,
        isAdmin
    } = req.body

    if (!fullName || !email || !password) res.status(400).send('Falta enviar datos obligatorios')


    try {
        const userCreate= new userModel({
            fullName, 
            email, 
            password, 
            birthDate, 
            genre, 
            country, 
            address, 
            tel, 
            image,
            isAdmin: isAdmin || false,
            active: true,
        });
        const result = await userCreate.save()
        console.log(result)
        const cart = await CreateCart(result._id)
        console.log('create carrito: '+ cart)
        await EmeilerConfig(req.body.email,req.body.firstName)
           
        res.status(201).send('User Successfully Created');
 
    } catch (error) {
        console.log('Error creating the user')
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        let {
            fullName,
            email,
            birthDate,
            genre,
            country,
            address,
            identificationNumber,
            tel,
            image,
        } = req.body

        await userModel.findByIdAndUpdate(
            id,
            {
                fullName: fullName,
                email: email,
                birthDate: birthDate,
                genre: genre,
                country: country,
                address: address,
                identificationNumber: identificationNumber,
                tel: tel,
                image: image,
            },
            { new: true } 
        )
        .then(() => {
            
            res.status(200).send('User Successfully Updated')
        })
    } catch (error) {
        console.error('Failed to update the user')
        next(error)
    }
}

export const updateUserAdmin = async (req, res, next) => {
    try {
        const { id } = req.params
        let {
            fullName,
            email,
            birthDate,
            genre,
            country,
            address,
            identificationNumber,
            tel,
            image,
            active,
            isAdmin,
        } = req.body

        await userModel.findByIdAndUpdate(
            id,
            {
                fullName: fullName,
                email: email,
                birthDate: birthDate,
                genre: genre,
                country: country,
                address: address,
                identificationNumber,
                tel: tel,
                image: image,
                active: active,
                isAdmin: isAdmin,
            },
            { new: true }  // este ultimo parámetro hace que nos devuelva el user actualizado
        )
        .then(() => {
           
            res.status(200).send('User Successfully Updated')
        })
    } catch (error) {
        console.error('Failed to update the user')
        next(error)
    }
}

export const Admins = async (req, res, next) => {
    try {

        const admins = await userModel.find({isAdmin:true})
            
        admins ?
        res.status(200).send(admins)
        : 
        res.send(400).send("There are no admins in the db")

    } catch (error) {
        console.log(error)
        next(error)
    }
}

