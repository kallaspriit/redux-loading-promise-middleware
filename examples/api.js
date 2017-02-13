export function fetch(/* url */) {
	// fake async call
	return new Promise(resolve => setTimeout(resolve.bind(null, [
		'get milk',
		'buy new car',
	]), 50));
}

export function fetchFail(/* url */) {
	// fake rejecterd async call
	return new Promise((resolve, reject) => setTimeout(reject.bind(null, 'Fetch failed'), 50));
}