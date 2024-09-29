import React from 'react'

function ReturnPolicy() {
  return (
    <div>
        <div className="relative w-full h-56 lg:h-60 bg-black opacity-80">
            <img
                src={require('../images/carousel/purple.jpg')}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="Background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-md lg:text-2xl font-bold">Return Policy</h1>
            </div>
        </div>
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-lg mb-10 mt-5 text-sm">
      <p className="mb-4">
        At Rupleart, we aim to provide a seamless experience for both buyers and artists. Since the artwork sold 
        on our platform is often one-of-a-kind, we encourage careful consideration before making a purchase. 
        However, we understand that issues may arise, and we have set forth the following guidelines for 
        returns and refunds.
      </p>

      <h2 className="text-md font-semibold mt-6 mb-2">1. General Return Policy</h2>
      <p className="mb-2 text-sm">
        <strong>1.1 Final Sale:</strong> All artwork purchases are generally considered final sale unless otherwise specified by 
        the artist. We encourage buyers to read the artist’s return policy on each artwork listing before 
        completing a purchase.
      </p>
      <p className="mb-2 text-sm">
        <strong>1.2 Return Eligibility:</strong> Buyers may be eligible for a return or exchange under the following 
        circumstances:
      </p>
      <ul className="list-disc pl-6 mb-2">
        <li>The artwork arrives damaged.</li>
        <li>The artwork received significantly differs from the description or images provided.</li>
        <li>The artist has explicitly offered a return policy for that specific artwork.</li>
      </ul>
      <p className="mb-2 text-sm">
        <strong>1.3 Non-Returnable Items:</strong> Customized or commissioned artwork, digital downloads, or any 
        personalized items are not eligible for returns unless they arrive damaged or faulty.
      </p>

      <h2 className="text-md font-semibold mt-6 mb-2">2. Reporting a Problem</h2>
      <p className="mb-2 text-sm">
        <strong>2.1 Damaged Artwork:</strong> If your artwork arrives damaged, you must report the issue to both the artist and 
        Rupleart within 7 days of delivery. Please provide photos of the damaged item and packaging to 
        expedite the process.
      </p>
      <p className="mb-2 text-sm">
        <strong>2.2 Significant Discrepancy:</strong> If the artwork received differs significantly from the description or images 
        provided on the Website, contact the artist directly within 7 days of receipt to discuss a return or 
        exchange.
      </p>

      <h2 className="text-md font-semibold mt-6 mb-2">3. Return Process</h2>
      <p className="mb-2 text-sm">
        <strong>3.1 Contact:</strong> Buyers should first communicate with Rupleart and then to the artist regarding any return or 
        refund request. The artist may request that the buyer return the artwork at the buyer’s expense unless 
        otherwise agreed upon. Rupleart will share the artist’s contact when this process is initiated.
      </p>
      <p className="mb-2 text-sm">
        <strong>3.2 Return Shipment:</strong> If a return is approved, the buyer is responsible for securely packaging the artwork 
        for return. Any return shipment costs will be borne by the buyer unless the artist agrees otherwise or 
        the item was misrepresented.
      </p>
      <p className="mb-2 text-sm">
        <strong>3.3 Refunds:</strong> Once the artist confirms receipt of the returned artwork in its original condition, the buyer 
        will be refunded the purchase price, excluding any shipping fees, via the original payment method. 
        Please allow up to 14 business days for the refund to process.
      </p>

      <h2 className="text-md font-semibold mt-6 mb-2">4. Exceptions</h2>
      <p className="mb-2 text-sm">
        <strong>4.1 Commissioned Artworks:</strong> Customized or commissioned pieces are non-refundable unless they arrive 
        damaged.
      </p>
      <p className="mb-2 text-sm">
        <strong>4.2 Digital Art:</strong> Digital artworks and downloadable content are not eligible for returns or refunds.
      </p>

      <h2 className="text-md font-semibold mt-6 mb-2">5. Dispute Resolution</h2>
      <p className="mb-2 text-sm">
        If you are unable to resolve a return or refund issue directly with the artist, you may contact Rupleart 
        Customer Support at <a href="mailto:rupleart@gmail.com" className="text-blue-600 hover:underline">rupleart@gmail.com</a> or call 
        0759324250. We will mediate between both parties to reach a fair resolution.
      </p>
    </div>
    </div>
  )
}

export default ReturnPolicy