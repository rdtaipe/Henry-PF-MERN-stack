import React from "react";

export const AboutUs = () => {
  return (
    <div className="h-fit pt-[80px]">
      <div className="h-[350px] w-full bg-[#232323] flex justify-center items-center">
        <p className="text-[#315386] font-bold font-serif text-7xl">About Us</p>
      </div>

      <div className="flex justify-between flex-col-reverse items-center px-10 py-10 xl:flex-row">
        <div className="w-full flex justify-center xl:w-[50%]">
          <img
            src="https://www.controlcomercio.com/wp-content/uploads/2015/07/13636233053154301_big.jpg"
            alt="Image Local"
            className="w-[97%] sm:h-[400px] lg:h-[550px] rounded"
          />
        </div>
        <div className="xl:h-[550px] w-full flex flex-col items-center text-center gap-3 pb-5 xl:pb-0 xl:w-[44%] xl:text-end xl:items-end xl:justify-between">
          <div>
            <p className="text-4xl font-bold">ChicCloset</p>
            <p className="text-2xl">Dress To Impress And Never Stress</p>
          </div>
          <p className="text-xl">
            <span className="font-bold">Welcome To ChicCloset</span>, The online store where you will find all the clothing styles that you you need to
            always look fashionable. We have from casual clothes to elegant and
            sophisticated outfits. If you are looking for something relaxed and
            comfortable, we have a wide variety of sports and casual clothing,
            from baggy t-shirts and pants to sweatshirts and joggers. Yeah you
            need something more formal, don't worry, we also have suits, blouses
            and dresses for special occasions. If you like the most avant-garde
            styles, do not miss our collection of fashionable clothes, with
            exclusive and unique designs that will make you stand out anywhere.
            Also, don't forget that we also offer a wide selection of
            accessories, shoes and bags to complement You look. Visit us and
            renew your wardrobe today at ChicCloset!
          </p>
        </div>
      </div>
      <div className="bg-[#8a73cf] flex px-10 py-10 xl:flex-row xl:justify-between xl:items-stretch xl:text-left sm:flex-col sm:items-center sm:text-center">
        <div className="xl:w-[44%] sm:w-full flex flex-col justify-between xl:pt-3 sm:gap-3 sm:pb-5">
          <div>
            <p className="text-4xl font-bold">What are we looking for?</p>
          </div>
          <p className="text-xl">
            ChicCloset is a clothing store that aims to offer its customers a
            wide variety of fashionable clothing and high quality. Our main
            objective is to provide a pleasant and satisfying shopping
            experience for everyone our customers, making sure they find what
            they are looking for and feel comfortable in our store. To achieve
            this, we We focus on providing excellent customer service, fashion
            advice and competitive prices. Also, we We strive to keep an
            inventory up to date with the latest fashion trends, so that our
            customers can always find something they like. In short, the goal of
            ChicCloset is to be a leading clothing store in fashion and style,
            which offer your customers a unique shopping experience and
            satisfactory.
          </p>
        </div>

        <div className="w-full xl:w-[50%] flex justify-center">
          <img
            src="https://s1.eestatic.com/2021/06/01/como/585702661_186809520_1706x960.jpg"
            alt="Image Clothes"
            className="w-[97%] lg:h-[550px] sm:h-[450px] overflow-hidden rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
