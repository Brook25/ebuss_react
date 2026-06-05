import React, { useEffect, useState}  from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';


interface DashboardDataType {
  quarterlyMetrics?: Record<string, Array<{ name: string, value: number }>>,
  quarterlyRevenue?: Record<string, number>,
  hourlyMetrics?: Record<string, Array<{ name: string, value: number }>>,
  InventoryData?: Record<string, number>,
  subscriberData?: Array<{ name: string, avatar: string }>,
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
  yAxisLabel: string,
  type: 'bar' | 'line' | 'pie'
}




ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard(): JSX.Element {
 
  const [dashboardData, setDashboardData] = useState<DashboardDataType>({});


  function transformToCharData({label, xAxisLabel, yAxisLabel, type}: ChartMetaDataType, data: Record<string, Array<{ name: string, value: number }>>): any {
    const labels = Object.keys(data).sort();
    const values = Object.values(data);
    const entities = values[0].map(item => item.name);
    const backgroundColors = {0: 'rgba(255, 99, 132, 0.5)', 1: 'rgba(54, 162, 235, 0.5)', 2: 'rgba(255, 206, 86, 0.5)', 3: 'rgba(75, 192, 192, 0.5)', 4: 'rgba(153, 102, 255, 0.5)'} as Record<number, string>;
    
    if (type === 'pie') {
      const pieDatasets = [
        {
          data: entities.map( entity => values.flat().reduce((acc, curr) => acc + curr.name === entity ? curr.value : 0 , 0)),
          backgroundColors: entities.map((_, index) => backgroundColors[index % Object.keys(backgroundColors).length])
        }
      ]
      return { labels, datasets: pieDatasets };
    }
    
   else if (type === 'line' || type === 'bar') {
    const barLineDataSets = entities.map((entity, index) => { 
       return {
          label: entity,
          data: labels.map((label) => data[label].find((item) => item.name === entity)?.value || 0),
          backgroundColor: backgroundColors[index % Object.keys(backgroundColors).length]
        }
      })
      return { labels, datasets: barLineDataSets };
    }

    return { labels: [], datasets: [] };
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
      {dashboardData.quarterlyMetrics && <Bar data={transformToCharData({ label: 'Quarterly Metrics', xAxisLabel: 'Months', yAxisLabel: 'Values', type: 'bar' }, dashboardData.quarterlyMetrics)} />}
    </div>
    <div className="quarterly-revenue">
      <h2>Quarterly Revenue</h2>
      {dashboardData.quarterlyRevenue && dashboardData.quartrlyRevenue}
    </div>
      <div className="inventory-data">
        <h2>Inventory Data</h2>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.InventoryData && Object.entries(dashboardData.InventoryData).map(([product, quantity], index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product}</td>
                <td>{quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="hourly-metric">
         {dashboardData.hourlyMetrics && <Line data={transformToCharData({ label: 'Hourly Metrics', xAxisLabel: 'Hours', yAxisLabel: 'Values', type: 'line' }, dashboardData.hourlyMetrics)} />}
        </div>
       <div className="subscriber-data">
        <h2>Subscriber Data</h2>
        {dashboardData.subscriberData && <ul>
          {dashboardData.subscriberData.map((subscriber, index) => <li key={index}><img src={subscriber.avatar} alt={subscriber.name} /> {subscriber.name}</li>)}
        </ul>}
       </div>
  </div>)

}