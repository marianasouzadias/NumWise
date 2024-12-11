import React, { useState } from "react";
import Display from "./Display";
import "../Styles/Calculator.css";
import "../Styles/Buttons.css";
import "../Styles/ThemeToggle.css";
import "../Styles/DisplayStyle.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [memory, setMemory] = useState(0);
  const [theme, setTheme] = useState("light");

  const handleMemoryAdd = () => setMemory(memory + parseFloat(displayValue));
  const handleMemorySubtract = () =>
    setMemory(memory - parseFloat(displayValue));
  const handleMemoryClear = () => setMemory(0);
  const handleMemoryRecall = () => setDisplayValue(memory.toString());

  const handleSquareRoot = () =>
    setDisplayValue(Math.sqrt(parseFloat(displayValue)).toString());
  const handleSquare = () =>
    setDisplayValue(Math.pow(parseFloat(displayValue), 2).toString());
  const handleToggleSign = () =>
    setDisplayValue((parseFloat(displayValue) * -1).toString());

  const handleInput = (value) => {
    setExpression((prevExpression) => {
      const updatedExpression =
        prevExpression === "0" && !isNaN(value)
          ? value
          : prevExpression + value;
      setDisplayValue(updatedExpression);
      return updatedExpression;
    });
  };

  const handleEquals = () => {
    try {
      const result = evaluateExpression(expression);
      setDisplayValue(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplayValue("Error");
      setExpression("");
    }
  };

  const handleBackspace = () => {
    setExpression((prevExpression) => {
      const updatedExpression = prevExpression.slice(0, -1) || "0";
      setDisplayValue(updatedExpression);
      return updatedExpression;
    });
  };

  const handleClear = () => {
    setDisplayValue("0");
    setExpression("");
  };

  const handlePercentage = () => {
    try {
      const lastNumberMatch = expression.match(/-?\d+(\.\d+)?$/);
      if (lastNumberMatch) {
        const lastNumber = parseFloat(lastNumberMatch[0]);
        const percentageValue = lastNumber / 100;
        const newExpression = expression.replace(
          /-?\d+(\.\d+)?$/,
          percentageValue.toString()
        );
        setExpression(newExpression);
        setDisplayValue(percentageValue.toString());
      }
    } catch (error) {
      setDisplayValue("Error");
      setExpression("");
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <div className={`container ${theme}`}>
      <div className="background">
        <label className="theme-toggle" onClick={toggleTheme}>
          <input
            type="checkbox"
            id="theme"
            checked={theme === "dark"}
            onChange={toggleTheme}
            readOnly
          />
          <span className="slider"></span>
        </label>
        <div className={`calculator-wrapper ${theme}`}>
          <Display value={displayValue} />
          <div className="buttons-container">
            <div className="row">
              <button className="memory-button" onClick={handleMemoryClear}>
                MC
              </button>
              <button className="memory-button" onClick={handleMemoryRecall}>
                MR
              </button>
              <button className="memory-button" onClick={handleMemoryAdd}>
                M+
              </button>
              <button className="memory-button" onClick={handleMemorySubtract}>
                M-
              </button>
            </div>
            <div className="row">
              <button className="functionalities" onClick={handleSquareRoot}>
                √
              </button>
              <button className="functionalities" onClick={handleSquare}>
                x²
              </button>
              <button className="functionalities" onClick={handlePercentage}>
                %
              </button>
              <button className="functionalities" onClick={handleToggleSign}>
                +/-
              </button>
              <button className="functionalities" onClick={handleClear}>
                C
              </button>
              <button className="functionalities" onClick={handleBackspace}>
                ⌫
              </button>
            </div>
            <div className="row">
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
                onClick={() => handleInput("/")}
              >
                ÷
              </button>
            </div>
            <div className="row">
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
                onClick={() => handleInput("*")}
              >
                x
              </button>
            </div>
            <div className="row">
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
                onClick={() => handleInput("-")}
              >
                -
              </button>
            </div>
            <div className="row">
              <button
                className="numbers large"
                onClick={() => handleInput("0")}
              >
                0
              </button>
              <button
                className="numbers large"
                onClick={() => handleInput(".")}
              >
                .
              </button>
              <button
                className="functionalities"
                onClick={() => handleInput("+")}
              >
                +
              </button>
            </div>
            <div className="equal-row">
              <button className="equal-button" onClick={handleEquals}>
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
const evaluateExpression = (expression) => {
  expression = expression.replace(/\s+/g, "");

  const tokens = expression.match(/(\d+(\.\d+)?|[+\-*/])/g);

  const numberStack = [];
  const operatorStack = [];

  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  const applyOperator = (operator, b, a) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return 0;
    }
  };

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      numberStack.push(parseFloat(token));
    } else if (token in precedence) {
      while (
        operatorStack.length > 0 &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        const operator = operatorStack.pop();
        const b = numberStack.pop();
        const a = numberStack.pop();
        numberStack.push(applyOperator(operator, b, a));
      }
      operatorStack.push(token);
    }
  });

  while (operatorStack.length > 0) {
    const operator = operatorStack.pop();
    const b = numberStack.pop();
    const a = numberStack.pop();
    numberStack.push(applyOperator(operator, b, a));
  }

  return numberStack[0];
};
