import React from 'react';

const Dice = (props) => {
	const styles = { backgroundColor: props.chosen ? '#c8553d' : '#ffd5c2' };
	return (
		<div className="dice-face" style={styles}>
			<h2 className="dice-number">{props.value}</h2>
		</div>
	);
};

export default Dice;
