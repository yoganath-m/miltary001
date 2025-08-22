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
      const response = await fetch("/api/transfers");
      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        fetchTransfers();
        setFormData({
          fromBase: "",
          toBase: "",
          equipmentType: "",
          quantity: "",
          date: "",
        });
      }
    } catch (error) {
      console.error("Error creating transfer:", error);
    }
  };

  const bases = ["Base Alpha", "Base Bravo", "Base Charlie"];

  return (
    <Layout>
      <div>
        <h1>Transfers</h1>
        
        <form onSubmit={handleSubmit}>
          <h2>Add Transfer</h2>
          
          <div>
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

          <div>
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

          <div>
            <label>Equipment Type:</label>
            <input
              type="text"
              value={formData.equipmentType}
              onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
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
            <label>Date:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <button type="submit">Add Transfer</button>
        </form>

        <div>
          <h2>Transfer History</h2>
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
