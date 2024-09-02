// imports
import Stack  from "./commandStack.js";

// Variables
const input = document.getElementById('input');
const container = document.getElementById('container')
const panelContainer2 = document.getElementById('panel__two')
const filesystem = {
  home: {
    xjaylandero: {
      Documents : {
        "resume.pdf": "This is a resume",
        projects : {
          
        }
      },
      "README.md": "LOL"
    }
  }
}

let pwd = "home/xjaylandero"
let currDirectory = filesystem.home.xjaylandero

const commandStack = new Stack()
// Functions
const createMessageNode = (msg) => {
  const newParagraph = document.createElement('p');
  newParagraph.textContent = msg;
  
  return newParagraph
}

const displayFileNode = (files) => {
  const newParagraph = document.createElement('p');

  console.log(files)
  files.forEach(file => {
    const spanNode = document.createElement('span')
    spanNode.setAttribute('class', 'file__display')
    spanNode.textContent = file
    newParagraph.append(spanNode)
  })

  return newParagraph
}

const createPromptNode = () => {
  // Create div for new prompt
  const promptLine = document.createElement('div')
  
  // Create span for the prompt
  const prompt = document.createElement('span')
  
  prompt.textContent = "xjaylandero:~$"

  // Create input for the prompt
  const inputLine = document.createElement('input')


  inputLine.setAttribute("id", "input")
  inputLine.setAttribute("type", "text")
  inputLine.setAttribute('autofocus', '')
  inputLine.setAttribute('class', 'input__style')
  inputLine.addEventListener("keydown", (event) => enterEvent(event, inputLine))

  inputLine.addEventListener('input', function() {
    console.log(this.style.width)

    this.style.width = `${this.value.length + 1}ch`; 
  });
  
  container.addEventListener('click', () => {
    inputLine.focus()
  })

  promptLine.append(prompt)
  promptLine.append(inputLine)
  
  panelContainer2.append(promptLine)
  inputLine.focus()
}

const showFiles = () => {
}

const showCurrDir = () => {
  return pwd
}

const clearOutput = () => {
  panelContainer2.replaceChildren()

}

const cleanInput = (inputObj) => {
  inputObj.setAttribute('disabled', '')
  inputObj.removeAttribute('id')
  inputObj.removeAttribute('autofocus')
}

const enterEvent = (event, inputObj) => {
    if (event.key === 'Enter') {
        event.preventDefault();
    
        // Split the prompt into parts
        const prompt = inputObj.value.trim().split(' ')
    
        // get the argument
        const argument = prompt["0"]
        
        // Clean the current prompt
        cleanInput(inputObj)       

        const getValueFromPath = (obj, path) => {
          const keys = path.split('/');
          console.log(keys)
          return keys.reduce((acc, key) => acc && acc[key] !== undefined ? acc[key] : undefined, obj);
        };

        switch (argument) {
          case "ls":
            const keys = Object.keys(getValueFromPath(filesystem, showCurrDir()));
            panelContainer2.append(displayFileNode(keys))
            break
          case "cat":
            break
          case "cd":
            const parameter = prompt[1] ? pwd + "/" + prompt[1] : 'home/xjaylandero' 
            
            // console.log(parameter)
            let temp


            parameter.split("/").reduce((acc,key) => console.log(acc, " ", key), )
            // temp = parameter.split("/").map(path => path+"/")

            console.log(temp)
            // path.split("/").map(p => )

            if(getValueFromPath(filesystem, parameter)===undefined) {
              const errMsg = `-bash: cd :${parameter}: No such file or directory` 
              panelContainer2.append(createMessageNode(errMsg))
            } else {
              pwd = parameter
            }
            break
          case "pwd":
            panelContainer2.append(createMessageNode(showCurrDir()))
            break
          case "clear":
            clearOutput()
            break
          default:
            const errMsg = `Command '${argument}' not found` 
            panelContainer2.append(createMessageNode(errMsg))
            break
        }

        commandStack.push(prompt.join(" "))
        createPromptNode()
        commandStack.reset()
        
        // console.log(argument)
    } else if (event.key === 'ArrowUp') {
      inputObj.value = commandStack.peek("up") 
    } else if (event.key === 'ArrowDown') {
      inputObj.value = commandStack.peek("down") 
    }
}

input.addEventListener('keydown', (event) => enterEvent(event, input))
input.addEventListener('input', function() {
  console.log(this.style.width)
  this.style.width = `${this.value.length + 1}ch`; 
});
container.addEventListener('click', () => {
  input.focus()
})
