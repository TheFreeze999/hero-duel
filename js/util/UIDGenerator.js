import { randomArrayElement } from './random.js';
class UIDGenerator {
    initialLength;
    charSet;
    currentLength;
    cache = new Set();
    constructor(initialLength, charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
        this.initialLength = initialLength;
        this.charSet = charSet;
        this.currentLength = this.initialLength;
    }
    generate() {
        while (this.cache.size >= (this.charSet.length ** this.currentLength))
            this.currentLength++;
        let string = "";
        const chars = this.charSet.split('');
        for (let i = 0; i < this.currentLength; i++) {
            string += randomArrayElement(chars);
        }
        if (this.cache.has(string))
            return this.generate();
        this.cache.add(string);
        return string;
    }
}
export default UIDGenerator;
