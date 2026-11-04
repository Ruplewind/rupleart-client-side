import React from 'react';

const PHONE = /^0\d{9}$/; // matches the server's phoneRegex
export const MAX_NOTE = 250;

export const emptyFlowerDetails = {
    sameDay: true,
    preferredDate: '',
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    note: '',
    acknowledgedAvailability: false,
};

const todayLocal = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function validateFlowerDetails(v) {
    const e = {};
    if (!v.recipientName.trim()) e.recipientName = "Enter the recipient's name";
    if (!PHONE.test(v.recipientPhone.trim())) e.recipientPhone = 'Enter a valid phone number, e.g. 0712345678';
    if (v.recipientAddress.trim().length < 5) e.recipientAddress = 'Enter the full delivery address';
    if (!v.sameDay) {
        if (!v.preferredDate) e.preferredDate = 'Choose a delivery date';
        else if (v.preferredDate < todayLocal()) e.preferredDate = 'Date cannot be in the past';
    }
    if (v.note.length > MAX_NOTE) e.note = `Note must be ${MAX_NOTE} characters or fewer`;
    if (!v.acknowledgedAvailability) e.acknowledgedAvailability = 'Please confirm the recipient will be available';
    return e;
}

// Short notice reused on the product page and in the cart
export const FlowerNotice = ({ className = '' }) => (
    <div className={`border border-pink-300 bg-pink-50 text-pink-900 rounded-lg p-3 text-xs ${className}`}>
        <b>Flower orders:</b> at checkout you'll be asked for same-day delivery, the
        recipient's name, phone and address, and a message for the card. The recipient must be
        available to receive the flowers.
    </div>
);

const Err = ({ msg }) => (msg ? <div className="text-red-900 text-xs mt-1">{msg}</div> : null);

export default function FlowerDeliveryForm({ value, onChange, errors }) {
    const inputCls = 'border-b-2 p-2 w-full bg-white';

    return (
        <div className="mb-8 border border-pink-300 rounded-lg p-4 bg-pink-50/40">
            <div className="font-bold mb-3">Flower Delivery Details</div>

            {/* Notice */}
            <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-lg p-3 text-xs mb-4">
                <b>Please note:</b> the recipient must be available at the delivery address to
                receive the flowers. Make sure they know to expect a delivery and can be reached
                on the phone number you give below.
            </div>

            {/* Same day or chosen date */}
            <div className="mb-4 text-sm">
                <label className="flex items-center gap-2 mb-1 cursor-pointer">
                    <input
                        type="radio"
                        name="deliveryWhen"
                        checked={value.sameDay}
                        onChange={() => onChange({ sameDay: true, preferredDate: '' })}
                    />
                    Same-day delivery
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="deliveryWhen"
                        checked={!value.sameDay}
                        onChange={() => onChange({ sameDay: false })}
                    />
                    Deliver on another day
                </label>
                {!value.sameDay && (
                    <div className="mt-2">
                        <input
                            type="date"
                            min={todayLocal()}
                            value={value.preferredDate}
                            onChange={(e) => onChange({ preferredDate: e.target.value })}
                            className={`${inputCls} lg:w-1/2`}
                        />
                        <Err msg={errors.preferredDate} />
                    </div>
                )}
            </div>

            {/* Recipient */}
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Recipient's name"
                    value={value.recipientName}
                    onChange={(e) => onChange({ recipientName: e.target.value })}
                    className={inputCls}
                />
                <Err msg={errors.recipientName} />
            </div>
            <div className="mb-3">
                <input
                    type="tel"
                    placeholder="Recipient's phone (e.g. 0712345678)"
                    value={value.recipientPhone}
                    onChange={(e) => onChange({ recipientPhone: e.target.value })}
                    className={inputCls}
                />
                <Err msg={errors.recipientPhone} />
            </div>
            <div className="mb-3">
                <textarea
                    rows={2}
                    placeholder="Delivery address (building, street, landmark)"
                    value={value.recipientAddress}
                    onChange={(e) => onChange({ recipientAddress: e.target.value })}
                    className={`${inputCls} border-2 rounded-md`}
                />
                <Err msg={errors.recipientAddress} />
            </div>

            {/* Card note */}
            <div className="mb-4">
                <textarea
                    rows={3}
                    maxLength={MAX_NOTE}
                    placeholder="Message for the card (optional)"
                    value={value.note}
                    onChange={(e) => onChange({ note: e.target.value })}
                    className={`${inputCls} border-2 rounded-md`}
                />
                <div className="flex justify-between">
                    <Err msg={errors.note} />
                    <span className="text-xs text-gray-500 ml-auto">{value.note.length}/{MAX_NOTE}</span>
                </div>
            </div>

            {/* Acknowledgement */}
            <label className="flex items-start gap-2 text-sm cursor-pointer">
                <input
                    type="checkbox"
                    className="mt-1"
                    checked={value.acknowledgedAvailability}
                    onChange={(e) => onChange({ acknowledgedAvailability: e.target.checked })}
                />
                <span>I confirm the recipient will be available to receive this delivery.</span>
            </label>
            <Err msg={errors.acknowledgedAvailability} />
        </div>
    );
}