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
    &filter={"type":["Petreos","Ceramics","Glass"],"price":1000}
    &sort={"price":-1}
    &limit=10
    &skip=0
    */
    // fn?m=house&key=type+price&find=type:Petreos+Ceramics+Glass,price:1000&sort=price:a&limit=10&skip=0
    const fix1 = (obj) => (Object.entries(obj).map(([key, value]) => ({[key]: key === "filter" || key === "sort" ? JSON.parse(value) : value,})).reduce((acc, cur) => ({ ...acc, ...cur }), {}))
    
    const IF= (t,v) => {
        switch (t) {
            case "E":
                return v && v !== "" 
            case "b":
                return { $regex: `${v}$`, $options: "i", };
            case "c":
                return { $regex: `${v}`, $options: "i", };
            case "d":
                return { $regex: `^${v}$`, $options: "i", };
            case "e":
                return { $regex: `^${v}`, $options: "i", };
                //breack
            default:
                return { $regex: `^${v}`, $options: "i", };
        }

        
    }
    
    try {
        const value = req.query;
        var params = fix1(value);

        const newArray = [];
        switch (params.m) {
            case undefined:
            const obj = {};


            for (const model in models) {
                const result = await models[model]

            }

            res.status(200).json(result);
            break;
            case !undefined:
                const result = await models[params.m]
                    .find(IF("E",params.q)?{$or:[
                        
                    ],}
                        : {
                        $or: [
                            { name: { $regex: `^${params.q[0]}`, $options: "i", } },
                        ]
                    })
                    .sort(params.sort)
                    .limit(parseInt(params.limit))
                    .skip(parseInt(params.skip));

                    res.status(200).json({ [params.m]: result });
                break;
            default:
                break;
        }


        if (params.m === undefined) {
            const obj = {};
            //   params.key: 'type',
            //   params.q: [ 'Petreos', 'Ceramics', 'Glass' ],

            for (const model in models) {

                const result = await models[model]
                    .find(params.key && params.key !== "" ? {
                        [params.key]: params.q.length > 1 ? { $in: params.q } : { $regex: `^${params.q[0]}`, $options: "i", },


                    } : {
                        $or: [
                            { name: { $regex: `^${params.q[0]}`, $options: "i", } },
                        ]
                    })
                    .sort(params.sort)
                    .limit(parseInt(params.limit))
                    .skip(parseInt(params.skip));
                const modelNames = models[model].modelName;
                obj[modelNames] = result;
            }

            var newObj = {};
            Object.entries({ ...obj }).map(([key, value]) => {
                newObj[key] = value;
                return newObj;
            });
            newArray.push(newObj);
        } else {
            console.log(params.sort)

            const result = await models[params.m]
                .find(params.key && params.key !== "" ? {
                    [params.key]:
                        params.q.length > 1 ? { $in: params.q } : { $regex: `^${params.q[0]}`, $options: "i", },

                } : {
                    $or: [
                        { name: { $regex: `^${params.q[0]}`, $options: "i", } },
                    ]
                })
                .sort(params.sort)
                .limit(parseInt(params.limit))
                .skip(parseInt(params.skip));

            newArray.push({ [params.m]: result });
        }
        res.status(200).json(newArray[0]);
    } catch (err) {
        res.status(404).json({ message: "Not data found" });
    }
});

export default router;

