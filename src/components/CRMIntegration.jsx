import React from 'react';

const CRMIntegration = () => {
  const vipData = {
    name: "Elena Grandini",
    email: "elena.grandini@galerieslafayette.com",
    location: "Galeries Lafayette Paris Haussmann",
    status: "VIP",
    preferences: {
       style: "High-End",
       fabric: ["Silk", "Cashmere"],
       drapePreference: "High"
    }
  };

  return (
    <div className="hidden">
      {/* CRM Data Preloaded for Analytics */}
      <span data-crm-id={vipData.email}>{vipData.name} - {vipData.location}</span>
    </div>
  );
};

export default CRMIntegration;
