import React from "react";

const EcoImpact = ({ emissions }) => {
  // Example: Assume 100 grams of CO2 saved per trip as a milestone
  const savings = emissions / 100;

  return (
    <div>
      <h2>Eco Impact</h2>
      <p>You have saved approximately {savings} kg of CO2!</p>
      {/* You can also add more milestones or visualizations here */}
    </div>
  );
};

export default EcoImpact;
