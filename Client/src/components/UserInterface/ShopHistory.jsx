import { useState } from "react";

const ShopHistory = ({ shopHistory }) => {
    return (
      <>
        {!shopHistory || shopHistory.length === 0 ? (
            <div style={{borderRadius: "10px", minWidth: "800px"}} className="ml-10 bg-stone-200 flex flex-col gap-8 pt-8 pb-8 px-10 shadow-xl">
                <h2 className="text-2xl font-bold mb-2">Shop history</h2>
                <div className="flex flex-row flex-wrap gap-24">
                  <div className="flex flex-col gap-2" style={{ width: "300px" }}>
                      <h1>Comprate algo, ratón</h1>
                  </div>
                </div>
            </div>
        ) : (
            <div>Inserta aquí el contenido del historial de compras</div>
        )}
      </>
    );
  };
  
  
  

export default ShopHistory