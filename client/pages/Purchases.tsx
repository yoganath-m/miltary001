import { useState } from "react";
import Layout from "@/components/Layout";

interface Purchase {
  id: number;
  date: string;
  base: string;
  equipment: string;
  quantity: number;
}

export default function Purchases() {
  const [formData, setFormData] = useState({
    base: "",
    equipmentType: "",
    quantity: "",
    date: "",
  });

  const [purchases] = useState<Purchase[]>([
    { id: 1, date: "2024-01-15", base: "Base Alpha", equipment: "M4 Rifles", quantity: 25 },
    { id: 2, date: "2024-01-14", base: "Base Bravo", equipment: "Tactical Vests", quantity: 50 },
    { id: 3, date: "2024-01-12", base: "Base Charlie", equipment: "Night Vision", quantity: 10 },
    { id: 4, date: "2024-01-10", base: "Base Alpha", equipment: "Ammunition", quantity: 1000 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Purchase submitted:", formData);
    setFormData({
      base: "",
      equipmentType: "",
      quantity: "",
      date: "",
    });
  };

  return (
    <Layout>
      <div>
        <h1 className="page-title">Purchases</h1>
        
        <div className="form-container">
          <h2 className="form-title">Add New Purchase</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Base</label>
              <select
                required
                value={formData.base}
                onChange={(e) => setFormData({ ...formData, base: e.target.value })}
              >
                <option value="">Select Base</option>
                <option value="base-alpha">Base Alpha</option>
                <option value="base-bravo">Base Bravo</option>
                <option value="base-charlie">Base Charlie</option>
              </select>
            </div>
            <div className="form-field">
              <label>Equipment Type</label>
              <input
                type="text"
                required
                placeholder="Enter equipment type"
                value={formData.equipmentType}
                onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Quantity</label>
              <input
                type="number"
                required
                min="1"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="form-field">
              <button type="submit" className="btn btn-primary">Add Purchase</button>
            </div>
          </form>
        </div>

        <div className="table-container">
          <h2 className="table-title">Purchase History</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Base</th>
                <th>Equipment</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.date}</td>
                  <td>{purchase.base}</td>
                  <td>{purchase.equipment}</td>
                  <td>{purchase.quantity.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
