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

  // Mock data
  const [purchases] = useState<Purchase[]>([
    { id: 1, date: "2024-01-15", base: "Base Alpha", equipment: "M4 Rifles", quantity: 25 },
    { id: 2, date: "2024-01-14", base: "Base Bravo", equipment: "Tactical Vests", quantity: 50 },
    { id: 3, date: "2024-01-12", base: "Base Charlie", equipment: "Night Vision", quantity: 10 },
    { id: 4, date: "2024-01-10", base: "Base Alpha", equipment: "Ammunition", quantity: 1000 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Purchase submitted:", formData);
    // Reset form
    setFormData({
      base: "",
      equipmentType: "",
      quantity: "",
      date: "",
    });
  };

  return (
    <Layout>
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Purchases</h1>
        
        {/* Purchase Form */}
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Purchase</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base
              </label>
              <select
                required
                value={formData.base}
                onChange={(e) => setFormData({ ...formData, base: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Base</option>
                <option value="base-alpha">Base Alpha</option>
                <option value="base-bravo">Base Bravo</option>
                <option value="base-charlie">Base Charlie</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Type
              </label>
              <input
                type="text"
                required
                placeholder="Enter equipment type"
                value={formData.equipmentType}
                onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Purchase
              </button>
            </div>
          </form>
        </div>

        {/* Purchase History Table */}
        <div className="bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Purchase History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {purchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.base}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.equipment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.quantity.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
