import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface Assignment {
  id: number;
  personnelName: string;
  asset: string;
  quantity: number;
  expended: boolean;
  userId: number;
  createdAt: string;
}

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [formData, setFormData] = useState({
    personnelName: "",
    asset: "",
    quantity: "",
    expended: false,
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      console.log("Attempting to fetch assignments from /api/assignments");
      const response = await fetch("/api/assignments");
      console.log("Response received:", response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Assignments data received:", data);
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      // Fallback to empty array on error
      setAssignments([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting assignment:", formData);
      const response = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Submit response:", response.status, response.statusText);

      if (response.ok) {
        console.log("Assignment created successfully");
        fetchAssignments();
        setFormData({
          personnelName: "",
          asset: "",
          quantity: "",
          expended: false,
        });
      } else {
        console.error(
          "Failed to create assignment:",
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="page-title">Assignments & Expenditures</h1>

        <div className="form-container">
          <h2 className="form-title">Add Assignment</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Personnel Name:</label>
              <input
                type="text"
                value={formData.personnelName}
                onChange={(e) =>
                  setFormData({ ...formData, personnelName: e.target.value })
                }
                required
              />
            </div>

            <div className="form-field">
              <label>Asset:</label>
              <input
                type="text"
                value={formData.asset}
                onChange={(e) =>
                  setFormData({ ...formData, asset: e.target.value })
                }
                required
              />
            </div>

            <div className="form-field">
              <label>Quantity:</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
                min="1"
              />
            </div>

            <div className="form-field">
              <label>
                <input
                  type="checkbox"
                  checked={formData.expended}
                  onChange={(e) =>
                    setFormData({ ...formData, expended: e.target.checked })
                  }
                />
                Expended
              </label>
            </div>

            <div className="form-field">
              <button type="submit" className="btn btn-primary">
                Add Assignment
              </button>
            </div>
          </form>
        </div>

        <div className="table-container">
          <h2 className="table-title">Assignment History</h2>
          <table>
            <thead>
              <tr>
                <th>Personnel</th>
                <th>Asset</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.personnelName}</td>
                  <td>{assignment.asset}</td>
                  <td>{assignment.quantity}</td>
                  <td>{assignment.expended ? "Expended" : "Assigned"}</td>
                  <td>{new Date(assignment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
