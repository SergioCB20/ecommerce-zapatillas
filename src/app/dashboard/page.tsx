"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductList from "@/components/ProductList";
import { useUser } from "@/context/UserContext";
import DashboardSkeleton from "@/components/Skeletons/Dashboard";

const Dashboard = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen pt-12 px-8 md:p-8 bg-gray-100">
      <h1 className="text-5xl font-bold text-center py-6">Centro de Control</h1>
      <ProductList />
    </div>
  );
};

export default Dashboard;
