class Vector {
	constructor(public x = 0, public y = x) {

	}
	set(x: number, y: number): void;
	set(vec: Vector): void;
	set(arg1: Vector | number, arg2?: number) {
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
			this.x = arg1;
			this.y = arg2;
		} else if (arg1 instanceof Vector) {
			this.x = arg1.x;
			this.y = arg1.y;
		}
	}


	sum(x: number, y: number): Vector;
	sum(vec: Vector): Vector;
	sum(arg1: Vector | number, arg2?: number) {
		const newVec = new Vector();
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
			newVec.x = this.x + arg1;
			newVec.y = this.y + arg2;
		} else if (arg1 instanceof Vector) {
			newVec.x = this.x + arg1.x;
			newVec.y = this.y + arg1.y;
		}
		return newVec;
	}

	difference(x: number, y: number): Vector;
	difference(vec: Vector): Vector;
	difference(arg1: Vector | number, arg2?: number) {
		const newVec = new Vector();
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
			newVec.x = this.x - arg1;
			newVec.y = this.y - arg2;
		} else if (arg1 instanceof Vector) {
			newVec.x = this.x - arg1.x;
			newVec.y = this.y - arg1.y;
		}
		return newVec;
	}

	product(x: number, y: number): Vector;
	product(vec: Vector): Vector;
	product(arg1: Vector | number, arg2?: number) {
		const newVec = new Vector();
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
			newVec.x = this.x * arg1;
			newVec.y = this.y * arg2;
		} else if (arg1 instanceof Vector) {
			newVec.x = this.x * arg1.x;
			newVec.y = this.y * arg1.y;
		}
		return newVec;
	}

	quotient(x: number, y: number): Vector;
	quotient(vec: Vector): Vector;
	quotient(arg1: Vector | number, arg2?: number) {
		const newVec = new Vector();
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
			newVec.x = this.x / arg1;
			newVec.y = this.y / arg2;
		} else if (arg1 instanceof Vector) {
			newVec.x = this.x / arg1.x;
			newVec.y = this.y / arg1.y;
		}
		return newVec
	}

	add(x: number, y: number): void;
	add(vec: Vector): void;
	add(arg1: Vector | number, arg2?: number) {
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
			this.set(this.sum(arg1, arg2));
		} else if (arg1 instanceof Vector) {
			this.set(this.sum(arg1));
		}
	}

	subtract(x: number, y: number): void;
	subtract(vec: Vector): void;
	subtract(arg1: Vector | number, arg2?: number) {
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
			this.set(this.difference(arg1, arg2));
		} else if (arg1 instanceof Vector) {
			this.set(this.difference(arg1));
		}
	}

	multiply(x: number, y: number): void;
	multiply(vec: Vector): void;
	multiply(arg1: Vector | number, arg2?: number) {
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
			this.set(this.product(arg1, arg2));
		} else if (arg1 instanceof Vector) {
			this.set(this.product(arg1));
		}
	}

	divide(x: number, y: number): void;
	divide(vec: Vector): void;
	divide(arg1: Vector | number, arg2?: number) {
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
			this.set(this.quotient(arg1, arg2));
		} else if (arg1 instanceof Vector) {
			this.set(this.quotient(arg1));
		}
	}

	atan2() {
		return Math.atan2(this.y, this.x)
	}

	toObject(): Vector.AsObject {
		return {
			x: this.x,
			y: this.y
		}
	}

	distFrom(other: Vector): number {
		return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
	}

	/** Returns the vector (with distance 1 from origin) that has the angle theta (starting counterclockwise from the positive x-axis) */
	static unitVectorFromAngle(theta: number) {
		return new Vector(Math.cos(theta), Math.sin(theta));
	}
}

namespace Vector {
	export interface AsObject {
		x: number,
		y: number
	}
}

export default Vector;