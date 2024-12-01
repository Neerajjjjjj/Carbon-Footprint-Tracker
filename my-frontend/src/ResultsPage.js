import React from "react";

const ResultsPage = ({ emissions, ecoSavings }) => {
  return (
    <div>
      <h2>Results Page</h2>
      <p>Emissions: {emissions} grams of CO2</p>
      <p>Eco Savings: {ecoSavings} grams of CO2</p>
    </div>
  );
};

export default ResultsPage;
