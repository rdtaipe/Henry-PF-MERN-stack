import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import PurchaseItem from './PurchaseItem'


const ShopHistory = ({ shopHistory }) => {

    return (
      <>
        {!shopHistory || shopHistory.length === 0 ? (
          <div style={{borderRadius: "10px", minWidth: "800px"}} className="ml-10 bg-stone-200 flex flex-col mt-1 gap-8 pt-8 pb-4 px-10 shadow-xl text-center transition">

            <h2 className="text-2xl font-bold mb-2 mx-auto">Your cart is empty, let's get chic!</h2>

            <div className="flex flex-row flex-wrap items-center justify-center gap-24">

              <div className="flex flex-col pb-8">
                <FaShoppingCart  size={150} className="my-4 mx-auto"/>
                <Link to="/home" className="bg-gray-800 text-white py-2 px-4 sm:px-12 rounded mt-6 hover:bg-blue-900 transition inline-block">
                  Go to main page
                </Link>
              </div>

            </div>

          </div>

        ) : (
          <div style={{borderRadius: "10px", minWidth: "800px", height: "380px"}} className="ml-10 bg-stone-200 flex flex-col mt-1 gap-8 pt-8 pb-8 shadow-xl transition">

            <h2 className="text-2xl font-bold pl-10"> Shop History</h2>

            <div className="flex flex-row flex-wrap items-center justify-center gap-24">
              <div className="flex flex-col">

                <div className="flex items-center bg-stone-300 pl-8 py-2">

                  <div style={{width: "240px"}} class="text-center">
                    Items:
                  </div>

                  <div style={{width: "120px"}} class="text-center">
                    Total Items:
                  </div>

                  <div style={{width: "120px"}} class="text-center">
                    Total:
                  </div>

                  <div style={{width: "120px"}} class="text-center">
                    Date:
                  </div>

                  <div style={{width: "120px"}} class="text-center">
                    Detail:
                  </div>

                </div>

                <div class="max-h-60 overflow-y-auto">
                  {shopHistory.map((item) => (
                    <PurchaseItem purchase={item} />
                  ))}
                </div>

              </div>
            </div>
        </div>
        )}
      </>
    );
  };
  

export default ShopHistory