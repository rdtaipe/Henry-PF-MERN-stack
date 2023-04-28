import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import Stars from "./Stars";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import Rating from "./Rating";

export const DetailPage = () => {
  const dispatch = useDispatch();
  const { data, cart } = useSelector(({ state }) => state.user);
  const { url, auth, setter, get } = useSelector(({ state }) => state.server);
  const userData = data();

  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get(`${url}/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err.message));

    getCurrentComments();
  }, []);
  const addToCart = () => {
    var obj = {
      id: product._id,
      date: new Date(),
    };
    auth.put(`${url}/cart/${userData._id}`, obj).then((res) => {
      var resData = res.data.products;
      console.log(resData);
      dispatch(setter({ keys: "state.user.cart", value: resData }));
    });
  };
  const slide = product.image
    ? product.image.map((x) => {
        return { url: x };
      })
    : "https://example.com/zapatos-deportivos-nike1.jpg";

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slide.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slide.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const addComment = ({ comment, stars }) => {
    const newComment = {
      name: userData.name,
      picture: userData.picture,
      productId: product._id,
      userId: userData._id,
      body: comment,
      score: stars,
      date: new Date(),
    };
    auth.post(`${url}/comments/send`, newComment).then((res) => {
      getCurrentComments();
    });
  };

  const getCurrentComments = () => {
    auth.get(`${url}/comments/${productId}`).then((res) => {
      setComments(res.data);
    });
  };

  return (
    <div className="h-full flex flex-col justify-center pt-[80px] bg-white">
      <div className="flex flex-col md:flex-row justify-evenly items-center">
        <div
          style={{
            backgroundImage: `url(${slide[currentIndex].url})`,
            backgroundPosition: "center",
          }}
          className="w-[80%] md:w-[50%] lg:w-[38%] h-[320px] sm:h-[550px] rounded-2xl bg-center bg-cover duration-500 flex mt-11 mb-8 md:mb-0 md:mt-0"
        >
          {slide.length === 1 ? null : (
            <div className="w-full h-full flex justify-between">
              <div className="w-fit h-fit relative top-[50%] text-2xl rounded-full p-2 ml-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
              </div>

              <div className="w-fit h-fit relative top-[50%] text-2xl rounded-full p-2 mr-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactRight onClick={nextSlide} size={30} />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-10 w-[45%]">
          <div className="absolute top-[110px] md:static">
            <p className="capitalize font-bold text-3xl md:text-4xl lg:text-5xl text-center font-serif">
              {product.name}
            </p>
          </div>
          <div className="flex flex-col text-center">
            <p className="font-bold text-4xl pb-3">${product.price}</p>

            <p className="font-bold">
              Option Colors:{" "}
              <span className="font-normal capitalize">{product.color}</span>
            </p>
            <div className="flex justify-center items-center py-2 ">
              <Rating
                value={
                  comments.length > 0
                    ? comments.reduce((acc, el) => acc + el.score, 0) /
                      comments.length
                    : 0
                }
                disabled={true}
                size={"small"}
              />
              <span className="text-sm text-gray-500 ml-2 pt-1">
                {comments.length} reviews
              </span>
            </div>

            <div className="flex justify-center pt-7">
              {product.size && typeof product.size === "object" ? (
                product.size.map((el) => {
                  return (
                    <button
                      key={el}
                      className="font-bold text-lg text-center bg-white px-3 py-1 border-2 border-black rounded mx-auto cursor-pointer focus:outline-none focus:ring focus:ring-gray-900 hover:ring hover:ring-gray-600 uppercase"
                    >
                      {el}
                    </button>
                  );
                })
              ) : (
                <button className="font-bold text-lg text-center bg-white px-3 py-1 border-2 border-black rounded mx-auto cursor-pointer focus:outline-none focus:ring focus:ring-gray-900 hover:ring hover:ring-gray-600 uppercase">
                  {product.size && product.size}
                </button>
              )}
            </div>
            <div className="flex justify-center">
              <button
                onClick={addToCart}
                className="w-[250px] md:w-[300px] lg:w-[450px] mt-10 font-semibold bg-gray-900 h-10 text-center border-2 border-black rounded hover:bg-blue-900 text-white"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around bg-slate-500/20 py-8 mt-8">
        <div className="w-[40%]">
          <p className="pb-5 font-bold text-lg">
            Product Description:{" "}
            <span className="font-normal text-base">{product.description}</span>
          </p>
          <p className="font-bold text-lg">
            Product Stock:{" "}
            <span className="font-normal text-base">{product.stock}</span>
          </p>
        </div>

        <div className="w-[40%]">
          <p className="pb-5 font-bold text-lg">
            Product Brand:{" "}
            <span className="font-normal text-base">{product.brand}</span>
          </p>
          <p className="font-bold text-lg">
            Product Gender:{" "}
            <span className="font-normal text-base capitalize">
              {product.genre}
            </span>
          </p>
        </div>
      </div>
      {comments.filter((item) => item.userId === userData._id).length === 0 && (
        <div className="w-full my-8 px-[2%] bg-gray-100 py-4">
          <p className="text-m font-bold py-2">Qualify {product.name}</p>
          <CommentBox avatar={userData.picture} onSubmit={addComment} />
        </div>
      )}

      <div className="w-full my-8 px-[2%]  py-4">
        <p className="text-m font-bold py-2">Comments</p>
        <div className="flex flex-col gap-4">
          {comments.map((item) => {
            return <Comment key={item._id} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};
