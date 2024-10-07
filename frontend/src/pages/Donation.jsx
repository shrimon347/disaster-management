import { useEffect, useState } from "react";
import Barchart from "../components/Barchart";

const DonationPage = () => {
  const [totalFunds, setTotalFunds] = useState(0);
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  // Fetch total funds
  const fetchTotalFunds = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/total-funds/");
      const data = await response.json();
      setTotalFunds(data.total_funds);
    } catch (error) {
      console.error("Error fetching total funds:", error);
    }
  };

  useEffect(() => {
    fetchTotalFunds();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const donation = {
      donor_name: donorName,
      amount: amount,
      message: message,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/donations/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donation),
        }
      );

      if (response.ok) {
        alert("Donation successfully made!");

        // Reset form fields
        setDonorName("");
        setAmount("");
        setMessage("");

        // Refetch total funds to update the displayed value
        fetchTotalFunds();
      } else {
        alert("Failed to make donation.");
      }
    } catch (error) {
      console.error("Error making donation:", error);
      alert("Error making donation.");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">All Time Donations</h2>
        <div className="text-4xl font-semibold text-green-500 mb-4">
          ${totalFunds}
        </div>
        <Barchart />
      </section>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Make a Donation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Donor Name</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="border p-2 rounded-lg w-full"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 rounded-lg w-full"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 rounded-lg w-full"
              placeholder="Leave a message"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;




import React from 'react'


