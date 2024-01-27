export function randomInteger(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomArrayElement<T>(arr: T[]) {
	return arr[randomInteger(0, arr.length - 1)];
}

export function randomColor() {
	return randomArrayElement([
		"red",
		"blue",
		"green",
		"lime",
		"yellow",
		"black",
		"orange",
		"purple",
		"magneta",
	])
}