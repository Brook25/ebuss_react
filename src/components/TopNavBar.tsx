import "./TopNavBar.css"; 
import SideBar from "./SideBar.tsx";


function TopNavBar() {
 
  const sideBar = {
	main: [{name: "Home", icon: "bi bi-house"},
	        {name: "News", icon: "bi bi-newspaper"},
		  {name: "Subscriptions", icon: "bi bi-journal-check"},
	            {name: "Carts", icon: "bi bi-cart-fill"}],

        history: [{name: "Orders", icon: "bi bi-receipt"},
		    {name: "Wish List", icon: "bi bi-list"},
		      {name: "Recently Viewed", icon: "bi bi-eye"},
                        {name: "Search By Type", icon: "bi bi-search"},
                          {name: "History", icon: "bi bi-clock-history"}],

         deals: [{name: "Popular Deals", icon: "bi bi-tag"},
                  {name: "Browse", icon: "bi bi-eye-fill"},
                    {name: "Sell", icon: "bi bi-bag"},
                      {name: "Settings", icon: "bi bi-gear"},
                        {name: "Profile", icon:"bi bi-person-circle"}]
    }

  return (
  <nav className="top-nav-bar">
    <SideBar sideBarItems={sideBar} heading="Ecomm"/>
    <ul className="top-nav-mid">
      <li>Newsletter</li> 
      <li>Eligibility</li>
    </ul>
    <ul className="top-nav-right">
      <li>Recommendations</li> 
      <li>Store</li> 
      <li>Notifications</li> 
    </ul>
  </nav>
  );
}

export default TopNavBar;
