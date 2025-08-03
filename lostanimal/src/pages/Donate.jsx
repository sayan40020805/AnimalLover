import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // ✅ correct

import jsPDF from "jspdf";
import "../styles/Donate.css";

const Donate = () => {
    const [amount, setAmount] = useState("");
    const [showQR, setShowQR] = useState(false);
    const [donated, setDonated] = useState(false);

    const handleDonate = (e) => {
        e.preventDefault();

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            alert("Enter a valid donation amount");
            return;
        }

        setShowQR(true);
        setDonated(true);
    };

    const handleDownloadCertificate = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Certificate of Donation", 60, 30);
        doc.setFontSize(14);
        doc.text(`Thank you for your generous donation of ₹${amount}`, 30, 60);
        doc.text("Your support helps us rescue and care for animals in need.", 30, 75);
        doc.text("– AnimalLover Team", 30, 100);
        doc.save("Donation_Certificate.pdf");
    };

    return (
        <div className="donate-page-container">
            <h2>Support Our Mission</h2>
            <p>Make a small donation to help rescue and care for animals.</p>

            <form onSubmit={handleDonate} className="donation-form">
                <input
                    type="number"
                    placeholder="Enter amount (₹)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit" className="donate-now-btn">Donate Now</button>
            </form>

            {showQR && (
                <div className="qr-container">
                    <h3>Scan the QR Code to Donate ₹{amount}</h3>
                    <QRCode
                        value={`upi://pay?pa=your-upi-id@bank&pn=AnimalLover&am=${amount}&cu=INR`}
                        size={200}
                    />
                    <p className="qr-note">Use any UPI app to scan and pay</p>

                    <button className="download-certificate-btn" onClick={handleDownloadCertificate}>
                        Download Donation Certificate
                    </button>
                </div>
            )}

            {donated && !showQR && (
                <p>Thank you for donating! Please check the QR code to complete your payment.</p>
            )}
        </div>
    );
};

export default Donate;
