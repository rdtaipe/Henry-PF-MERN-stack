import React, { useEffect, useState } from 'react';
import { ImSpinner } from 'react-icons/im';

export default function Loader() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return showMessage ? (
    <div>No items found</div>
  ) : (
    <div className="flex justify-center items-center">
      <ImSpinner size={70} className='animate-spin'/>
    </div>
  );
}
