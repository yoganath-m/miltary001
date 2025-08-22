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
      <div style={{ padding: "20px" }}>
        <h1>Assignments & Expenditures</h1>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc" }}>
          <h2>Add Assignment</h2>
          
          <div style={{ marginBottom: "10px" }}>
            <label>Personnel Name:</label><br />
            <input
              type="text"
              value={formData.personnelName}
              onChange={(e) => setFormData({ ...formData, personnelName: e.target.value })}
              required
              style={{ width: "200px", padding: "5px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Asset:</label><br />
            <input
              type="text"
              value={formData.asset}
              onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
              required
              style={{ width: "200px", padding: "5px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Quantity:</label><br />
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              min="1"
              style={{ width: "200px", padding: "5px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>
              <input
                type="checkbox"
                checked={formData.expended}
                onChange={(e) => setFormData({ ...formData, expended: e.target.checked })}
                style={{ marginRight: "8px" }}
              />
              Expended
            </label>
          </div>

          <button 
            type="submit"
            style={{ padding: "8px 16px", backgroundColor: "#ddd", border: "1px solid #999" }}
          >
            Add Assignment
          </button>
        </form>

        <div>
          <h2>Assignment History</h2>
          <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>Personnel</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Asset</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Quantity</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td style={{ padding: "8px" }}>{assignment.personnelName}</td>
                  <td style={{ padding: "8px" }}>{assignment.asset}</td>
                  <td style={{ padding: "8px" }}>{assignment.quantity}</td>
                  <td style={{ padding: "8px" }}>
                    {assignment.expended ? "Expended" : "Assigned"}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {new Date(assignment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
