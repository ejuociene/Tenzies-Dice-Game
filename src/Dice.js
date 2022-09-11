import React from 'react';

const Dice = (props) => {
	const filterNotCosen = 'invert(85%) sepia(33%) saturate(3687%) hue-rotate(311deg) brightness(104%) contrast(77%)';
	const filterChosen = 'invert(39%) sepia(56%) saturate(699%) hue-rotate(323deg) brightness(96%) contrast(90%)';
	const styles = { filter: props.isChosen ? filterChosen : filterNotCosen };
	return (
		<div className="dice-face" style={styles} onClick={props.chooseDice}>
			<img src={props.img} className="dice-img" alt={props.value} />
			<h2 className="dice-number">{/* {props.value} */}</h2>
		</div>
	);
};

export default Dice;
