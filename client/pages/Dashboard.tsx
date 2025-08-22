import { useState } from "react";
import Layout from "@/components/Layout";

function NetMovementModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Net Movement Breakdown</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div>
          <div className="breakdown-item">
            <span>Purchases:</span>
            <span>+125</span>
          </div>
          <div className="breakdown-item">
            <span>Transfer In:</span>
            <span>+45</span>
          </div>
          <div className="breakdown-item">
            <span>Transfer Out:</span>
            <span>-30</span>
          </div>
          <div className="breakdown-item breakdown-total">
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

  const metrics = {
    openingBalance: 1250,
    closingBalance: 1390,
    netMovement: 140,
    assigned: 890,
    expended: 45,
  };

  return (
    <Layout>
      <div>
        <h1 className="page-title">Dashboard</h1>

        <div className="filters-container">
          <h2 className="filters-title">Filters</h2>
          <div className="filters-row">
            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
            </div>
            <div className="form-field">
              <label>Base</label>
              <select
                value={filters.base}
                onChange={(e) =>
                  setFilters({ ...filters, base: e.target.value })
                }
              >
                <option value="">All Bases</option>
                <option value="base-alpha">Base Alpha</option>
                <option value="base-bravo">Base Bravo</option>
                <option value="base-charlie">Base Charlie</option>
              </select>
            </div>
            <div className="form-field">
              <label>Equipment Type</label>
              <input
                type="text"
                placeholder="Enter equipment type"
                value={filters.equipmentType}
                onChange={(e) =>
                  setFilters({ ...filters, equipmentType: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="metrics-container">
          <div className="metric-box">
            <h3 className="metric-title">Opening Balance</h3>
            <p className="metric-value">
              {metrics.openingBalance.toLocaleString()}
            </p>
          </div>
          <div className="metric-box">
            <h3 className="metric-title">Closing Balance</h3>
            <p className="metric-value">
              {metrics.closingBalance.toLocaleString()}
            </p>
          </div>
          <div className="metric-box">
            <h3 className="metric-title">Net Movement</h3>
            <p className="metric-value">
              <button
                className="btn btn-primary"
                onClick={() => setShowNetMovementModal(true)}
              >
                +{metrics.netMovement.toLocaleString()}
              </button>
            </p>
          </div>
          <div className="metric-box">
            <h3 className="metric-title">Assigned</h3>
            <p className="metric-value">{metrics.assigned.toLocaleString()}</p>
          </div>
          <div className="metric-box">
            <h3 className="metric-title">Expended</h3>
            <p className="metric-value">{metrics.expended.toLocaleString()}</p>
          </div>
        </div>

        {showNetMovementModal && (
          <NetMovementModal onClose={() => setShowNetMovementModal(false)} />
        )}
      </div>
    </Layout>
  );
}
