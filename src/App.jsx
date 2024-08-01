import { useState } from "react";
import styles from './app.module.css'

export const App = () => {
	const [isLightTheme, setIsLightTheme] = useState(false);
	const changeThemeColor = () => {
		setIsLightTheme(!isLightTheme)
	}
	isLightTheme ? document.body.style.backgroundColor = 'white' : document.body.style.backgroundColor = '#181818'
	const themeStyle = isLightTheme ? styles.isLightTheme : styles.isDarkTheme

	const [result, setResult] = useState(null)
	const [display, setDisplay] = useState('Введите число')

	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');

	const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, 'integers only']
	const operators = [
		{
			operatorName: 'plus',
			operatorForm: '+',
			handleOperator(curr) {
				const nextOperator = curr.operatorForm
				setOperator(nextOperator)
				setDisplay(operand1 + nextOperator + operand2)
			},
		},
		{
			operatorName: 'minus',
			operatorForm: '-',
			handleOperator(curr) {
				const nextOperator = curr.operatorForm
				setOperator(nextOperator)
				setDisplay(operand1 + nextOperator + operand2)
			},
		},
		{
			operatorName: 'equal',
			operatorForm: '=',
			handleOperator() {
				switch (operator) {
					case '+':
						setResult(Number(operand1) + Number(operand2))
						break;
					case '-':
						setResult(Number(operand1) - Number(operand2))
						break;
					default:
						setResult(operand1)
						break;
				}
				setOperator('')
				setOperand1('')
				setOperand2('')
				setDisplay('Введите число')
			},
		},
		{
			operatorName: 'reset',
			operatorForm: 'C',
			handleOperator() {
				setResult(null)
				setOperator('')
				setOperand1('')
				setOperand2('')
				setDisplay('Введите число')
			},
		}
	]

	document.onkeydown = (event) => {
		if (Number(event.key) >= 0 && operator === '') {
			display === 'Введите число' ? setOperand1(String(event.key)) : setOperand1((prev) => prev + String(event.key))
			display === 'Введите число' ? setDisplay(String(event.key)) : setDisplay((prev) => prev + String(event.key))
		} else if (Number(event.key) >= 0 && operator !== '') {
			operand2 === '' ? setOperand2(String(event.key)) : setOperand2((prev) => prev + String(event.key))
			setDisplay((prev) => prev + String(event.key))
		} else if (event.key === '+' || event.key === '-') {
			setOperator(event.key)
			setDisplay(operand1 + event.key + operand2)
		} else if (event.key === '=' || event.key === 'Enter') {
			operators.map((item) => item.operatorForm === '=' && item.handleOperator())
		} else if (event.key === 'Backspace' || event.key === 'Delete') {
			operators.map((item) => item.operatorForm === 'C' && item.handleOperator())
		}
	}

	const handleNumberClick = (num) => {
		if (operator === '') {
			display === 'Введите число' ? setOperand1(String(num)) : setOperand1((prev) => prev + String(num))
			display === 'Введите число' ? setDisplay(String(num)) : setDisplay((prev) => prev + String(num))
		} else {
			operand2 === '' ? setOperand2(String(num)) : setOperand2((prev) => prev + String(num))
			setDisplay((prev) => prev + String(num))
		}
	}



	return (
		<div className={styles.app}>
			<button className={`${styles['theme-color-btn']} ${themeStyle}`} onClick={changeThemeColor}>{isLightTheme ? 'Light' : 'Dark'}</button>
			<main className={`${styles.calculator} ${themeStyle}`}>
				{result !== null &&
					<div className={`${styles.calculatorResultField} ${styles.resulted} ${themeStyle}`}>{result}</div>
				}
				{result === null &&
					<div className={`${styles.calculatorResultField} ${themeStyle}`} onFocus={() => display === 'Введите число' && setDisplay('')} onBlur={() => display === '' && setDisplay('Введите число')} tabIndex={1}>{result !== null ? result : display}</div>
				}

				<ul className={`${styles.calculatorOperatorsList} ${themeStyle}`}>
					{operators.map((item) => {
						return <li className={`${styles.calculatorOperatorsItem} ${themeStyle}`} key={item.operatorName}>
							<button className={`${styles.operatorBtn} ${themeStyle}`} onClick={() => item.handleOperator(item)}>{item.operatorForm}</button>
						</li>
					})}

				</ul>
				<ul className={`${styles.calculatorNumbersList} ${themeStyle}`}>
					{nums.map((item) => {
						return <li className={`${styles.calculatorNumbersItem} ${themeStyle}`} key={item}>
							{item !== 'integers only' && <button className={`${styles.numberBtn} ${themeStyle}`} onClick={() => handleNumberClick(item)}>{item}</button>}
							{item === 'integers only' && <button className={`${styles.numberBtn} ${themeStyle}`} disabled={true}>{item}</button>}
						</li>
					})}

				</ul>
			</main>
		</div>
	);
};
