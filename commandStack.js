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

        

        switch (dir) {
            case "up":
                return this.prompts[this.prompts.length - (1 + this.lineHistory+1)] ? this.prompts[this.prompts.length - (1 + this.lineHistory++)] : this.prompts[this.prompts.length - (1 + this.lineHistory)]         
            case "down":
                if (this.lineHistory > 0) {
                    this.lineHistory--;
                }
                return this.prompts[this.prompts.length - (1 + this.lineHistory)]
                       || this.prompts[this.prompts.length - (this.lineHistory++)];
        }
        

    }

    reset() {
        this.lineHistory = 0
    }
}