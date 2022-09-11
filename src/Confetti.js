import React, { useEffect } from 'react';
import Confetti from 'react-confetti';

export default () => {
	let width;
	let height;
	useEffect(() => {
		width = window.width;
		height = window.height;
	}, []);
	return <Confetti width={width} height={height} />;
};
