//---------
//SETTINGS
//-------------

//variables
var elem = document.getElementById("point");
var angleDouble = 0;
var clickDelay = 30;

//cookies alert
alert("The site uses cookies.")

//point spawn location
var x = parseFloat(prompt("Enter position for x in pixels:"));
var y = parseFloat(prompt("Enter position for y in pixels:"));

elem.style.marginLeft = `${x}px`;
elem.style.marginTop = `${y}px`;

//point start angle
var angle = prompt("Enter angle of the direction:");
angle -= 360 * Math.floor(angle/360);

//point speed
var speed = prompt("Enter the speed of the marble (default is 1):");
speed = speed/14;

//FPS
var id = setInterval(frame, 10);

//breaking protect
if (isNaN(x) || isNaN(y) || isNaN(speed) || isNaN(angle)) {
  x=0
  y=0
  angle=83.23
  speed=1/14
} else if (speed > 10/14) {
  speed = 10/14
} else if (speed < 0.3/14) {
  speed = 0.3/14
}

//--------
//COUNTER
//------------

//load function
function counter() {
  var count = parseInt(localStorage.getItem("score"));
  document.getElementById("counter").innerHTML = count;
}

//change colour back
function changeColour() {
  elem.style.backgroundColor="rgb(225, 225, 225)";
}

//on click
function clickEvent(elem) {
  if (clickDelay >= 30) {
    var count = parseInt(localStorage.getItem("score"));
    //add score lower 1
    if (speed*14 < 1) {
      count += Math.floor(speed*14*10);
    }
    //add score highter 1
    if (speed*14 >= 1 && speed*14 <= 10) {
      count += Math.floor(speed*14*250);
    }
    
    //change colour on click with delay
    elem.style.backgroundColor="rgb(132, 233, 255)";
    setTimeout(changeColour, 250);

    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("score", count);
    }
    counter();
    clickDelay = 0;
  }
}

//load
window.onload = function counterLoad() {
  var count = localStorage.getItem("score");
  if (count === null) {
    //store
    localStorage.setItem("score", 0);
    //first load
    document.getElementById("counter").innerHTML = 0;
  }
  //load
  counter();
}


//--------
//INTERVAL
//------------

function frame() {
  //click delay
  if (clickDelay < 30) {
    clickDelay += 1;
    console.log(clickDelay)
  }

  //window resolution
  var Y = document.querySelector("html").clientHeight;
  var X = document.querySelector("html").clientWidth;
  
  //angles for 0°-90°
  if (angle >= 0 && angle <= 90) {
    x += speed * (100 / 90) * angle;
    y -= speed * (100 / 90) * (90-angle);
  }
  //angles for 90°-180°
  if (angle > 90 && angle <= 180) {
    angleDouble = angle - 90;
    x += speed * (100 / 90) * (90-angleDouble);
    y += speed * (100 / 90) * angleDouble;
  }
  //angles for 180°-270°
  if (angle > 180 && angle <= 270) {
    angleDouble = angle - 180;
    x -= speed * (100 / 90) * angleDouble;
    y += speed * (100 / 90) * (90-angleDouble);
  }
  //angles for 270°-360°
  if (angle > 270 && angle < 360) {
    angleDouble = angle - 270;
    x -= speed * (100 / 90) * (90-angleDouble);
    y -= speed * (100 / 90) * angleDouble;
  }

  //right bounce
  if (x > X-30) {
    x=X-30;
    //from top
    if (angle > 90 && angle < 180) {
      angle = 360 - angle;
    }
    //from bottom
    if (angle > 0 && angle < 90) {
      angle = 360 - angle;
    }
    //straight
    if (angle == 90) {
      angle = 270;
    }
  }
  //bottom bounce
  if (y > Y-30) {
    y=Y-30;
    //from left
    if (angle > 90 && angle < 180) {
      angle = 180 - angle;
    }
    //from right
    if (angle > 180 && angle < 270) {
      angle = 540 - angle;
    }
    //straight
    if (angle == 180) {
      angle = 0;
    }
  }
  //left bounce
  if (x < 0) {
    x=0;
    //from top
    if (angle > 180 && angle < 270) {
      angle = 360 - angle;
    }
    //from bottom
    if (angle > 270 && angle < 360) {
      angle = 360 - angle;
    }
    //straight
    if (angle == 270) {
      angle = 90;
    }
  }
  //top bounce
  if (y < 0) {
    y=0;
    //from left
    if (angle > 0 && angle < 90) {
      angle = 180 - angle;
    }
    //from right
    if (angle > 270 && angle < 360) {
      angle = 540 - angle;
    }
    //straight
    if (angle == 0) {
      angle = 180;
    }
  }

  //move
  elem.style.marginLeft = `${x}px`;
  elem.style.marginTop = `${y}px`;
}