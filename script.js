// imports
import Stack  from "./commandStack.js";
import PStack from "./pathStack.js";

/*
 * 
 * VARIABLES 
 * 
 */

const input           = document.getElementById('input');
const container       = document.getElementById('container')
const panelContainer2 = document.getElementById('panel__two')
const dirContainer    = document.getElementById('directory')


// WTF is this
// const filesystem = {
//   home: {
//     type: "Directory",
//     contents: [
//       {
//         xjaylandero: {
//           type: "Directory",
//           contents: [
//             {
//               Documents : {
//                 type: "Directory",
//                 contents: [
//                   {
//                     "resume.pdf": "This is a resume",
//                     Projects : {},
//                     Achievements: {},
//                     Skills: {},
//                     Contact: {},
//                     "About_Me.txt": {
//                       type: "text",
//                       content: "LOL"
//                     }
//                   }
//                 ]
//               },
//             },
//             {
//               "README.txt": {
//                 type: "text",
//                 content: "LOL"
//               }
//             }
//           ]
//         }
//       }
//     ]
//   }
// }
const filesystem = {
  home: {
    xjaylandero: {
      Documents : {
        "resume.pdf": "This is a resume",
        "Projects.txt": "",
        "Achievements.txt": "",
        "Skills.txt": "",
        "Contacts.txt": "",
        "About_Me.txt": `Passionate software engineer, aspiring
                        A.I engineer, and pen tester enthusiast
                        with a vision of creating impactful
                        software solutions to benefit society.`
      },
      "README.txt": "LOL"
    }
  }
}

let pwd = "home/xjaylandero"
let currDirectory = filesystem.home.xjaylandero

const commandStack  = new Stack()
const pathStack     = new PStack()

/*
 * 
 * FUNCTIONS 
 * 
 */

const __init__ = () => {
  input.addEventListener('keydown', (event) => enterEvent(event, input))
  input.addEventListener('input', function() {
    console.log(this.style.width)
    this.style.width = `${this.value.length + 1}ch`; 
  });
  container.addEventListener('click', () => {
    input.focus()
  })
  dirContainer.textContent = showCurrDir().replace("home/xjaylandero", '~') + '$'
} 

const createMessageNode = (msg) => {
  const newParagraph = document.createElement('p');
  newParagraph.textContent = msg;
  
  return newParagraph
}

const createPreMessageNode = (msg) => {
  const newParagraph = document.createElement('pre');
  newParagraph.setAttribute("wrap", '')
  newParagraph.setAttribute("class", 'cat__output')
  newParagraph.textContent = msg;
  
  return newParagraph
}

const displayFileNode = (files) => {
  const newParagraph = document.createElement('div');

  newParagraph.setAttribute('class', 'file__container')
  files.forEach(file => {
    const spanNode = document.createElement('p')
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
  
  // For directory
  const dir = document.createElement('span')


  prompt.textContent = "xjaylandero:"


  dir.textContent = showCurrDir().replace("home/xjaylandero", '~') + '$'

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
  promptLine.append(dir)
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

const wgetFile = () => {
  fetch('./resume.pdf')
  .then(res => { 
    return res.blob() 
  })
  .then(blob => {
    // Create a Blob URL
    const url = window.URL.createObjectURL(blob);

    // Use the download attribute on a hidden link
    const a = document.createElement('a');
    a.style.display = 'none';  // Hide the element
    a.href = url;
    a.download = 'test.txt';

    // Append the link to the document body
    document.body.appendChild(a);

    // Automatically start download
    a.dispatchEvent(new MouseEvent('click'));  // Trigger the download

    // Clean up by revoking the object URL and removing the anchor element
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, 0);
})
.catch(error => {
    console.error('There was an error downloading the file:', error);
});
}

const catFile = async (file) => {
  try {
      const response = await fetch(file);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsText(blob);
      });
  } catch (error) {
      console.error('There was an error downloading the file:', error);
      return null;  // Return null or some error message
  }
};


const enterEvent = async (event, inputObj) => {
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
        return keys.reduce((acc, key) => acc && acc[key] !== undefined ? acc[key] : undefined, obj);
        };

        switch (argument) {
          case "ls":
            const keys = Object.keys(getValueFromPath(filesystem, showCurrDir()));
            panelContainer2.append(displayFileNode(keys))
            break
          case "cat":
            let errMsg2 = "" 

            if(prompt[1] === undefined) {
              errMsg2 = 'cat: missing file patameter'
            } 
                        
            const file2 = prompt[1]
            
            if((showCurrDir() === 'home/xjaylandero' && !["README.txt"].includes(file2)) || (showCurrDir() === 'home/xjaylandero/Documents' && !["About_Me.txt", "Achievements.txt", "Contacts.txt", "Projects.txt", "Skills.txt"].includes(file2))) {
              errMsg2 = `cat: file '${file2}' cannot be read`
            } 
            
            if(errMsg2 !== "") {
              panelContainer2.append(createMessageNode(errMsg2))
              break
            }

            const fileContent = await catFile(file2);
            if (fileContent !== null) {
                console.log(fileContent);
                panelContainer2.append(createPreMessageNode(fileContent));
            } else {
                console.log("Failed to load file.");
            }
            // console.log(catFile())
            break
          case "cd":
            const parameter = prompt[1] ? pwd + "/" + prompt[1] : 'home/xjaylandero' 
            
            pathStack.reset()

            // Split the directory to paths
            parameter.split('/').forEach(path => {
              if(path === "..") {
                pathStack.pop()
              } else {
                pathStack.push(path)
              }
            })
            
            //  Join the sanitize path
            const paths = pathStack.path.join("/")

            if(getValueFromPath(filesystem, paths)===undefined) {
              const errMsg = `-bash: cd :${parameter}: No such file or directory` 
              panelContainer2.append(createMessageNode(errMsg))
            } else {
              pwd = paths
            }
            break
          case "pwd":
            panelContainer2.append(createMessageNode(showCurrDir()))
            break
          case "clear":
            clearOutput()
            break
          case "wget":
            let errMsg1 = "" 

            if(prompt[1] === undefined) {
              errMsg1 = 'wget: missing URL'
              panelContainer2.append(createMessageNode(errMsg1))
              break
            } 
                        
            const file = prompt[1]
            
            if(file !== "resume.pdf") {
              errMsg1 = 'wget: file cannot be download'
              panelContainer2.append(createMessageNode(errMsg1))
              break
            }
            
            wgetFile()
            break
          case 'fs':
            const msg = `
home/
├─ xjaylandero/
│  ├─ Documents/
│  │  ├─ resume.pdf
│  │  ├─ Projects.txt
│  │  ├─ Achievements.txt
│  │  ├─ Skills.txt
│  │  ├─ Contacts.txt
│  │  ├─ About_Me.txt
│  ├─ README.md
            `
            panelContainer2.append(createPreMessageNode(msg))
            break;
          default:
            const errMsg = `Command '${argument}' not found` 
            panelContainer2.append(createMessageNode(errMsg))
            break
        }

        commandStack.push(prompt.join(" "))
        createPromptNode()
        commandStack.reset()
        
    } else if (event.key === 'ArrowUp') {
      inputObj.value = commandStack.peek("up") 
    } else if (event.key === 'ArrowDown') {
      inputObj.value = commandStack.peek("down") 
    }
}

__init__()
