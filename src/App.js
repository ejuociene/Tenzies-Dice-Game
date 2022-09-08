import { useEffect, useState } from 'react';
import './App.css';
import Dice from './Dice';

function App() {
	const allNewDice = () => {
		const newArray = [];
		for (let i = 0; i < 10; i++) {
			const newDice = {
				value: randomDiceValue(),
				chosen: false,
				id: i + 1
			};
			newArray.push(newDice);
		}
		return newArray;
	};
	const randomDiceValue = () => {
		return Math.ceil(Math.random() * 6);
	};
	const [ dice, setDice ] = useState(allNewDice());
	const [ tenzies, setTenzies ] = useState(false);

	useEffect(
		() => {
			const firstValue = dice[0].value;
			const allChosen = dice.every((each) => each.chosen);
			const allSameNumber = dice.every((each) => each.value === firstValue);
			if (allChosen && allSameNumber) {
				setTenzies(true);
			}
		},
		[ dice ]
	);

	const chooseDice = (id) => {
		console.log('clicked');
		setDice((prevDice) =>
			prevDice.map((dice) => {
				return dice.id === id ? { ...dice, chosen: !dice.chosen } : dice;
			})
		);
	};
	const rollAvailableDice = () => {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((each, i) => (each.chosen ? each : { value: randomDiceValue(), chosen: false, id: i + 1 }))
			);
		} else {
			setDice(allNewDice());
			setTenzies(false);
		}
	};
	return (
		<div className="App">
			<header className="App-header">Tenzies</header>
			<p className="text">
				Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
			</p>
			<div className="dice-container">
				{dice.map((each) => {
					return <Dice key={each.id} {...each} onClick={() => chooseDice(dice.id)} />;
				})}
			</div>
		</div>
	);
}

export default App;
