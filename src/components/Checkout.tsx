import { React } from "react";
import userAuth from "./AuthContext";


function Checkout (cartId: number, paymentTotal: number) {
  const user = userAuth();
  const [withdrawalOptions, setWithdrawalOptions] = useState<Array<string>>([]);
  const [selectedOption, setSelectedOption] = useState<Object>({});
  const [showOption, setShowOption] = useState<boolean>(false);
    useEffect(() => {
      (async () => {
        try {
            const response = await fetch(`http://localhost:8000/playground/withdrawal-options/`);
            const data = await response.json();
            setWithdrawalOptions(data);
        } catch (error) {
            console.error("Error fetching withdrawal options:", error);
        }
      });

      return () => {
        // Cleanup if necessary
      }
    }, []);

    const handleWithdrawalOptionSelect = (option: string) => {
      setSelectedOption(option);
      setShowOption(true);
    }

    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Cart ID: {cartId}</p>
        {showOption ?
          (<div className="selected-option-details">
            <h3>{option.name} Details</h3>
            <img src=`/images/${option}.png` alt={`${option} logo`} className="selected-option-logo" />
            <p>Payment Total: ${paymentTotal.toFixed(2)}</p>
            <button className="confirm-payment-button">Confirm Payment</button>
          </div>)
        : 
        (<div className="withdrawal-options">
          <h3>Choose A Withdrawal Option</h3>
          <ul className="withdrawal-options-list">
            {withdrawalOptions.map((option, index) => (
              <li key={index} onClick={() => handleWithdrawalOptionSelect(option)}>
                <img src=`/images/${option}.png` alt={`${option} logo`} className="withdrawal-option-logo" />
                <span className="withdrawal-option-name">{option.name}</span>
                </li>
              
            ))}
          </ul>
        </div>)}
      </div>
    )
}