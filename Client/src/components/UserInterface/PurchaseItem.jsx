import { useState, useEffect } from "react";
import PurchaseModal from "./PurchaseModal";

const PurchaseItem = ({ purchase }) => {

  const [string, setString] = useState("")

  useEffect(() => {
    const itemNames = purchase.items.map(item => item.name + ` x ${item.amount}`)
    const string = itemNames.join(", ") 
    setString(string)
  }, [])

  const [scrollPosition, setScrollPosition] = useState(0);
  const [modalStatus, setModalStatus] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(scrollPosition => {
        const newPosition = scrollPosition - 1;
        const contentWidth = string.length * 7; //Cada letra mide 7 pixeles
        if (newPosition < -contentWidth) {
          return 220;
        }
        return newPosition;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [string]);

  const handleShowDetailPurchase = (() => {
    setModalStatus(true)
  })

  const handleCloseDetailPurchase = (() => {
    setModalStatus(false)
  })
  

  return (
    <>
      <div style={{ zIndex: 3, position: "relative" }}>
        {modalStatus && <PurchaseModal purchase={purchase} onClose={handleCloseDetailPurchase}/>}
      </div>

      <div style={{ zIndex: 1, position: "relative", borderRadius: "10px", width: "780px" }} className="bg-stone-100 flex flex-row mt-1 py-4 pl-10 pr-5 transition">

        <div style={{ width: "230px"}}>
          <div style={{ width: "220px", height: "20px", overflow: "hidden", whiteSpace: "nowrap" }}>
            <div style={{ display: "inline-block", transform: `translateX(${scrollPosition}px)` }}>
              {string}
            </div>
          </div>
        </div>
        
        <div style={{ width: "120px" }} className="text-center">
          {purchase.totalItems}
        </div>

        <div style={{ width: "120px" }} className="text-center">
          {purchase.total}
        </div>

        <div style={{ width: "120px" }} className="text-center">
          {purchase.date}
        </div>

        <div style={{ width: "120px" }} className="text-center">
          <button className="text-stone-500" onClick={handleShowDetailPurchase}>
            Detail
          </button>
        </div>
        
      </div>

    </>
  )
}

export default PurchaseItem