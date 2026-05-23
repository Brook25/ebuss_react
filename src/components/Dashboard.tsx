import React, { useEffect, useState}  from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';


interface DashboardDataType {
  quarterlyMetrics?: Record<string, Record<string, number>>,
  quarterlyRevenue?: Record<string, number>,
  hourlyMetrics?: Record<string, Record<string, number>>,
  InventoryData?: Record<string, number>,
  subscriberData?: Array<string>,
  [key: string]: any
}




ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard(): JSX.Element {
 
  const [dashboardData, setDashboardData] = useState<DashboardDataType>({});


  function transformToCharData(data: Record<string, Record<string, number>>): any {


  useEffect(() => {
    (async () => {
      var cancelled = false;
      const uri = window.location.href;
      try {
      const response = await fetch(uri, {
        headers: { 'Content-Type': 'application/json'},
      });

      if (cancelled) return;

      if (response.ok) {
        const data = await response.json() as DashboardDataType;
        setDashboardData(data);
      }
      else {
        console.log('Failed to fetch dashboard data:', response.statusText);
      }
    } catch (error) {
      console.log('Error fetching dashboard data:', error);
    }}
   )();
  return () => { cancelled = true; };
  }, [])
  

  




  return (<div>
    <h1>Dashboard</h1>
    <div className="quarterly-metrics">
      <h2>Quarterly Metrics</h2>
      {dashboardData.quarterlyMetrics && <Bar data={dashboardData.quarterlyMetrics} />}
    </div>
    
  </div>)

}