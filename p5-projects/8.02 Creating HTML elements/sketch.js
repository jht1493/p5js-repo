function setup() {
  createCanvas(200, 200);
  createElement('h1', 'My favorite language is p5');
  createP('My favorite color is purple');
}

function mousePressed() {
  createP('My favorite number is ' + random(0, 10));
}

function draw() {
  background(0);
  fill(255, 0, 0);
  rect(100, 100, 50, 50);
}

// https://github.com/CodingTrain/website/tree/main/
// Tutorials/P5JS/p5.js/08/8.02_p5.js_Creating_HTML_elements_with_JavaScript
// https://www.youtube.com/watch?v=lAtoaRz78I4
