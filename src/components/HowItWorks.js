import React from 'react';

const steps = [
  {
    title: 'Discover',
    body: (
      <>
        Explore Rupleart's collection across <i className="text-purple-800">art, décor, fashion, design and selected lifestyle categories</i>.
      </>
    )
  },
  {
    title: 'Find What You Love',
    body: 'Browse products, view images and descriptions, compare your options and find something that matches your style, space, personality or occasion.'
  },
  {
    title: 'Add to Cart',
    body: 'Choose the products you want and add them to your shopping cart.'
  },
  {
    title: 'Checkout Securely',
    body: 'Provide the required order information and complete your purchase using the payment methods available on Rupleart.'
  },
  {
    title: 'Order Confirmation',
    body: 'Once your order has been successfully placed, you will receive confirmation and Rupleart will begin processing your purchase.'
  },
  {
    title: 'Receive Your Order',
    body: 'Your order will be prepared and delivered or made available for collection according to the available fulfilment options.'
  },
  {
    title: 'Enjoy Your Find',
    body: 'Unbox, experience and enjoy something uniquely Rupleart.'
  },
];

const HowItWorks = () => {
  return (
    <div>
        {/* Hero */}
        <div className="relative w-full h-56 lg:h-60 bg-black opacity-80">
            <img
                src={require('../images/carousel/purple.jpg')}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="Background"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-[#d4b078] text-[11px] tracking-[0.35em] uppercase font-montserrat font-semibold">
                    Shopping Made Simple
                </span>
                <h1 className="text-white font-serif italic text-2xl lg:text-3xl">How Rupleart Works</h1>
            </div>
        </div>

        {/* Intro */}
        <div className="text-center mt-10 mb-4 px-4">
            <p className="font-serif italic text-purple-950 text-lg lg:text-xl">
                Shopping on Rupleart is simple.
            </p>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto px-6 py-10 text-sm font-montserrat">
            <div className="relative">
                <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-200"></div>

                {steps.map((step, index) => (
                    <div key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
                        <div className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-purple-900 text-white flex items-center justify-center font-serif italic text-base">
                            {index + 1}
                        </div>
                        <div className="pt-1.5">
                            <h2 className="font-serif italic text-purple-950 text-base lg:text-lg mb-1.5">
                                {step.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {step.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default HowItWorks;