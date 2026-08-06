import React, { useState, useEffect } from 'react';
import { userAuth } from './AuthContext';


function Withdrawal (paymentTotal: number) {

  const user = userAuth();
  const [withdrawalOptions, setWithdrawalOptions] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
        try {
            const response = await fetch(`http://localhost:8000/playground/withdrawal-options/`);
            const data = await response.json();
            setWithdrawalOptions(data);
        } catch (error) {
            console.error("Error fetching withdrawal options:", error);
        }
    })
  }, []);

  return (
    <div className="withdrawal-options">
          <h3>Choose A Withdrawal Option</h3>
          <ul className="withdrawal-options-list">
            {withdrawalOptions.map((option, index) => (
              <li key={index} onClick={() => handleWithdrawalOptionSelect(option)}>
                <img src=`/images/${option}.png` alt={`${option} logo`} className="withdrawal-option-logo" />
                <span className="withdrawal-option-name">{option.name}</span>
                </li>
              
            ))}
          </ul>
        </div>)
}