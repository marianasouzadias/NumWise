import { useState } from "react";
import Display from "./Display";

import "../Stayles/Calculator.css";
import "../Stayles/buttons.css";
import "../Stayles/themeToggle.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState("");
  const [operator, setOperator] = useState("");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log(theme);
  };

  const handleInput = (value) => {
    if (!isNaN(value) || value === ".") {
      setDisplayValue((prevDisplay) =>
        prevDisplay === "0" ? value : prevDisplay + value
      );
    } else if (value === "=") {
      handleEquals();
    } else {
      setDisplayValue(value);
      setFirstOperand(displayValue);
      setOperator(value);
    }
  };
  const handleOperator = (selectedOperator) => {
    if (operator !== "") {
      handleEquals();
    }
    setOperator(selectedOperator);
  };

  const handleEquals = () => {
    if (operator && displayValue !== "") {
      const secondOperand = parseFloat(displayValue);

      let result;
      switch (operator) {
        case "+":
          result = parseFloat(firstOperand) + secondOperand;
          break;
        case "-":
          result = parseFloat(firstOperand) - secondOperand;
          break;
        case "*":
          result = parseFloat(firstOperand) * secondOperand;
          break;
        case "/":
          result = parseFloat(firstOperand) / secondOperand;
          break;
        default:
          result = NaN;
      }
      setDisplayValue(result.toString());
      setFirstOperand("");
      setOperator("");
    }
  };

  const handleClear = () => {
    setDisplayValue("0");
    setFirstOperand("");
    setOperator("");
  };

  return (
    <div className="container">
      <div className="background">
        <label className="theme-toggle" onClick={toggleTheme}>
          <input type="checkbox" id="theme" defaultChecked={theme === "dark"} />
          <span className="slider"></span>
        </label>
        <div className={`calculator-wrapper ${theme}`}>
          <Display value={displayValue} />
          <div className="buttons-container">
            <div className="buttons">
              <button className="functionalities" onClick={() => handleClear()}>
                CE
              </button>
              <button className="functionalities">+/-</button>
              <button className="functionalities">%</button>
              <button
                className="functionalities"
                onClick={() => handleOperator("/")}
              >
                /
              </button>
              <button className="numbers" onClick={() => handleInput("7")}>
                7
              </button>
              <button className="numbers" onClick={() => handleInput("8")}>
                8
              </button>
              <button className="numbers" onClick={() => handleInput("9")}>
                9
              </button>
              <button
                className="functionalities"
                onClick={() => handleOperator("*")}
              >
                x
              </button>
              <button className="numbers" onClick={() => handleInput("4")}>
                4
              </button>
              <button className="numbers" onClick={() => handleInput("5")}>
                5
              </button>
              <button className="numbers" onClick={() => handleInput("6")}>
                6
              </button>
              <button
                className="functionalities"
                onClick={() => handleOperator("-")}
              >
                -
              </button>
              <button className="numbers" onClick={() => handleInput("1")}>
                1
              </button>
              <button className="numbers" onClick={() => handleInput("2")}>
                2
              </button>
              <button className="numbers" onClick={() => handleInput("3")}>
                3
              </button>
              <button
                className="functionalities"
                onClick={() => handleOperator("+")}
              >
                +
              </button>
              <button className="numbers" onClick={() => handleInput("0")}>
                0
              </button>
              <button className="numbers" onClick={() => handleInput("0")}>
                .
              </button>
              <button
                className="functionalities"
                onClick={() => handleEquals()}
              >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
