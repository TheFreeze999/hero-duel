import { randomArrayElement } from './random.js';
class UIDGenerator {
	private currentLength;
	private cache = new Set<string>();

	constructor(private initialLength: number, public readonly charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
		this.currentLength = this.initialLength;
	}


	generate(): string {
		while (this.cache.size >= (this.charSet.length ** this.currentLength)) this.currentLength++;

		let string = "";


		const chars = this.charSet.split('');
		for (let i = 0; i < this.currentLength; i++) {
			string += randomArrayElement(chars);
		}
		if (this.cache.has(string)) return this.generate();

		this.cache.add(string)
		return string;
	}
}

export default UIDGenerator;