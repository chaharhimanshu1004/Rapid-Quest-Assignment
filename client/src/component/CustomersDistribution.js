import React, { useEffect, useState } from "react";
import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "../@/components/ui/chart.jsx";

export default function CustomersDistribution() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6002/api/customers/customers-distribution");
        const data = await response.json();
        
        const formattedData = data.map(item => ({
          city: item._id, 
          customerCount: item.count, 
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching customer distribution data:", error);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    customerCount: {
      label: "Customers",
      color: "#2563eb",
    },
  };

  return (
    <>
      <h1 style={{ fontSize: "32px",fontWeight:'bold', textAlign: "center",marginTop:'30px' }}>Customer Distribution by City</h1>
      <ChartContainer config={chartConfig} className="min-h-[160px] w-full" style={{ margin: "-80px auto", width: "90%" }}>
        <BarChart accessibilityLayer data={chartData} barSize={30}>
          <Bar dataKey="customerCount" fill="var(--color-customerCount)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
