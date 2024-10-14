var terminal = { "inputLocked": false, "lastKey": "" }
terminal.div = document.getElementById("terminal")
terminal.input = ""

terminal.write = function(text, color = "lime", size = 3) {
  let write = document.createElement("font")
  write.color = color
  write.size = size
  write.textContent = text
  terminal.div.appendChild(write)
  write.onclick=(e)=>{
    Array.from(terminal.div.children).forEach((el)=>{
      el.style.backgroundColor = ""
    })
    // write.style.backgroundColor = "green"
  }
}
terminal.writeLine = function(text, color = "lime", size = 3) {
  terminal.write(text + "\n", color)
}
terminal.writeLoop = function(text, color = "lime", size = 3, goto) {
  for (let i = 0; i < text.length; i++) {
    terminal.write(text[i], color, size, goto)
  }
}
terminal.clear = function() {
  terminal.div.innerHtml = ""
}
window.addEventListener("keydown", async (e) => {
  if (terminal.inputLocked == false) {
    terminal.lastKey = e.key
    console.log(e.key)
    if (e.key.length == 1&&e.ctrlKey==false) {
      terminal.write(e.key,"lime",3,true)
      terminal.input+=e.key
    } else {
      if (e.key == "Backspace") {
        if (terminal.div.lastChild.textContent.length == 1) {
          terminal.div.removeChild(terminal.div.lastChild)
          terminal.input = terminal.input.splice(-1, 1)
        } else {
          terminal.writeLoop("\\b", "red")
          input+="\\b"
          //terminal.div.lastChild.textContent = terminal.div.lastChild.textContent.slice(0, -1)
        }
      } else if (e.key == "Enter") {
        terminal.write("\n")
        terminal.input+="\n"
      }else if(e.key.toLowerCase() == "v"&&e.ctrlKey==true){
        const text = await navigator.clipboard.readText();
        terminal.writeLoop(text)
        terminal.input+=text
      }
    }
  }
  Array.from(terminal.div.children).forEach((el)=>{
    el.style.backgroundColor = ""
  })
  Array.from(terminal.div.children).at(-1).style.backgroundColor = "green"
})
terminal.findCursor = ()=>{
  for(let i = 0;i<Array.from(terminal.div.children).length;i++){
    if(Array.from(terminal.div.children).at(i).style.backgroundColor=="green"){
      return [i,Array.from(terminal.div.children).at(i)]
    }
  }
}
