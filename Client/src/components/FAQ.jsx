import React from 'react';

const Questionsdata = [
  {
    question: 'How can I make a purchase at ChicCloset?',
    answer: '1.You must register in our web page.Select the product you wish to purchase and add it to your shopping cart, inside the cart you can select how many products you wish to purchase.Click on the go to payment button and then press the option to pay with Mercado Pago. '
  },
  {
    question: 'Can I shop at any time?',
    answer: 'Yes, you can make purchases at any time of the day, always verify that the product you wish to purchase is in stock.'
  },
  {
    question: 'What payment methods  accept?',
    answer: 'At the moment our website accepts payments by credit card, Mercado Credit and the money available in your Mercado Pago account.'
  }
];

const Faq = () => {
  return (
  <div className='sticky top-0 bg-white p-4 shadow'>
      <div className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Frequently asked questions.</h1>
        <div className="grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {Questionsdata.map((item, index) => {
            return (
              <div key={index}>
                <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-700 dark:text-white">{item.question}</h1>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Faq;