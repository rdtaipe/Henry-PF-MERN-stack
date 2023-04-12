import {categoryModel} from '../models/category'


export const allCategory = async (req, res) => {
    const category = await categoryModel.find({})
    if (category) {
        res.status(200).json(category)
    } else {
        res.status(400).json({ msj: 'something went wrong' })
    }
}


export const createCategory = async (req, res) => {
    const { name } = req.body
    if (name) {
        const category = await categoryModel.find({})
        const categoryF = category.filter((f) => f.name === name)
        if (categoryF === []) {
            res.status(400).json({ msj: 'the category already exists' })
        } else {
            try {
                const newCategory = new categoryModel({
                    name: name,
                })
                const result = await newCategory.save()
                console.log(result)
                res.status(200).json({ msj: 'category created successfully' })
            } catch (err) {
                console.log(err)
                res.status(400).json({ msj: 'CreateCategory', err: err })
            }
        }
    } 
    // else{}
}

export const updateCategory = async (req, res) => {
    const { name, id } = req.body
    if (!id || !name) {
        res.status(400).json({ msj: 'something went wrong' })
    } else {
        try {
            await categoryModel
                .findByIdAndUpdate(
                    id,
                    {
                        name: name,
                    },
                    { new: true }
                ) // este ultimo parámetro hace que nos devuelva el doc actualizado

                .then(() => {
                    res.status(200).json({
                        msj: 'Category Successfully Updated',
                    })
                })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msj: 'something went wrong', err: err })
        }
    }
}