import React, { useState } from 'react';

const faqs = [
  {
    question: "What is Rupleart?",
    answer: "Rupleart is an online platform that connects artists with buyers. Artists can showcase and sell their artwork, including paintings, drawings, and other visual creations, while art lovers can browse and purchase original pieces from emerging and established artists."
  },
  {
    question: "How do I create an account on Rupleart?",
    answer: "Creating an account is simple! Click on the 'Sign Up' button at the top of the homepage. You can sign up as an artist to sell your work or as a buyer to purchase artwork. Fill in the required information, and you're ready to start exploring or listing artwork."
  },
  {
    question: "Who can sell artwork on Rupleart?",
    answer: "Any artist, whether professional or amateur, can sell their original artwork on Rupleart. You must be at least 18 years old or have reached the legal age in your country. Once you create a seller account, you can list your artwork for sale."
  },
  {
    question: "How do I list my artwork for sale?",
    answer: "To list artwork:\n1. Create an artist account.\n2. Click 'Upload Artwork' from your dashboard.\n3. Add high-quality images, a detailed description and price (in Kenyan Shillings).\n4. Publish your listing and wait for art lovers to discover your work!"
  },
  {
    question: "How do payments work on Rupleart?",
    answer: "All payments on Rupleart are processed in Kenyan Shillings (KES). Buyers can pay securely using debit/credit cards, mobile money platforms like M-Pesa, or other supported payment methods. Once the artwork is purchased, the artist will receive payment after the buyer confirms receipt of the item."
  },
  {
    question: "Can I buy artwork if I'm outside Kenya?",
    answer: "Yes! Rupleart serves customers globally. While all prices are listed in Kenyan Shillings, buyers from outside Kenya can purchase artwork and will see the final conversion to their local currency at checkout. International buyers are responsible for any customs duties or taxes applied by their country."
  },
  {
    question: "How is artwork shipped?",
    answer: "Artists are responsible for shipping their artwork to buyers. When purchasing an artwork, shipping fees are added at checkout. Artists will provide tracking information to the website administrator once the artwork has been shipped and hence the buyer will receive the same information. Delivery times may vary depending on the artist’s location and the buyer’s address."
  },
  {
    question: "What is Rupleart's return policy?",
    answer: "Since the artwork on Rupleart is often unique and custom, all sales are generally considered final. However, if the artwork arrives damaged or is significantly different from its description, buyers can report the issue within 7 days of receipt. Please refer to our Return Policy for more details."
  },
  {
    question: "How do I contact the artist?",
    answer: "Buyers can contact artists through the Rupleart administrators. To reach an artist:\n1. Submit your inquiry by contacting Rupleart’s support team via WhatsApp or email.\n2. The Rupleart administrators will forward your message to the artist on your behalf.\n3. You will receive a response from the artist, relayed through the Rupleart administrators. This process ensures all communication is managed securely through Rupleart, making it easy to inquire about artwork, custom orders, or commissions."
  },
  {
    question: "Does Rupleart take a commission on sales?",
    answer: "Yes, Rupleart takes a small commission on each sale to support the platform and its services. The commission is automatically deducted from the final sale price before the payment is transferred to the artist."
  },
  {
    question: "Can I commission an artist for custom work?",
    answer: "Absolutely! You can commission a custom piece through Rupleart by contacting our administrators. Simply let us know your specific requirements, and we will connect you with an artist who can create a work tailored to your needs. Our team will handle the communication and ensure that the process runs smoothly. Please note that all commissioned artwork is non-refundable."
  },
  {
    question: "How do I report copyright infringement?",
    answer: "If you believe your work has been used on Rupleart without your permission, you can file a DMCA Notice through our DMCA Takedown Procedure. We take copyright infringement seriously and will take prompt action to remove infringing content once verified."
  },
  {
    question: "What happens if I forget my password?",
    answer: "If you've forgotten your password, click on the 'Forgot Password?' link on the login page. You’ll receive an email with instructions to reset your password."
  },
  {
    question: "Can I cancel an order?",
    answer: "If you need to cancel an order, please contact the Rupleart administrators immediately. Once the artwork has been shipped, cancellation may no longer be possible, and you may need to follow the return process outlined in our Return Policy."
  },
  {
    question: "How do I get in touch with Rupleart support?",
    answer: "For any questions, issues, or support requests, you can reach out to the Rupleart team at:\nEmail: Rupleart@gmail.com\nPhone: 0759324250"
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
                <h1 className="text-white text-xl lg:text-2xl font-bold">About Us</h1>
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
              {faq.answer.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default FAQ;
