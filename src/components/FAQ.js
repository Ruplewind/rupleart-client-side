import React, { useState } from 'react';

const faqs = [
  {
    question: "What is Rupleart?",
    answer: (
      <>
        <p>
          Rupleart is a <i>creative, design and lifestyle shopping platform</i> where customers can discover and purchase unique products across selected categories including{' '}
          <i>art, home décor, fashion &amp; design, creative pieces and lifestyle products</i>.
        </p>
        <p className="mt-2">
          Rupleart also features events, promotions and experiences that our community can discover through the platform.
        </p>
      </>
    )
  },
  {
    question: "What can I find on Rupleart?",
    answer: (
      <>
        <p>
          Rupleart features a growing collection across <i>art, décor, fashion, design, creative and selected lifestyle categories</i>.
        </p>
        <p className="mt-2">
          Our collection continues to evolve as we introduce products and experiences that fit the Rupleart identity.
        </p>
      </>
    )
  },
  {
    question: "Are the products on Rupleart only artworks?",
    answer: (
      <>
        <p>
          No. While art remains an important part of our identity, <i>Rupleart has evolved beyond the canvas</i>.
        </p>
        <p className="mt-2">
          Today, you can discover art alongside <i>home décor, fashion &amp; design, creative pieces and selected lifestyle products</i>.
        </p>
      </>
    )
  },
  {
    question: "How do I create an account?",
    answer: (
      <>
        <p>
          Creating an account is simple. Click the <i>"Sign Up"</i> button and provide the required information to create your Rupleart account.
        </p>
        <p className="mt-2">
          Your account makes it easier to shop, manage your orders and enjoy a more personalized Rupleart experience.
        </p>
      </>
    )
  },
  {
    question: "How do I place an order?",
    answer: (
      <>
        <p>
          Browse Rupleart, select the product you want, add it to your cart and proceed to checkout.
        </p>
        <p className="mt-2">
          Provide the required information and complete your payment using one of the available payment methods.
        </p>
      </>
    )
  },
  {
    question: "What currency does Rupleart use?",
    answer: (
      <p>
        Prices on Rupleart are primarily displayed in <i>Kenyan Shillings (KES)</i> unless otherwise indicated.
      </p>
    )
  },
  {
    question: "What payment methods does Rupleart accept?",
    answer: (
      <p>
        Rupleart supports selected secure payment methods available during checkout, including applicable mobile money and other approved payment options.
      </p>
    )
  },
  {
    question: "How do I receive my order?",
    answer: (
      <p>
        Available delivery or collection options will be communicated during the ordering process or after your order has been confirmed.
      </p>
    )
  },
  {
    question: "Can I return a product?",
    answer: (
      <>
        <p>
          Returns, exchanges and refunds are handled according to <i>Rupleart's Return and Refund Policy</i>.
        </p>
        <p className="mt-2">
          If you experience an issue with your order, contact Rupleart directly through our official customer support channels.
        </p>
      </>
    )
  },
  {
    question: "Does Rupleart advertise events?",
    answer: (
      <>
        <p>Yes.</p>
        <p className="mt-2">
          Rupleart has an <i>Events &amp; Promotions section</i> where approved events, promotions, exhibitions and experiences can be featured.
        </p>
      </>
    )
  },
  {
    question: "Can I advertise my event or promotion on Rupleart?",
    answer: (
      <>
        <p>
          Yes. <i>Individuals, businesses, brands, organizations and event organizers can request to advertise events or promotions on Rupleart</i>.
        </p>
        <p className="mt-2">
          Contact the <i>Rupleart Administration through the official administration email</i> and provide details of what you would like advertised.
        </p>
        <p className="mt-2">
          All advertising requests are reviewed and approved by Rupleart before publication.
        </p>
      </>
    )
  },
  {
    question: "What can I advertise?",
    answer: (
      <>
        <p>
          Subject to Rupleart's approval, advertising may include <i>events, exhibitions, festivals, shows, launches, promotions, special offers and other appropriate promotional content</i>.
        </p>
        <p className="mt-2">
          Rupleart reserves the right to approve, reject or remove advertising that does not meet our platform standards.
        </p>
      </>
    )
  },
  {
    question: "How can I contact Rupleart?",
    answer: (
      <p>
        For questions regarding products, orders, payments, deliveries, accounts, events or advertising, contact the Rupleart team through the official contact details provided on the platform.
      </p>
    )
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
        <div className="relative w-full h-56 lg:h-60 bg-black opacity-80">
            <img
                src={require('../images/carousel/purple.jpg')}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="Background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-xl lg:text-2xl font-bold">Frequently Asked Questions</h1>
            </div>
        </div>

    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-lg text-sm mb-10 mt-5">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b last:border-b-0">
          <div
            className="flex justify-between items-center cursor-pointer py-4"
            onClick={() => toggleAnswer(index)}
          >
            <h2 className="text-md font-semibold text-gray-800">{faq.question}</h2>
            <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
          {openIndex === index && (
            <div className="pl-4 pb-4 text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default FAQ;