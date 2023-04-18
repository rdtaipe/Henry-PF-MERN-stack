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
    const fix1 = (obj) => (Object.entries(obj).map(([key, value]) => ({ [key]: key === "filter" || key === "sort"? JSON.parse(value) : value, })).reduce((acc, cur) => ({ ...acc, ...cur }), {}))

    const fixtype = (v) => (Object.values(v).toString().split(" ")[1].replaceAll("(", "").replaceAll(")", "").toLowerCase())

    const fixQuery = (keys, value, params) => {
        // console.log(params)
        
        var options = params.options && params.options !== "" ? params.options : "i"
        var regex = params.regex? params.regex=="all"? "/*" : "^": "^"
        
        // quita las keys dentron de filter con los arrays vacios 
        var newFilter = params.filter? Object.entries(params.filter).reduce((acc, [key, value]) => {
            if (value[0].length > 0) {
                acc[key] = value
            }
            return acc
        }, {}) : null

        var ifFilter = params.filter? Object.keys(params.filter).length>0? true: false: false

        const query = params.q && params.q !== "" && !params.filter? {

            $or: value.map((val, i) => {
                const type = fixtype(val)
                const key = [keys[i]][0]

                if (key==="name"&& type === "string" && typeof params.q === "string") {
                    // console.log("ok","case undefined - !filter")
                    return { [key]: { $regex: `^${params.q}`, $options: "i" } }
                } else {
                    return null
                }

            }).filter(v => v !== null)
        } : ifFilter?{
            $and: Object.entries(params.filter).reduce((acc, [key, value]) => {

                // console.log("ok","case undefined - filter")
              
                if (value.length === 1) {
                    const type = typeof value[0]
                    console.log(value[0], type)
                    if (type === "string") {
                        acc.push({ [key]: { $regex: `${regex}${value[0]}`, $options: options } })
                    } else if (type === "number") {
                        // $gt  $lte  $lt  $gte
                        acc.push({ [key]: { $lte: value[0], } })
                    }
                    else if (type === "boolean") {
                        acc.push({ [key]: value[0] })
                    }

                } else if (value.length > 1) {
                    acc.push({ [key]: { $in: value } })
                }

                return acc
            }, [])
        }: {}

        // console.log(query)
        return query
    }
    
    try {
        const value = req.query;
        var params = fix1(value);
        switch (typeof params.m) {
            case "undefined":
                const obj = {};
                for (const model in models) {
                    const keys = Object.keys(models[model].schema.obj)
                    const value = Object.values(models[model].schema.obj)
                    const query = fixQuery(keys, value, params)

                    const result = await models[model].find(query)
                        .collation({ locale: 'en', strength: 2 })
                        .sort(params.sort)
                        .limit(parseInt(params.limit))
                        .skip(parseInt(params.skip))
                        const documents=await models[model].countDocuments()

                        
                    obj[model] = result;
                    obj["documents"]=documents
                }

                res.status(200).json(obj);
                break;
            case "string":
                const model = await models[params.m]
                const keys = Object.keys(model.schema.obj)
                const value = Object.values(model.schema.obj)
                const query = fixQuery(keys, value, params)

                const result = await model.find(query)
                    .collation({ locale: 'en', strength: 2 })
                    .sort(params.sort)
                    .limit(parseInt(params.limit))
                    .skip(parseInt(params.skip))
                  const documents=await model.countDocuments()

                  console.log(documents)
                   

                res.status(200).json({ [params.m]: result, documents })

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