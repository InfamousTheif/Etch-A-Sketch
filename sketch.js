const etchGrid = document.querySelector(".etch-grid");
const clearButton = document.querySelector(".clear-button");
const eraseButton = document.querySelector(".erase-button");
const colorPicker = document.querySelector("#color-picker");
const pixelSlider = document.querySelector(".pixel-slider")
const pixelCounter = document.querySelector("#pixel-counter")
// const canvas = document.querySelector(".squares-grid");
// let c = canvas.getContext("2d");

// fitToContainer(canvas)

// c.fillStyle = "lightblue"; // Set the fill color (e.g., using a color name, hex, RGB, or HSL)
// c.fillRect(0, 0, canvas.width, canvas.height); // Draw a filled rectangle from (0,0) to the canvas's full width and height

// let mouse = {
//   x: undefined,
//   y: undefined
// }

// window.addEventListener('mousemove', (e) => {
//   mouse.x = e.x;
//   mouse.y = e.y;
// })

// class Square {
//   constructor(x,y, w, h, fillStyle){
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;
//     this.fillStyle = fillStyle
//   }

//   drawSquare(){
//     c.beginPath()
//     c.lineWidth = 1;
//     c.fillStyle = this.fillStyle
//     c.rect(this.x, this.y, this.w, this.h)
//     c.fill()
//     c.stroke()
//   }
// }

// let s1 = new Square(20,20,100,100, "transparent")
// s1.drawSquare()

// function mouseHover(){

//   let offSetW = (window.innerWidth - canvas.width) / 2;
//   let offSetH = (window.innerWidth - canvas.height) / 2;

//   window.addEventListener("mousemove", () => {
//   if(mouse.x - offSetW > s1.x && mouse.x - offSetW < s1.x + s1.w){
//     s1.fillStyle = "black"
//   }
//     c.clearRect(0, 0, canvas.width, canvas.height);
//     c.fillStyle = "lightblue"; // Set the fill color (e.g., using a color name, hex, RGB, or HSL)
//     c.fillRect(0, 0, canvas.width, canvas.height); // Draw a filled rectangle from (0,0) to the canvas's full width and height
//     s1.drawSquare()
//     console.log(mDown)
//     })

    
// }

// mouseHover()

let fillColor = "black"
let mDown = false;

// ['mousedown', 'mouseup'].forEach(e => etchGrid.addEventListener(e, () => mDown = !mDown));
// console.log(mDown)

//Mouse events handler
// When mouse pressed on grid
etchGrid.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Prevents drag behavior
  mDown = true;
});

// When released anywhere on page
document.addEventListener("mouseup", () => {
  mDown = false;
});

// Mobile support
etchGrid.addEventListener("touchstart", () => {
  mDown = true;
});

document.addEventListener("touchend", () => {
  mDown = false;
});

// function clearSquare(selector){
//   clearButton.addEventListener('click', () => {
//     selector.style.background = "white";
//   })
// }

// Clear button
clearButton.addEventListener("click", () => {
  document.querySelectorAll(".square").forEach(sq => sq.style.background = "white");
  eraseButton.style.borderColor = "white"
});

// Erase button
eraseButton.addEventListener("click", () => {
  eraseButton.style.borderColor = "Blue"
  fillColor = "white";
});

// Color picker
colorPicker.addEventListener("input", e => {
  fillColor = e.target.value;
  eraseButton.style.borderColor = "white"
})

colorPicker.addEventListener("click", e => {
  fillColor = e.target.value;
  eraseButton.style.borderColor = "white"
})

pixelSlider.addEventListener("input", () => {
  squaresHandler(pixelSlider.value);
})

pixelSlider.addEventListener("input", () => {
  let x = pixelSlider.value;
  pixelCounter.innerHTML = `${x}x${x} pixels`
  let color = `linear-gradient(90deg, blue ${x}%, white ${x}%)`
  pixelSlider.style.background = color;
})

function addGlobalEventListener(type, parent, selector, callback){
  parent.addEventListener(type, e => {
    if(e.target.matches(selector)){
      callback(e)
    }
  })
}

function fillSquare(box){
  if(mDown){
    box.style.background = fillColor;
  }

  if(!mDown){
    return
  }
}

let squareAmount;

function squaresHandler(amount){
  squareAmount = (amount * amount);
  etchGrid.innerHTML = ""
  for(let i = 1; i <= squareAmount; i++){
    etchGrid.insertAdjacentHTML("beforeend", `<div class="square" id="square-${i}" draggable="false"></div>`)
  }

  etchGrid.style.gridTemplateColumns = `repeat(${amount}, 1fr)`;
  etchGrid.style.gridTemplateRows = `repeat(${amount}, 1fr)`;

  const squares = document.querySelectorAll('.square')
  
  for(const square of squares ){
    square.addEventListener("mouseenter", () => {
      fillSquare(square)
    })

    square.addEventListener("mousedown", () => {
      square.style.background = fillColor;
    })

    square.addEventListener("click", () => {
      square.style.background = fillColor;
    })
  }
}

squaresHandler(50)

// function eraseButtonHandler(){
//   eraseButton.addEventListener('click', () => {
//     fillColor = "white"
//   })
// }
// eraseButtonHandler()

// function fitToContainer(canvas){
//   // Make it visually fill the positioned parent
//   canvas.style.width ='100%';
//   canvas.style.height='100%';
//   // ...then set the internal size to match
//   canvas.width  = canvas.offsetWidth;
//   canvas.height = canvas.offsetHeight;
// }
