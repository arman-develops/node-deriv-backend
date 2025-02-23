class CircularBuffer {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.array = [];
        this.currentIndex = 0;
    }

    push(data) {
        if (this.array.length < this.maxSize) {
            this.array.push(data);
        } else {
            this.array[this.currentIndex] = data;
        }
        this.currentIndex = (this.currentIndex + 1) % this.maxSize;
    }

    pop() {
        if (this.array.length === 0) {
            return null;
        }
        const poppedElement = this.array.shift();
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        return poppedElement;
    }

    isEmpty() {
        return this.array.length === 0;
    }

    isFull() {
        return this.array.length === this.maxSize;
    }

    size() {
        return this.array.length;
    }

    getArray() {
        return this.array;
    }
}

export {CircularBuffer}