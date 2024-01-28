class Vector {
    x;
    y;
    constructor(x = 0, y = x) {
        this.x = x;
        this.y = y;
    }
    set(arg1, arg2) {
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            this.x = arg1;
            this.y = arg2;
        }
        else if (arg1 instanceof Vector) {
            this.x = arg1.x;
            this.y = arg1.y;
        }
    }
    sum(arg1, arg2) {
        const newVec = new Vector();
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            newVec.x = this.x + arg1;
            newVec.y = this.y + arg2;
        }
        else if (arg1 instanceof Vector) {
            newVec.x = this.x + arg1.x;
            newVec.y = this.y + arg1.y;
        }
        return newVec;
    }
    difference(arg1, arg2) {
        const newVec = new Vector();
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            newVec.x = this.x - arg1;
            newVec.y = this.y - arg2;
        }
        else if (arg1 instanceof Vector) {
            newVec.x = this.x - arg1.x;
            newVec.y = this.y - arg1.y;
        }
        return newVec;
    }
    product(arg1, arg2) {
        const newVec = new Vector();
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            newVec.x = this.x * arg1;
            newVec.y = this.y * arg2;
        }
        else if (arg1 instanceof Vector) {
            newVec.x = this.x * arg1.x;
            newVec.y = this.y * arg1.y;
        }
        return newVec;
    }
    quotient(arg1, arg2) {
        const newVec = new Vector();
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            newVec.x = this.x / arg1;
            newVec.y = this.y / arg2;
        }
        else if (arg1 instanceof Vector) {
            newVec.x = this.x / arg1.x;
            newVec.y = this.y / arg1.y;
        }
        return newVec;
    }
    add(arg1, arg2) {
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            this.set(this.sum(arg1, arg2));
        }
        else if (arg1 instanceof Vector) {
            this.set(this.sum(arg1));
        }
    }
    subtract(arg1, arg2) {
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            this.set(this.difference(arg1, arg2));
        }
        else if (arg1 instanceof Vector) {
            this.set(this.difference(arg1));
        }
    }
    multiply(arg1, arg2) {
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            this.set(this.product(arg1, arg2));
        }
        else if (arg1 instanceof Vector) {
            this.set(this.product(arg1));
        }
    }
    divide(arg1, arg2) {
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            this.set(this.quotient(arg1, arg2));
        }
        else if (arg1 instanceof Vector) {
            this.set(this.quotient(arg1));
        }
    }
    atan2() {
        return Math.atan2(this.y, this.x);
    }
    toObject() {
        return {
            x: this.x,
            y: this.y
        };
    }
    distFrom(other) {
        return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
    }
    /** Returns the vector (with distance 1 from origin) that has the angle theta (starting counterclockwise from the positive x-axis) */
    static unitVectorFromAngle(theta) {
        return new Vector(Math.cos(theta), Math.sin(theta));
    }
}
export default Vector;
