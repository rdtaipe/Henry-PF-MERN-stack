import React from "react";

export const AboutUs = () => {
  return (
    <div className="h-fit pt-[80px]">
      <div className="h-[350px] w-full bg-[#232323] flex justify-center items-center">
        <p className="text-[#315386] font-bold font-serif text-7xl">About Us</p>
      </div>
      <div className="flex justify-between px-10 py-10">
        <div className="w-[50%]">
          <img
            src="https://www.controlcomercio.com/wp-content/uploads/2015/07/13636233053154301_big.jpg"
            alt="Image Local"
            className="h-[550px] overflow-hidden rounded-lg"
          />
        </div>
        <div className="w-[45%] flex flex-col justify-between items-end">
          <div>
            <p className="text-end text-4xl font-bold">ChicCloset</p>
            <p className="text-2xl">Dress To Impress And Never Stress</p>
          </div>
          <p className="text-end text-xl">
            <span className="font-bold">Welcome To ChicCloset</span>, The online store where you will find all the clothing styles that you
            you need to always look fashionable. We have from casual clothes
            to elegant and sophisticated outfits. If you are looking for something relaxed and
            comfortable, we have a wide variety of sports and casual clothing, from
            baggy t-shirts and pants to sweatshirts and sweatpants. Let's say
            you need something more formal, don't worry, we also have
            suits, blouses and dresses for special occasions. If you like
            the most avant-garde styles, do not miss our collection of
            fashionable clothes, with exclusive and unique designs that will make you stand out
            anywhere. Also, don't forget that we also offer a
            wide selection of accessories, shoes and bags to complement
            You look. Visit us and renew your wardrobe today at
            ChicCloset!
          </p>
        </div>
      </div>

      <div>
        <div className="bg-[#21385A] h-[550px] flex justify-between py-10 px-10 mb-20 text-[#ffff]">
          <div className="w-[45%] flex flex-col justify-between">
            <p className="text-4xl font-bold">What are we looking for?</p>
            <p className="text-xl">
              ChicCloset is a clothing store that aims to offer
              its customers a wide variety of fashionable clothing and
              high quality. Our main objective is to provide a
              pleasant and satisfying shopping experience for everyone
              our customers, making sure they find what they are looking for and
              feel comfortable in our store. To achieve this, we
              We focus on providing excellent customer service,
              fashion advice and competitive prices. Also, we
              We strive to keep an inventory up to date with the latest
              fashion trends, so that our customers can always
              find something they like. In short terms, the goal of
              ChicCloset is to be a leading clothing store in fashion and style, which
              offers the customers a unique and satisfactory shopping experience.
            </p>
          </div>
          <div className="w-[50%]">
            <img
              src="https://media.informabtl.com/wp-content/uploads/2017/10/marcas-de-ropa-ma%CC%81s-valiosas-2017-retail.jpg"
              alt="Image Clothes"
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
