import React from "react";
import ProductList from "@/components/ProductList";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-5xl font-bold text-center py-6">Centro de Control</h1>
      <ProductList />
    </div>
  );
};

export default Dashboard;