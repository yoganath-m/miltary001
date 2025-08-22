import { useState } from "react";
import Layout from "@/components/Layout";

function NetMovementModal({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <div>
        <h3>Net Movement Breakdown</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div>
        <div>Purchases: +125</div>
        <div>Transfer In: +45</div>
        <div>Transfer Out: -30</div>
        <div>Net Movement: +140</div>
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
        <h1>Dashboard</h1>
        
        <div>
          <h2>Filters</h2>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>
          <div>
            <label>Base</label>
            <select
              value={filters.base}
              onChange={(e) => setFilters({ ...filters, base: e.target.value })}
            >
              <option value="">All Bases</option>
              <option value="base-alpha">Base Alpha</option>
              <option value="base-bravo">Base Bravo</option>
              <option value="base-charlie">Base Charlie</option>
            </select>
          </div>
          <div>
            <label>Equipment Type</label>
            <input
              type="text"
              placeholder="Enter equipment type"
              value={filters.equipmentType}
              onChange={(e) => setFilters({ ...filters, equipmentType: e.target.value })}
            />
          </div>
        </div>

        <div>
          <div>
            <h3>Opening Balance</h3>
            <p>{metrics.openingBalance.toLocaleString()}</p>
          </div>
          <div>
            <h3>Closing Balance</h3>
            <p>{metrics.closingBalance.toLocaleString()}</p>
          </div>
          <div>
            <h3>Net Movement</h3>
            <p>
              <button onClick={() => setShowNetMovementModal(true)}>
                +{metrics.netMovement.toLocaleString()}
              </button>
            </p>
          </div>
          <div>
            <h3>Assigned</h3>
            <p>{metrics.assigned.toLocaleString()}</p>
          </div>
          <div>
            <h3>Expended</h3>
            <p>{metrics.expended.toLocaleString()}</p>
          </div>
        </div>

        {showNetMovementModal && (
          <NetMovementModal onClose={() => setShowNetMovementModal(false)} />
        )}
      </div>
    </Layout>
  );
}
