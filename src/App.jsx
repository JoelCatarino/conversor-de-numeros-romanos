import { useState } from "react";
import './global.css'

const RomanNumeralConverter = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const convertToArabic = () => {
    const romanNumerals = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let arabicNumber = 0;
    let previousValue = 0;
    let repetitions = 1;

    for (let i = input.length - 1; i >= 0; i--) {
      const currentValue = romanNumerals[input[i].toUpperCase()];
      if (currentValue === undefined) {
        setResult("Invalid input");
        return;
      }

      if (currentValue >= previousValue) {
        arabicNumber += currentValue;
        repetitions = 1;
      } else {
        if (repetitions >= 3) {
          setResult("Invalid input");
          return;
        }

        arabicNumber -= currentValue;
        repetitions++;
      }

      previousValue = currentValue;
    }

    setResult(arabicNumber);
  };

  const convertToRoman = () => {
    const arabicNumber = parseInt(input);
    if (isNaN(arabicNumber) || arabicNumber <= 0 || arabicNumber >= 4000) {
      setResult("Invalid input");
      return;
    }

    const romanNumerals = [
      ["M", 1000],
      ["CM", 900],
      ["D", 500],
      ["CD", 400],
      ["C", 100],
      ["XC", 90],
      ["L", 50],
      ["XL", 40],
      ["X", 10],
      ["IX", 9],
      ["V", 5],
      ["IV", 4],
      ["I", 1],
    ];

    let romanNumber = "";
    let num = arabicNumber;

    for (let i = 0; i < romanNumerals.length; i++) {
      const [symbol, value] = romanNumerals[i];
      while (num >= value) {
        romanNumber += symbol;
        num -= value;
      }
    }

    setResult(romanNumber);
  };

  return (
    <div>
      <h2>Roman Numeral Converter</h2>
      <div>
        <label>Enter a Roman numeral or an roman number:</label>
        <input type="text" value={input} onChange={handleInputChange} />
      </div>
      <button onClick={convertToArabic}>Convert to Arabic</button>
      <button onClick={convertToRoman}>Convert to Roman</button>
      <div>
        <label>Result:</label>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default RomanNumeralConverter;
