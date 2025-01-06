//import {Fragment} from "react";
import {useState} from "react";
import "./SideBar.css";

interface SideBarPropItems {
  item: string;
  icon: string;
}

interface SideBarProps {
  main: SideBarPropItems[];
  history: SideBarPropItems[];
  deals: SideBarPropItems[];
}

interface Props {
  sideBarItems: SideBarProps;
  heading: String;
}


function SideBar({sideBarItems, heading}: Props) {
  //JSX syntax may not include some conventional js syntax
  const [selectedMainItem, setSelectedMainItem] = useState(-1);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(-1);
  const [selectedDealItem, setSelectedDealItem] = useState(-1);
  const [toggleSideBar, setSideBarVis] = useState('none');

  return (
  <div className="sidebar-container">
  <div className="nav-icon" onClick={() => {setSideBarVis('block')}}>
  <ul className="top-left-sidebar-icon" onClick={() => {setSideBarVis('block')}}>
  <li className="nav-icon"></li>
  <li className="nav-icon"></li>
  <li className="nav-icon"></li>
  </ul>
  <h3>eComm</h3>
  </div>
  <div className="sidebar" style={{display: toggleSideBar}}>
  <nav className="side-nav">
    <h1>{heading}</h1>
    <ul className="list-group" id="sidebar">
    {sideBarItems.main.map((item, index) => (
      <li className={selectedMainItem === index ? "list-group-item active" : "list-group-item"} id="list-item" key={item} onClick={() => { setSelectedMainItem(index); setSelectedHistoryItem(-1); setSelectedDealItem(-1) }}><i className={item.icon}></i>	{item.name}</li>
    ))}
    </ul>
    <ul className="list-group" id="sidebar">
    { sideBarItems.history.map((item, index) => (
      <li className={selectedHistoryItem === index ? "list-group-item active" : "list-group-item"} id="list-item" key={item} onClick={() => {setSelectedHistoryItem(index); setSelectedDealItem(-1); setSelectedMainItem(-1)}}><i className={item.icon}></i>	{item.name}</li>
    ))}
    </ul>
    <ul className="list-group" id="sidebar">
     { sideBarItems.deals.map((item, index) => (
        <li className={selectedDealItem === index ? "list-group-item active" : "list-group-item"} key={item} id="list-item" onClick={() => { setSelectedDealItem(index); setSelectedMainItem(-1); setSelectedHistoryItem(-1) }}><i className={item.icon}></i>	{item.name}</li>
     ))}
    </ul>
  </nav>
  </div>
  </div>
  );
}

export default SideBar;
