import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Barchart = () => {
  const [labels, setLabels] = useState([]);
  const [donations, setDonations] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Fetch inventory data from the API
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/inventory/');
        const inventory = await response.json();
        processInventoryData(inventory);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    const processInventoryData = (inventory) => {
      const labels = [];
      const relief = [];
      const expenses = [];

      inventory.forEach(item => {
        const date = new Date(item.date_added).toLocaleDateString();
        if (!labels.includes(date)) {
          labels.push(date);
          relief.push(0);
          expenses.push(0);
        }

        const index = labels.indexOf(date);

        if (item.inventory_type === 'relief') {
          relief[index] += parseFloat(item.amount);
        } else if (item.inventory_type === 'expense') {
          expenses[index] += parseFloat(item.amount);
        }
      });

      setLabels(labels);
      setDonations(relief);
      setExpenses(expenses);
    };

    fetchInventoryData();
  }, []);

  const data = {
    labels, // Use state values
    datasets: [
      {
        label: 'Relief ($)',
        data: donations,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Expenses ($)',
        data: expenses,
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Donations and Expenses',
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Barchart;
