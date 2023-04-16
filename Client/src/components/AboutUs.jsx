import React from "react";

export const AboutUs = () => {
  return (
    <div className="h-fit pt-[80px]">
      <div className="h-[350px] w-full bg-[#232323] flex justify-center items-center">
        <p className="text-[#A78BFA] font-bold font-serif text-7xl">About Us</p>
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
            <span className="font-bold">Bienvenido a ChicCloset</span>, la
            tienda en línea donde encontrarás todos los estilos de ropa que
            necesitas para lucir siempre a la moda. Tenemos desde ropa casual
            hasta outfits elegantes y sofisticados. Si buscas algo relajado y
            cómodo, tenemos una gran variedad de ropa deportiva y casual, desde
            camisetas y pantalones holgados hasta sudaderas y joggers. Si
            necesitas algo más formal, no te preocupes, también contamos con
            trajes, blusas y vestidos para ocasiones especiales. Si te gustan
            los estilos más vanguardistas, no te pierdas nuestra colección de
            ropa de moda, con diseños exclusivos y únicos que te harán destacar
            en cualquier lugar. Además, no olvides que también ofrecemos una
            amplia selección de accesorios, zapatos y bolsos para complementar
            tu look. ¡Visítanos y renueva tu guardarropa hoy mismo en
            ChicCloset!
          </p>
        </div>
      </div>

      <div>
        <div className="bg-[#8a73cf] h-[550px] flex justify-between py-10 px-10">
          <div className="w-[45%] flex flex-col justify-between">
            <p className="text-4xl font-bold">¿Qué Buscamos?</p>
            <p className="text-xl">
              ChicCloset es una tienda de ropa que tiene como objetivo ofrecer a
              sus clientes una amplia variedad de prendas de vestir de moda y de
              alta calidad. Nuestro objetivo principal es brindar una
              experiencia de compra agradable y satisfactoria para todos
              nuestros clientes, asegurándonos de que encuentren lo que buscan y
              se sientan cómodos en nuestra tienda. Para lograr esto, nos
              enfocamos en proporcionar un excelente servicio al cliente,
              asesoramiento de moda y precios competitivos. Además, nos
              esforzamos por mantener un inventario actualizado con las últimas
              tendencias de la moda, para que nuestros clientes siempre puedan
              encontrar algo que les guste. En resumen, el objetivo de
              ChicCloset es ser una tienda de ropa líder en moda y estilo, que
              ofrezca a sus clientes una experiencia de compra única y
              satisfactoria.
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
