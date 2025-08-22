import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface Transfer {
  id: number;
  fromBase: string;
  toBase: string;
  equipment: string;
  quantity: number;
  date: string;
  userId: number;
  createdAt: string;
}

export default function Transfers() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [formData, setFormData] = useState({
    fromBase: "",
    toBase: "",
    equipmentType: "",
    quantity: "",
    date: "",
  });

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      console.log("Attempting to fetch transfers from /api/transfers");
      const response = await fetch("/api/transfers");
      console.log("Response received:", response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Transfers data received:", data);
      setTransfers(data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
      // Fallback to empty array on error
      setTransfers([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting transfer:", formData);
      const response = await fetch("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Submit response:", response.status, response.statusText);

      if (response.ok) {
        console.log("Transfer created successfully");
        fetchTransfers();
        setFormData({
          fromBase: "",
          toBase: "",
          equipmentType: "",
          quantity: "",
          date: "",
        });
      } else {
        console.error("Failed to create transfer:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error creating transfer:", error);
    }
  };

  const bases = ["Base Alpha", "Base Bravo", "Base Charlie"];

  return (
    <Layout>
      <div>
        <h1 className="page-title">Transfers</h1>
        
        <div className="form-container">
          <h2 className="form-title">Add Transfer</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>From Base:</label>
              <select
                value={formData.fromBase}
                onChange={(e) => setFormData({ ...formData, fromBase: e.target.value })}
                required
              >
                <option value="">Select Base</option>
                {bases.map(base => (
                  <option key={base} value={base}>{base}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>To Base:</label>
              <select
                value={formData.toBase}
                onChange={(e) => setFormData({ ...formData, toBase: e.target.value })}
                required
              >
                <option value="">Select Base</option>
                {bases.map(base => (
                  <option key={base} value={base}>{base}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Equipment Type:</label>
              <input
                type="text"
                value={formData.equipmentType}
                onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <label>Quantity:</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                min="1"
              />
            </div>

            <div className="form-field">
              <label>Date:</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <button type="submit" className="btn btn-primary">Add Transfer</button>
            </div>
          </form>
        </div>

        <div className="table-container">
          <h2 className="table-title">Transfer History</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>From Base</th>
                <th>To Base</th>
                <th>Equipment</th>
                <th>Quantity</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id}>
                  <td>{transfer.date}</td>
                  <td>{transfer.fromBase}</td>
                  <td>{transfer.toBase}</td>
                  <td>{transfer.equipment}</td>
                  <td>{transfer.quantity}</td>
                  <td>{new Date(transfer.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
