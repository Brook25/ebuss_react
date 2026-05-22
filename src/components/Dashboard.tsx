import React, { useEffect, useState}  from 'react';


function Dashbboard(): JSX.Element {
 
  const [dashboardData, setDashboardData] = useState<Array<Object>>([]);

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
        const data = await response.json() as Array<Object>;
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
    
  </div>)

}