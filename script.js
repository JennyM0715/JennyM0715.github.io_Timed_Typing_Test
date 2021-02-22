const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


//created variables and gave initial values for timer and timerRunning
//no initial value given for interval variable
var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
//parameter is "time"
function leading_zero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function run_Timer_clock() {
  //new variable currentTime
                      //timer[0] is the minute, timer[1] is second, and timer[2] is hundredths
    let currentTime = leading_zero(timer[0]) + ":" + leading_zero(timer[1]) + ":" + leading_zero(timer[2]);
  
   //The Element property innerHTML gets or sets the HTML or XML markup contained within the element.
  //which is the "timer class" of the div element inside the "meta div element tag"
    theTimer.innerHTML = currentTime;
    timer[3]++;
  
  
    //The Math.floor() function returns the largest integer less than or equal to a given number.
  //timer[0] is the minute, timer[1] is second, and timer[2] is hundredths
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spell_checker() {
    let text_entered = testArea.value;
    let origin_text_match = originText.substring(0,text_entered.length);

  
  //condition statement if text entered == the original text (const originText) then,
  //the border colors will change depending on conditions 
  //if and else statement 
    if (text_entered == originText) {
        clearInterval(interval);
      /*border changes to purple heart when user is done typing and everything is correct */
        testWrapper.style.borderColor = "#1f30ae";
    } else {
        if (text_entered == origin_text_match) {
          /*border changes to sky blue as the user is typing and the texts are correct*/
            testWrapper.style.borderColor = "#b4e0e3";
        } else {
          /*border changes to red if there is a typing error or some sort of grammar error */
            testWrapper.style.borderColor = "red";
        }
    }

}

// Start the timer:
function start_timer_clock() {
  
   //starts the timer when user starts tying in the text box
  //let the text entered lenght to be equal to the "test-area" class inside the section tag
    let text_entered_length = testArea.value.length;
  //have two conditions to be met which is why I put the "&&"
  //if statement
    if (text_entered_length === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(run_Timer_clock, 10);
    }
}

// Reset everything:
function reset_all() {
    clearInterval(interval);
  
  //resets global variables back to initial value
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

  //clears out the text in the text box
    testArea.value = "";
  
  //resets the clock to 0
    theTimer.innerHTML = "00:00:00";
  
  //resets the border color back to Robin Egg Blue
    testWrapper.style.borderColor = "#3cf6ea"; /*Robin Egg Blue as border color for text box*/
}

// Event listeners for keyboard input and the reset
//event listener that fires when a user clicks a button
// it's a method to attach an event handler to a specified element.
//there is one for when user starts typing in the text box
//there is one for when user enters wrong input, no input, or correct input
//there is one for when user clicks on "start over" button
testArea.addEventListener("keypress", start_timer_clock, false); //to call the start_timer_clock fucntion
//left it as "false" as said in your zoom lecture since that is the default

testArea.addEventListener("keyup", spell_checker, false); // to call the spell_checker fucntion
//left it as "false" as said in your zoom lecture since that is the default

resetButton.addEventListener("click", reset_all, false);//to call the reset_all fucntion
//left it as "false" as said in your zoom lecture since that is the default