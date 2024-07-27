import { useState } from "react";
import styles from './app.module.css'

export const App = () => {
	const [isLightTheme, setIsLightTheme] = useState(false);
	const changeThemeColor = () => {
		setIsLightTheme(!isLightTheme)
	}
	isLightTheme ? document.body.style.backgroundColor = 'white' : document.body.style.backgroundColor = '#181818'
	const themeStyle = isLightTheme ? styles.isLightTheme : styles.isDarkTheme

	const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, 'integers only']
	const operators = [
		{
			operatorName: 'plus',
			operatorForm: '+',
		},
		{
			operatorName: 'minus',
			operatorForm: '-',
		},
		{
			operatorName: 'equal',
			operatorForm: '=',
		},
		{
			operatorName: 'reset',
			operatorForm: 'C',
		}
	]


	return (
		<div className={styles.app}>
			<button className={`${styles['theme-color-btn']} ${themeStyle}`} onClick={changeThemeColor}>{isLightTheme ? 'Light' : 'Dark'}</button>
			<main className={`${styles.calculator} ${themeStyle}`}>
				<input type="number" className={`${styles.calculatorResultField} ${themeStyle}`} />
				<ul className={`${styles.calculatorOperatorsList} ${themeStyle}`}>
					{operators.map((item) => {
						return <li className={`${styles.calculatorOperatorsItem} ${themeStyle}`} id={item.operatorName}>
							<button className={`${styles.operatorBtn} ${themeStyle}`}>{item.operatorForm}</button>
						</li>
					})}

				</ul>
				<ul className={`${styles.calculatorNumbersList} ${themeStyle}`}>
					{nums.map((item) => {
						return <li className={`${styles.calculatorNumbersItem} ${themeStyle}`}>
							<button className={`${styles.numberBtn} ${themeStyle}`} id={Date.now()}>{item}</button>
						</li>
					})}

				</ul>
			</main>
		</div>
	);
};
