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
      <div style={{ padding: "20px" }}>
        <h1>Transfers</h1>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc" }}>
          <h2>Add Transfer</h2>
          
          <div style={{ marginBottom: "10px" }}>
            <label>From Base:</label><br />
            <select
              value={formData.fromBase}
              onChange={(e) => setFormData({ ...formData, fromBase: e.target.value })}
              required
              style={{ width: "200px", padding: "5px", marginTop: "5px" }}
            >
              <option value="">Select Base</option>
              {bases.map(base => (
                <option key={base} value={base}>{base}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>To Base:</label><br />
            <select
              value={formData.toBase}
              onChange={(e) => setFormData({ ...formData, toBase: e.target.value })}
              required
              style={{ width: "200px", padding: "5px", marginTop: "5px" }}
            >
              <option value="">Select Base</option>
              {bases.map(base => (
                <option key={base} value={base}>{base}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Equipment Type:</label><br />
            <input
              type="text"
              value={formData.equipmentType}
              onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
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
            <label>Date:</label><br />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              style={{ width: "200px", padding: "5px", marginTop: "5px" }}
            />
          </div>

          <button 
            type="submit"
            style={{ padding: "8px 16px", backgroundColor: "#ddd", border: "1px solid #999" }}
          >
            Add Transfer
          </button>
        </form>

        <div>
          <h2>Transfer History</h2>
          <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
                <th style={{ padding: "8px", textAlign: "left" }}>From Base</th>
                <th style={{ padding: "8px", textAlign: "left" }}>To Base</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Equipment</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Quantity</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id}>
                  <td style={{ padding: "8px" }}>{transfer.date}</td>
                  <td style={{ padding: "8px" }}>{transfer.fromBase}</td>
                  <td style={{ padding: "8px" }}>{transfer.toBase}</td>
                  <td style={{ padding: "8px" }}>{transfer.equipment}</td>
                  <td style={{ padding: "8px" }}>{transfer.quantity}</td>
                  <td style={{ padding: "8px" }}>
                    {new Date(transfer.createdAt).toLocaleString()}
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
