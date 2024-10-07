import { useEffect, useState } from "react";
import apiSecure from "../utility/ApiSecure";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(null); // Added state for error handling

  // Fetch volunteers data
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await apiSecure.get('user');
        const data = response.data; // Get data directly from response

        // Filter volunteers to show only those with the role "volunteer"
        const filteredVolunteers = data.filter(
          (volunteer) => volunteer.role === "volunteer"
        );
        setVolunteers(filteredVolunteers);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
        setError("Error fetching volunteers. Please try again."); // Set error message
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Volunteers List</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>} {/* Display error message */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Mobile Number</th>
            <th className="border px-4 py-2">Assigned Task</th>
            <th className="border px-4 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => (
            <tr key={volunteer.id} className="text-center">
              <td className="border px-4 py-2">{volunteer.username}</td>
              <td className="border px-4 py-2">{volunteer.email}</td>
              <td className="border px-4 py-2">{volunteer.age}</td>
              <td className="border px-4 py-2">{volunteer.mobile_number}</td>
              <td className="border px-4 py-2">{volunteer.assigned_task || ""}</td>
              <td className="border px-4 py-2">{volunteer.location || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Volunteers;
