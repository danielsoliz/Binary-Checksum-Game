  let score = 0;

  function randomnum(length) {
    // generate random binary numbers of length `length`
    let binary1 = Math.floor(Math.pow(2, length) * Math.random()).toString(2);
    let binary2 = Math.floor(Math.pow(2, length) * Math.random()).toString(2);

    // pad the binary numbers with leading zeros if needed
    binary1 = binary1.padStart(length, "0");
    binary2 = binary2.padStart(length, "0");

    // update the HTML elements with the generated binary numbers
    document.getElementById("number1").innerHTML = binary1;
    document.getElementById("number2").innerHTML = binary2;
}

function wrapBinary(num , bits) {
  var binary = num.toString(2); // convert the number to binary

  if (binary.length > bits) {
      // remove the leftmost bit until the binary number has the correct length
      var leftmostBit = binary.substr(0, 1);
      var sliced = binary.substr(1, bits);
      // add leading zeros to the leftmost bit until it has the same length as `bits`
      while (leftmostBit.length < bits) {
          leftmostBit = "0" + leftmostBit;
      }
      // add the binary number and the leftmost bit
      var result = parseInt(sliced, 2) + parseInt(leftmostBit, 2);
      // convert the result to binary and add leading zeros until it has the same length as `bits`
      var padded = result.toString(2);
      while (padded.length < bits) {
          padded = "0" + padded;
      }
      // return the padded binary number
      return padded;
  }
  else if (binary.length < bits) {
      // add leading zeros to the binary number until it has the correct length
      while (binary.length < bits) {
          binary = "0" + binary;
      }
      // return the padded binary number
      return binary;
  }

  // if the binary number has the correct length, return it as-is
  return binary;
}

function calculateChecksum(binary) {
  let length = 4; 
  let score = 0;

  // Flip the bits of the binary number
  let flippedBinary = "";
  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === "1") {
      flippedBinary += "0";
    } else if (binary[i] === "0") {
      flippedBinary += "1";
    }
  }

  return flippedBinary; 

}

function checkInput() {

  let a = 4

  // Get the updated binary numbers from the HTML elements
  let n1= document.getElementById("number1").innerHTML;
  let n2 = document.getElementById("number2").innerHTML;
  let num = parseInt(n1, 2) + parseInt(n2, 2);
  let wrapped = wrapBinary(num, n1.length);

  // Calculate the checksum using the wrapped sum
  let checksum = calculateChecksum(wrapped);
  console.log(checksum)

  // Get the user's input and convert it to an integer
  let userInput = document.getElementById("userbox").value;

  // Compare the user's input to the checksum
  if (userInput === checksum) {
    // If the user's input is correct, increment the score and log a message
    score += 1;
    console.log("correct");

    // Update the score display
    document.getElementById("score").innerHTML = "Score: " + String(score);

    randomnum(a);

    // Check if the user has reached a new level
    if (score % 3 === 0) {
      a += 4;
      randomnum(a);
      console.log("You Leveled Up!");
    }
  } else {
    // If the user's input is incorrect, log a message
    console.log("incorrect");
  }
}


  
  randomnum(4);



  let submitButton = document.getElementById("answercheck");

  // add an event listener to the button that calls the calculateChecksum() function when the button is clicked
  submitButton.addEventListener("click", function() {
    checkInput();
  });

  // Set the timer duration in seconds
  var timerDuration = 60;

  // Set the initial timer value
  var timer = timerDuration;

  // Update the timer value every second
  setInterval(function() {
    // Decrement the timer value
    timer--;

    // Update the timer value on the page
    document.getElementById("timer").innerHTML = "Timer: " + timer;

    // If the timer has reached 0, wipe the page and display a "start over" button
    if (timer == 0) {
      // Wipe the page
      document.body.innerHTML = "";
      // Display a "start over" button
      document.body.innerHTML = "<button onclick='location.reload()'>Start Over</button>";
    }
  }, 1000);
 


