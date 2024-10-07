import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Barchart from "../components/Barchart";

const Home = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/inventory/");
        const data = await response.json();
        processData(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventory();
  }, []);

  // Process inventory data to calculate total expenses
  const processData = (data) => {
    const totalExpenses = data.reduce((acc, item) => {
      return item.inventory_type === "expense"
        ? acc + parseFloat(item.amount)
        : acc;
    }, 0);
    
    setTotalExpenses(totalExpenses);
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* Fund Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Total Donated</h2>
        {/* Real-time data display */}
        <div className="text-4xl font-semibold text-green-500 mb-4">
          ${totalExpenses.toFixed(2)} {/* Total expenses from API */}
        </div>
        {/* Bar Chart */}
        <div className="mb-6">
          <Barchart />
        </div>
        <Link
          to="/donation"
          className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg"
        >
          Go to Donation Page
        </Link>
      </section>

      {/* Crisis Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Crises</h2>
        {/* Crisis Information (Placeholder) */}
        <ul className="list-disc list-inside mb-6">
          <li>Flood in City A</li>
          <li>Earthquake in City B</li>
        </ul>
        <Link
          to="/crisis"
          className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg"
        >
          View Crisis Page
        </Link>
      </section>

      {/* Volunteer Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Available Volunteers</h2>
        <ul className="list-disc list-inside mb-6">
          <li>John Doe - Crisis A</li>
          <li>Jane Smith - Crisis B</li>
        </ul>
        <Link
          to="/volunteer"
          className="text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg"
        >
          View Volunteer Page
        </Link>
      </section>
    </div>
  );
};

export default Home;
