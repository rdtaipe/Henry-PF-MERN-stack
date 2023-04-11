import React from "react";

const Landing = () => {
  return (
    <div>
  <button class="inline-flex mt-10" href>
      <span class="h-12 flex items-center justify-center uppercase font-semibold px-8 border border-black hover:bg-black hover:text-white transition duration-500 ease-in-out">
        shop all
      </span>
      <span class="h-12 w-12 flex-shrink-0 flex items-center justify-center border border-l-0 border-black hover:bg-black hover:text-white transition duration-500 ease-in-out ">
        <svg
          class="h-3 w-3"
          aria-hidden="true"
          focusable="false"
          data-icon="chevron-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
          className="svg-inline--fa fa-chevron-right fa-w-8 fa-9x"
        >
          <path
            fill="currentColor"
            d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z heigt"
          />
        </svg>
      </span>
    </button>
    </div>
  
  );
};

export default Landing;
