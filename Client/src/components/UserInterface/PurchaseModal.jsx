
const PurchaseModal = ({ purchase, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center">
        <div className="bg-white rounded-lg px-10 py-8 max-w-2xl flex flex-row">
            <div className="w-1/2 flex-grow mr-10">
                <h3 className="text-2xl font-bold mb-6">Items bought</h3>
                <div className="max-h-80 overflow-y-auto">
                    <ul className="divide-y divide-stone-300">
                        {purchase.items.map((item) => (
                        <li className="py-4" key={item.id}>
                            <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="w-20 h-20 mr-6" />
                            <div>
                                <p className="font-bold">{item.name}</p>
                                <p className="text-base">{item.amount} units</p>
                                <p className="text-base">{item.total}</p>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-1/2">
                <h2 className="text-2xl font-bold mb-6">Purchase Detail</h2>
                <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-stone-500">Date:</span>
                    <span>{purchase.date}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-stone-500">Total items:</span>
                    <span>{purchase.totalItems}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-stone-500">Total:</span>
                    <span>{purchase.total}</span>
                </div>
                <hr className="my-6" />
            <button
                className="mt-36 ml-40 bg-stone-500 hover:bg-stone-700 text-white py-3 px-6 rounded transition"
                onClick={onClose}
            >
                Close
            </button>
            </div>
        </div>
        </div>



    );
  };
  
  export default PurchaseModal;
  