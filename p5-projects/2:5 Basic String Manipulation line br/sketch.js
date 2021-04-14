// Text a returned by loadStrings
let a_lines;

// Array of words
let a_words = [];

// Variable to hold the random string being built
let a_str = '';

// Paragraph element to hold the text
let a_para;

let r_word;

let words_perlines = [3, 4, 5]
let words_perline;

function preload() {
  loadStrings('turkey.txt', process);
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(200, 50);
  background(200);
  sketch_ui();

  // show_pretty('a_words', a_words);
  show_pretty('a_lines', a_lines);

  a_para = createP();
  a_para.style('font-weight', 'bold');

  words_perline = random(words_perlines);
}

function draw() {
  // Draw next word every half second
  if (frameCount % 30 == 0) {

    // Add a random index
    // Only try for 10 times for difference word
    // to avoid infinite loop
    for (let ntry = 0; ntry < 10; ntry++) {
      let index = floor(random(a_words.length));
      if (index < a_words.length) {
        // Pick a random word
        let nword = a_words[index];

        // Keep trying for different word
        if (r_word && nword === r_word) continue;
        r_word = nword;

        // And to string
        a_str += nword + ' ';

        // Remove the selection
        a_words.splice(index, 1);

        // Break up long lines sometimes
        words_perline -= 1;
        if (words_perline <= 0) {
          a_str += '<br/>';
          words_perline = random(words_perlines);
        }

        show_pretty('a_words', a_words);
        break;
      }
    }
    // Update paragraph element
    a_para.html(a_str);
  }
}

function process(lines) {
  // Save value for display in html
  a_lines = lines;
  // Go line by line by value
  for (let line of lines) {
    // Turn each line into an array of words
    let tokens = splitTokens(line);
    // Add it to 1 big array
    a_words = a_words.concat(tokens);
  }
  // Go word by word, by index
  // Clean up each word
  for (let w in a_words) {
    let word = a_words[w];
    // Remove punctuation
    word = word.replace(/[-_:;.,!?\(\)]/g, "");
    // Make it all lowercase
    word = word.toLowerCase();
    // Get rid of whitespace around the word
    word = word.trim();
    // If nothing is left, get rid of it
    if (word.length < 1) a_words.splice(w, 1);
    // Otherwise put cleaned up word back in array
    else a_words[w] = word;
    // print('w', w, 'word', word);
  }
}

// https://editor.p5js.org/icm4.0/sketches/cgHx2OeKd
// 2:5 Basic String Manipulation by icm4.0
// Mimi Yin
// NYU ITP