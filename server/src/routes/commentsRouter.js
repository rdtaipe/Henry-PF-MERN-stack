import express from "express";
import commentModel from "../models/comments.js";
import productModel from "../models/product.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await commentModel.find({});
    const comments = response?.map((C) => {
      const mess = {
        id: C._id,
        name: C.name,
        email: C.email,
        message: C.message,
      };
      return mess;
    });
    if (comments.length > 0) {
      res.status(200).send(response);
    } else {
      res.status(200).json({ msg: "There're no comments yet" });
    }
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentModel.find({ productId: id });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(200).json({ message: "There're no comments yet" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/send", async (req, res) => {
  try {
    const { name, picture, productId, userId, body, score, date } = req.body.data;
    var findComment = await commentModel.findOne({ productId: productId, userId: userId })

    if ((name, picture, productId, userId, body, score, date)) {
      if (findComment) {
        const deliteComment = await commentModel.findByIdAndDelete(findComment._id)
        if (deliteComment) {
          await commentModel.create({
            name,
            picture,
            productId,
            userId,
            body,
            score,
            date,
          });
        }
      } else {
        await commentModel.create({
          name,
          picture,
          productId,
          userId,
          body,
          score,
          date,
        });
      }
      /* add new score to product */
      const comments = await commentModel.find({ productId: productId })
      const promScore = comments.length ? (comments.reduce((acc, el) => acc + el.score, 0)) / (comments.length) : stars;

      await productModel.findByIdAndUpdate({ _id: productId },
        { $set: { stars: promScore } }
      );
      /* *** */
      res.status(201).json(commentModel);
    } else res.status(406).send("There isn't comment to save");
  } catch (error) {
    console.log("Error sending the comment");
    res.status(500).json({ message: error.message });
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await commentModel.findByIdAndDelete(id);
  res.json(deleted);
});

export default router;
