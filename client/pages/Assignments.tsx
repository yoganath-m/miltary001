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
      const response = await fetch("/api/assignments");
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        fetchAssignments();
        setFormData({
          personnelName: "",
          asset: "",
          quantity: "",
          expended: false,
        });
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Assignments & Expenditures</h1>
        
        <form onSubmit={handleSubmit}>
          <h2>Add Assignment</h2>
          
          <div>
            <label>Personnel Name:</label>
            <input
              type="text"
              value={formData.personnelName}
              onChange={(e) => setFormData({ ...formData, personnelName: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Asset:</label>
            <input
              type="text"
              value={formData.asset}
              onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Quantity:</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              min="1"
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={formData.expended}
                onChange={(e) => setFormData({ ...formData, expended: e.target.checked })}
              />
              Expended
            </label>
          </div>

          <button type="submit">Add Assignment</button>
        </form>

        <div>
          <h2>Assignment History</h2>
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
