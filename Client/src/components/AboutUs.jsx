import React from "react";

export const AboutUs = () => {
  return (
    <div className="h-fit bg-[#fff]">
      <div className="h-[350px] w-full bg-[#232323] flex justify-center items-center">
        <p className="text-[#315386] font-bold text-8xl">About Us</p>
      </div>

      <div className="flex justify-between flex-col-reverse items-center px-10 py-10 xl:flex-row">
        <div className="w-full flex justify-center xl:w-[50%]">
          <img
            src="https://loqueva.com/wp-content/uploads/2019/09/Ropa_Revolver_local_Malabia_1150_loqueva-14.jpg"
            alt="Image Local"
            className="w-[97%] sm:h-[400px] lg:h-[550px] rounded"
          />
        </div>
        <div className="xl:h-[550px] w-full flex flex-col items-center text-center gap-3 pb-5 xl:pb-0 xl:w-[44%] xl:text-end xl:items-end xl:justify-between">
          <div>
            <p className="text-4xl font-bold">ChicCloset</p>
            <p className="text-2xl">Dress To Impress And Never Stress</p>
          </div>
          <p className="text-lg md:text-xl">
            <span className="font-bold">Welcome To ChicCloset</span>, The online
            store where you will find all the clothing styles that you you need
            to always look fashionable. We have from casual clothes to elegant
            and sophisticated outfits. If you are looking for something relaxed
            and comfortable, we have a wide variety of sports and casual
            clothing, from baggy t-shirts and pants to sweatshirts and
            sweatpants. Let's say you need something more formal, don't worry,
            we also have suits, blouses and dresses for special occasions. If
            you like the most avant-garde styles, do not miss our collection of
            fashionable clothes, with exclusive and unique designs that will
            make you stand out anywhere. Also, don't forget that we also offer a
            wide selection of accessories, shoes and bags to complement You
            look. Visit us and renew your wardrobe today at ChicCloset!
          </p>
        </div>
      </div>
      <div className="bg-[#21385A] flex px-10 py-10 xl:flex-row justify-between xl:items-stretch xl:text-left flex-col items-center text-center text-[#ffff]">
        <div className="xl:w-[44%] w-full flex flex-col justify-between xl:pt-3 gap-3 pb-5">
          <div>
            <p className="text-4xl font-bold text-center xl:text-left mb-3 sm:mb-0">
              What are we looking for?
            </p>
          </div>
          <p className="text-lg md:text-xl text-center xl:text-left">
            ChicCloset is a clothing store that aims to offer its customers a
            wide variety of fashionable clothing and high quality. Our main
            objective is to provide a pleasant and satisfying shopping
            experience for everyone our customers, making sure they find what
            they are looking for and feel comfortable in our store. To achieve
            this, we We focus on providing excellent customer service, fashion
            advice and competitive prices. Also, we We strive to keep an
            inventory up to date with the latest fashion trends, so that our
            customers can always find something they like. In short terms, the
            goal of ChicCloset is to be a leading clothing store in fashion and
            style, which offer the customers a unique shopping experience.
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

      <div>
        <p className="text-4xl font-bold text-center p-10">All the collaborators of this project</p>

        <div className="flex text-xl justify-center items-center flex-wrap relative">

          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Alejo Andino</p>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-10 mt-4">
              <a href="https://github.com/AlejoAndino" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/104437588?s=400&u=403ccf7ae0c85f239c9b79530707dfb1ae534297&v=4" alt="Alejo Andino" className="w-150 h-150 object-cover" />
              </a>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-center items-center">
            <p className="font-bold mb-5">Rolando Taipe</p>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden m-14 mb-3">
              <a href="https://github.com/rdtaipe" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/77520484?v=4" alt="Integrante 1" className="w-150 h-150 object-cover" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Juan Andres</p>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden m-10 mt-4">
              <a href="https://github.com/DrewAce" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/98987069?v=4" alt="Integrante 1" className="w-150 h-150 object-cover" />
              </a>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-center items-center">
            <p className="font-bold mb-5">Jacobo Cohello</p>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden m-14 mb-3">
              <a href="https://github.com/Jcooob" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/118378780?v=4" alt="Integrante 1" className="w-150 h-150 object-cover" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Maximo Guzman</p>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden m-10 mt-4">
              <a href="https://github.com/vmaximoguzman" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/110482724?v=4" alt="Integrante 2" className="w-150 h-150 object-cover" />
              </a>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-center items-center">
            <p className="font-bold mb-5">Francisco Piedrahita</p>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden m-14 mb-3">
              <a href="https://github.com/FranPiedrahita" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/112909883?v=4" alt="Integrante 3" className="w-150 h-150 object-cover" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Ariel Zarate</p>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden m-10 mt-4">
              <a href="https://github.com/arielZarate" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/43224834?v=4" alt="Integrante 3" className="w-150 h-150 object-cover" />
              </a>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-center items-center">
            <p className="font-bold mb-5">Renzo Cervantes</p>
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden m-14 mb-3">
              <a href="https://github.com/Razaca" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/88416218?v=4" alt="Integrante 3" className="w-150 h-150 object-cover" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
