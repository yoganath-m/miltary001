import { useState } from "react";
import Layout from "@/components/Layout";

interface MetricCardProps {
  title: string;
  value: string | number;
  onClick?: () => void;
  clickable?: boolean;
}

function MetricCard({ title, value, onClick, clickable = false }: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-lg shadow border",
        clickable && "cursor-pointer hover:shadow-md transition-shadow"
      )}
      onClick={onClick}
    >
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
    </div>
  );
}

function NetMovementModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Net Movement Breakdown</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Purchases:</span>
            <span className="font-medium">+125</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transfer In:</span>
            <span className="font-medium">+45</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transfer Out:</span>
            <span className="font-medium">-30</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Net Movement:</span>
            <span>+140</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [showNetMovementModal, setShowNetMovementModal] = useState(false);
  const [filters, setFilters] = useState({
    date: "",
    base: "",
    equipmentType: "",
  });

  // Mock data
  const metrics = {
    openingBalance: 1250,
    closingBalance: 1390,
    netMovement: 140,
    assigned: 890,
    expended: 45,
  };

  return (
    <Layout>
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow border mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Base</label>
              <select
                value={filters.base}
                onChange={(e) => setFilters({ ...filters, base: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All Bases</option>
                <option value="base-alpha">Base Alpha</option>
                <option value="base-bravo">Base Bravo</option>
                <option value="base-charlie">Base Charlie</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Equipment Type</label>
              <input
                type="text"
                placeholder="Enter equipment type"
                value={filters.equipmentType}
                onChange={(e) => setFilters({ ...filters, equipmentType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <MetricCard
            title="Opening Balance"
            value={metrics.openingBalance.toLocaleString()}
          />
          <MetricCard
            title="Closing Balance"
            value={metrics.closingBalance.toLocaleString()}
          />
          <MetricCard
            title="Net Movement"
            value={`+${metrics.netMovement.toLocaleString()}`}
            onClick={() => setShowNetMovementModal(true)}
            clickable={true}
          />
          <MetricCard
            title="Assigned"
            value={metrics.assigned.toLocaleString()}
          />
          <MetricCard
            title="Expended"
            value={metrics.expended.toLocaleString()}
          />
        </div>

        {/* Net Movement Modal */}
        {showNetMovementModal && (
          <NetMovementModal onClose={() => setShowNetMovementModal(false)} />
        )}
      </div>
    </Layout>
  );
}

function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
