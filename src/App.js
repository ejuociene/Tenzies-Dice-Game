import { useEffect, useState } from 'react';
import './App.css';
import Dice from './Dice';
import Confetti from 'react-confetti';
import One from './images/One.svg';
import Two from './images/Two.svg';
import Three from './images/three.svg';
import Four from './images/four.svg';
import Five from './images/five.svg';
import Six from './images/six.svg';

function App() {
	const imgArray = [ One, Two, Three, Four, Five, Six ];
	const generateNewDie = (i) => {
		const randomValue = randomDiceValue();
		return {
			value: randomValue,
			img: imgArray[randomValue - 1],
			isHeld: false,
			id: i + 1
		};
	};
	const allNewDice = () => {
		const newArray = [];
		for (let i = 0; i < 10; i++) {
			newArray.push(generateNewDie(i));
		}
		return newArray;
	};
	const randomDiceValue = () => {
		return Math.ceil(Math.random() * 6);
	};
	const [ dice, setDice ] = useState(allNewDice());
	const [ tenzies, setTenzies ] = useState(false);
	const [ rolls, setRolls ] = useState(0);

	useEffect(
		() => {
			const firstValue = dice[0].value;
			const allChosen = dice.every((each) => each.isChosen);
			const allSameNumber = dice.every((each) => each.value === firstValue);
			if (allChosen && allSameNumber) {
				setTenzies(true);
			}
		},
		[ dice ]
	);

	const chooseDice = (id) => {
		setDice((prevDice) =>
			prevDice.map((dice) => {
				return dice.id === id ? { ...dice, isChosen: !dice.isChosen } : dice;
			})
		);
	};
	const rollAvailableDice = () => {
		if (!tenzies) {
			let roll = setInterval(() => {
				setDice((oldDice) => oldDice.map((each, i) => (each.isChosen ? each : generateNewDie(i))));
			}, 20);
			setTimeout(() => {
				clearInterval(roll);
			}, 100);
			setRolls((prevRolls) => prevRolls + 1);
		} else {
			setDice(allNewDice());
			setTenzies(false);
			setRolls(0);
		}
	};

	return (
		<div className="App">
			{tenzies && <Confetti />}
			<header className="App-header">Tenzies</header>
			<p className="text">
				Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
			</p>
			<div className="dice-container">
				{dice.map((each) => {
					return <Dice key={each.id} {...each} chooseDice={() => chooseDice(each.id)} />;
				})}
			</div>
			{tenzies && <h1 className="bold">Congrats!</h1>}
			<p className="text">
				{tenzies && 'Total '}Rolls: {rolls}{' '}
			</p>
			<button className="btn" onClick={rollAvailableDice}>
				{tenzies ? 'Play again' : 'Roll'}
			</button>
		</div>
	);
}

export default App;
