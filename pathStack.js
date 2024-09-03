export default class PStack {
    constructor () {
        this.paths = []
    }

    push(path) {
		console.log("Pushing: ", path)
        this.paths.push(path)
    }

    pop() {

		// console.log("Removing: ", this.paths.pop())
        return this.paths.pop()
    }

	reverseStack() {
		return this.paths.toReversed()
	}

	get path() {
		return this.paths
	}

	reset() {
		this.paths = []
	}
}