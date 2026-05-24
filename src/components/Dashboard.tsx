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


interface ChartDataType {
  labels: string[],
  datasets: Array<{
    label: string,
    data: number[],
    backgroundColor?: string,
    borderColor?: string,
    borderWidth?: number
  }>
}

interface ChartMetaDataType {
  label: string,
  xAxisLabel: string,
  yAxisLabel: string
}




ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard(): JSX.Element {
 
  const [dashboardData, setDashboardData] = useState<DashboardDataType>({});


  function transformToCharData({label, xAxisLabel, yAxisLabel}: ChartMetaDataType, data: Record<string, Array<{ name: string, value: number }>>): any {
    const labels = Object.keys(data);
    const values = Object.values(data);
    const entities = values.map(value => value.map(item => item.name)).flat();
    const datasets = [
      {
        label: label,
        data: labels.map(label => )
      }
    ]
  }

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