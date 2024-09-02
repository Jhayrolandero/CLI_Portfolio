const input = document.getElementById('input');

input.addEventListener('input', function() {
  this.style.width = `${this.value.length + 1}ch`; 
  // The "+1" ensures there's some extra space after the text
});

const filesystem = {
  home: {
    xjaylandero: {
      documents : {
        resume: "This is a resume",
        projects : {
          
        }
      },
      "README.txt": "LOL"
    }
  }
}


let currDirectory = filesystem.home.xjaylandero

input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();

      console.log(currDirectory)
  }
});