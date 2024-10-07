import { useEffect, useState } from "react";

const CrisisPage = () => {
  const [crises, setCrises] = useState([]);
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("medium"); // Default value
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch crises with filters for severity and status
  const fetchCrises = async () => {
    try {
      const severityParam = filterSeverity === "all" ? "" : `&severity=${filterSeverity}`;
      const statusParam = filterStatus === "all" ? "" : `&status=${filterStatus}`;

      const response = await fetch(
        `http://127.0.0.1:8000/api/crises/?${statusParam}${severityParam}`
      );
      const data = await response.json();
      setCrises(data); // Adjust according to the response structure
    } catch (error) {
      console.error("Error fetching crises:", error);
    }
  };

  useEffect(() => {
    fetchCrises();
  }, [filterSeverity, filterStatus]); // Fetch on filter change

  // Handle form submission for creating a new crisis
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCrisis = new FormData();
    newCrisis.append("title", title);
    newCrisis.append("description", description);
    newCrisis.append("location", location);
    newCrisis.append("image", image);
    newCrisis.append("severity", severity);
    newCrisis.append("required_help", "anythin"); // Default help requirement

    try {
      const response = await fetch("http://127.0.0.1:8000/api/crises/", {
        method: "POST",
        body: newCrisis,
      });

      if (response.ok) {
        alert("Crisis successfully created!");
        // Reset form fields
        setTitle("");
        setSeverity("medium"); // Reset to default
        setDescription("");
        setLocation("");
        setImage(null); // Reset image
        // Refetch crises to include the new one
        fetchCrises();
      } else {
        alert("Failed to create crisis.");
      }
    } catch (error) {
      console.error("Error creating crisis:", error);
      alert("Error creating crisis.");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Filter Crises</h2>
        <div className="flex gap-4 mb-4">
          {/* Filter by severity */}
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="all">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Filter by status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button
          onClick={fetchCrises}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Crisis List</h2>
        <ul>
          {crises.map((crisis) => (
            <li key={crisis.id} className="mb-4 p-4 border rounded">
              <h3 className="font-bold">{crisis.title}</h3>
              <p>Severity: {crisis.severity}</p>
              <p>Status: {crisis.status}</p>
              <p>{crisis.description}</p>
              <p>Location: {crisis.location}</p>
              {crisis.image && <img src={crisis.image} alt={crisis.title} className="mt-2" />}
            </li>
          ))}
        </ul>
      </section>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Create a Crisis</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded-lg w-full"
              placeholder="Enter crisis title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="border p-2 rounded-lg w-full"
              required
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 rounded-lg w-full"
              placeholder="Enter crisis location"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded-lg w-full"
              placeholder="Describe the crisis"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-2 rounded-lg w-full"
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Create Crisis
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrisisPage;
