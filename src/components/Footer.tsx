import './Footer.css';

function Footer() {
  const footerLists = {
  suppliers: ["Popular", "Search By Category", "Up and Coming"],
  company: ["About Us", "Contact us", "Management Team"],
  privacy: ["Cookies", "Personal Data", "User Guidelines", "Secure Payement"],
  customerSupport: ["Return Policy", "Complaints"]
  }

  return (
           <footer>
             <ul>
               <h6>Suppliers</h6>
                { footerLists.suppliers.map((item) => ( <li>{item}</li> )) }
             </ul>
             <ul>
               <h6>Company</h6> 
                { footerLists.company.map((item) => ( <li>{item}</li> )) }
             </ul>
             <ul>
               <h6>Privacy</h6>
                { footerLists.privacy.map((item) => ( <li>{item}</li> )) }
             </ul>
             <ul>
               <h6>Customer Support</h6> 
                { footerLists.customerSupport.map((item) => ( <li>{item}</li> )) }
             </ul>
           </footer>
  );
}

export default Footer;
