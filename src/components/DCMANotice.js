import React from 'react';

const DmcaNotice = () => {
  return (
    <div>
        <div className="relative w-full h-56 lg:h-60 bg-black opacity-80">
            <img
                src={require('../images/carousel/purple.jpg')}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt="Background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-md lg:text-2xl font-bold">DCMA Notice and Takedown Procedure</h1>
            </div>
        </div>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg text-sm mb-10 mt-5">
      <p className="mb-4">
        Rupleart respects the intellectual property rights of others and expects all users of the platform (both buyers and artists) to do the same. In compliance with the Digital Millennium Copyright Act (DMCA), we have implemented the following notice and takedown procedure for reporting alleged copyright infringement.
      </p>
      <p className="mb-4">
        By using Rupleart, you acknowledge and agree that Rupleart is a platform that connects buyers and artists and that Rupleart itself does not create, host, or distribute any of the artwork listed. As a result, Rupleart is not responsible for any copyright infringements committed by users of the Website. However, we take intellectual property violations seriously and will respond to valid claims under the DMCA.
      </p>

      <h2 className="text-md font-semibold mb-4">1. Filing a DMCA Notice of Alleged Infringement</h2>
      <p className="mb-4">
        If you believe that your copyrighted material has been infringed upon on Rupleart, please submit a DMCA Takedown Notice with the following information:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Your full name, address, phone number, and email address.</li>
        <li>A description of the copyrighted work that you claim has been infringed, including any registration details if available.</li>
        <li>The URL(s) or specific page(s) on Rupleart where the allegedly infringing material is located.</li>
        <li>A statement confirming that you have a good-faith belief that the use of the material in question is not authorized by the copyright owner, its agent, or the law.</li>
        <li>A statement confirming that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or are authorized to act on behalf of the copyright owner.</li>
        <li>Your electronic or physical signature.</li>
      </ul>
      <p className="mb-4">
        Please send your DMCA Takedown Notice to:
      </p>
      <p className="mb-4">
        <strong>Email:</strong> Rupleart@gmail.com <br />
        <strong>WhatsApp:</strong> 0736012377
      </p>
      <p className="mb-6">
        Once we receive a valid notice, Rupleart will act expeditiously to remove or disable access to the material in question.
      </p>

      <h2 className="text-md font-semibold mb-4">2. Counter-Notification Procedure</h2>
      <p className="mb-4">
        If you believe that your content was wrongfully removed as a result of a DMCA notice, you may file a Counter-Notification. Your Counter-Notification must include:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Your full name, address, phone number, and email address.</li>
        <li>Identification of the material that was removed or disabled, and the URL or location where it appeared before removal.</li>
        <li>A statement that you believe, in good faith, that the material was removed or disabled as a result of mistake or misidentification.</li>
        <li>A statement that you consent to the jurisdiction of the Kenyan courts and that you will accept service of process from the person who filed the original DMCA notice, or their agent.</li>
        <li>Your electronic or physical signature.</li>
      </ul>
      <p className="mb-4">
        Please send your Counter-Notification to:
      </p>
      <p className="mb-4">
        <strong>Email:</strong> Rupleart@gmail.com <br />
        <strong>WhatsApp:</strong> 0736012377
      </p>
      <p className="mb-6">
        If a valid Counter-Notification is received, Rupleart may restore the removed content, unless the original complainant files legal action within 14 business days.
      </p>

      <h2 className="text-md font-semibold mb-4">3. Limitation of Liability</h2>
      <p className="mb-4">
        Rupleart is an intermediary platform that allows artists to upload and sell their artwork. As such, we do not monitor all content posted by users. Rupleart is not liable for any infringing content posted by users, as long as we comply with valid takedown requests under the DMCA.
      </p>
      <p className="mb-6">
        By using Rupleart, you acknowledge that Rupleart cannot be held liable for any claims of copyright infringement made by third parties. Our role is to facilitate communication and transactions between artists and buyers, and we rely on users to respect intellectual property rights. If you post or upload any content, you represent that you have the necessary rights to do so.
      </p>

      <h2 className="text-md font-semibold mb-4">4. Repeat Infringers</h2>
      <p className="mb-6">
        Rupleart has a policy of terminating, in appropriate circumstances and at our discretion, the accounts of users who are found to be repeat infringers. If you believe that a user is repeatedly infringing your copyrights, please notify us at Rupleart@gmail.com with sufficient information to identify the user and the infringing activity.
      </p>

      <h2 className="text-md font-semibold mb-4">5. No Legal Advice</h2>
      <p className="mb-6">
        Nothing in this DMCA Notice and Takedown Procedure constitutes legal advice. If you believe your rights are being infringed or if you are facing a copyright claim, we advise you to seek legal counsel for further guidance.
      </p>

      <h2 className="text-md font-semibold mb-4">Contact Us</h2>
      <p>
        If you have any questions regarding this policy or need to file a DMCA notice, please contact us:
      </p>
      <p className="mb-4">
        <strong>Email:</strong> Rupleart@gmail.com <br />
        <strong>Phone:</strong> 0759324250
      </p>
    </div>
    </div>
  );
};

export default DmcaNotice;
