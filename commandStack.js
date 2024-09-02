export default class Stack {
    constructor () {
        this.prompts = []
        this.lineHistory = 0
    }

    push(prompt) {
        this.prompts.push(prompt)
    }

    pop() {
        return this.prompts.pop()
    }

    peek(dir) {
        console.log(this.lineHistory, " ", this.prompts, " ", this.prompts.length)
        // if(this.prompts.length !== 0 && (this.lineHistory > this.prompts.length || this.lineHistory < this.prompts.length)) return "empty"
        switch (dir) {
            case "up":
                return this.prompts[this.prompts.length - (1 + this.lineHistory++)] 
            case "down":
                return this.prompts[this.prompts.length - (1 + this.lineHistory--)]
        }

    }

    reset() {
        this.lineHistory = 0
    }
}