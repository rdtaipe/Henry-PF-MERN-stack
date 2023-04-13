import express from "express";
import product from '../models/product.js'
import user from "../models/user.js";

const router = express.Router();

const models = {
    product,
    user,
};

String.prototype.r = function (search, replacement) {
    return this.split(search).join(replacement);
};

router.get("", async (req, res) => {

    /*
    find?
    m=house
    &q=a
    &filter={"type":["Petreos","Ceramics","Glass"],"price":[1000]}
    &sort={"price":-1}
    &limit=10
    &skip=0
    */
    // fn?m=house&key=type+price&find=type:Petreos+Ceramics+Glass,price:1000&sort=price:a&limit=10&skip=0
    const fix1 = (obj) => (Object.entries(obj).map(([key, value]) => ({ [key]: key === "filter" || key === "sort" ? JSON.parse(value) : value, })).reduce((acc, cur) => ({ ...acc, ...cur }), {}))

    const fixtype = (v) => (Object.values(v).toString().split(" ")[1].replaceAll("(", "").replaceAll(")", "").toLowerCase())


    try {
        const value = req.query;
        var params = fix1(value);
        switch (typeof params.m) {
            case "undefined":
                const obj = {};
                for (const model in models) {
                    const keys = Object.keys(models[model].schema.obj)
                    const value = Object.values(models[model].schema.obj)
                    const query = params.q && params.q !== "" && params.filter === undefined ? {
                        $or: value.map((val, i) => {
                            const type = fixtype(val)
                            if (type === "string" && typeof params.q === "string") {
                                return { [keys[i]]: { $regex: `^${params.q}`, $options: "i" } }
                            } else if (type === "number" && typeof params.q === "number") {
                                return { [keys[i]]: { $gt: params.q, } }
                            } else {
                                return null
                            }

                        }).filter(v => v !== null)
                    } : params.filter === undefined ? {} : {
                        $and: Object.entries(params.filter).reduce((acc, [key, value]) => {
                            if (value.length === 1) {
                                const type = typeof value[0]
                                if (type === "string") {
                                    acc.push({ [key]: { $regex: `^${value[0]}`, $options: "i" } })
                                } else if (type === "number") {
                                    // $gt  $lte  $lt  $gte
                                    acc.push({ [key]: { $gt: value[0], } })
                                }
                                else if (type === "boolean") {
                                    acc.push({ [key]: value[0] })
                                }

                            } else if (value.length > 1) {
                                acc.push({ [key]: { $in: value } })
                            }

                            return acc
                        }, [])
                    }
                    const result = await models[model].find(query)
                        .sort(params.sort)
                        .limit(parseInt(params.limit))
                        .skip(parseInt(params.skip))
                    obj[model] = result;
                }

                res.status(200).json(obj);
                break;
            case "string":
                const model = await models[params.m]
                const keys = Object.keys(model.schema.obj)
                const value = Object.values(model.schema.obj)

                const query = params.q && params.q !== "" && params.filter === undefined ? {
                    $or: value.map((val, i) => {
                        const type = fixtype(val)
                        if (type === "string" && typeof params.q === "string") {
                            return { [keys[i]]: { $regex: `^${params.q}`, $options: "i" } }
                        } else if (type === "number" && typeof params.q === "number") {
                            return { [keys[i]]: { $gt: params.q, } }
                        } else {
                            return null
                        }

                    }).filter(v => v !== null)
                } : params.filter === undefined ? {} : {
                    $and: Object.entries(params.filter).reduce((acc, [key, value]) => {

                        if (value.length === 1) {
                            const type = typeof value[0]
                            // console.log(type, value[0])
                            if (type === "string") {
                                acc.push({ [key]: { $regex: `^${value[0]}`, $options: "i" } })
                            } else if (type === "number") {
                                // $gt  $lte  $lt  $gte
                                acc.push({ [key]: { $gt: value[0], } })
                            }
                            else if (type === "boolean") {
                                acc.push({ [key]: value[0] })
                            }

                        } else if (value.length > 1) {
                            acc.push({ [key]: { $in: value } })
                        }

                        return acc
                    }, [])
                }
                console.log(query)
                const result = await model.find(query)
                    .sort(params.sort)
                    .limit(parseInt(params.limit))
                    .skip(parseInt(params.skip))

                res.status(200).json({ [params.m]: result })

                break;
            default:

                res.status(404).json({ message: "Not data found" });
                break;
        }
    } catch (err) {
        res.status(404).json({ message: "Not data found" });
    }
});

export default router;