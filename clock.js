var hr = document.querySelectorAll("p")[0];
var bl1 = document.querySelectorAll("p")[1];
var mn = document.querySelectorAll("p")[2];
var bl2 = document.querySelectorAll("p")[3];
var ds = document.querySelectorAll("p")[4];
setInterval(execute,1000);
function execute(){
  var today = new Date;
  var hour = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  disptime(sec,min,hour);
  dispdate();
  alarm(min,hour);
  tic();
}
function tic(){
  sound = new Audio("sound.mp3");
 sound.play();
}
function disptime(sec,min,hour){

  if(min/10<1){
    min = "0"+min;
    mn.textContent=min;
  }
  else{
    mn.textContent=min;
  }
  if(hour/10<1){
    hour = "0"+hour;
    hr.textContent=hour;
  }
  else{
    hr.textContent=hour;
  }
  if(sec/10<1){ sec= "0"+sec;}
  ds.textContent=sec;
bl1.innerHTML = ":";
bl2.innerHTML = ":";
}
 var d = document.querySelectorAll("p")[5];
 var w = document.querySelectorAll("p")[6];
 var m = document.querySelectorAll("p")[7];
 var y = document.querySelectorAll("p")[8];
function dispdate(){
  var just = new Date;
  var day = just.getDay();
  var date = just.getDate();
  var year = just.getFullYear();
  var month = just.getMonth();
  var months =["JAN ","FEB ","MAR ","APR ","MAY ","JUNE ","JULY ","AUG ","SEPT ","OCT ","NOV ","DEC "];
  var weak =["SUN","MON","TUE","WED","THU","FRI","SAT"];
  if(date/10<1){ date = "0"+date;  }
  d.textContent=date;
  w.textContent=weak[day];
  m.textContent=months[month];
  y.textContent=year;

}
setTimeout(alarm,60000);
function alarm(min,hour){
  var alarmhr = document.getElementById("alhr").value;
  var alarmmin = document.getElementById("almin").value;
  if(alarmhr == hour && alarmmin == min){
    var audio = new Audio("Alarm-ringtone.mp3");
    audio.play();
  }
}


//time.textContent = hour + blink + min;

//create a canvas object fro HTML element
var canvas = document.getElementById('canvas');
//create a 2d drawing object
var tp = canvas.getContext('2d');
//calculate the clock radius by using the height
var r = canvas.height / 2
//remap the x and y axis to the center of the canvas
tp.translate(r,r);
//reduce clock radius by 90%
r= r*0.9;

setInterval(drawClock,1000);//run the drawClock function every second.

function drawClock(){
 drawFace(tp,r);
 drawNumbers(tp,r);
 drawTime(tp,r);

}

function drawFace(tp, r){

    //draw white circle for the face
    tp.beginPath();
    tp.arc(0,0,r,0,2*Math.PI);
    tp.fillStyle = "white";
    tp.fill();
    // create a radial gradient (inner, middle, and outer edge of clock)
    var grad = tp.createRadialGradient(0,0,0.95*r,0,0,1.05*r);
    grad.addColorStop(0,"#aa4a30");
    grad.addColorStop(0.5,"white");
      grad.addColorStop(1,"#aa4a30");
    //define gradient as stroke style
  tp.strokeStyle = grad;
  tp.lineWidth = 0.15*r;
  tp.stroke();
    //draw the center of the clock
    tp.beginPath();
    tp.arc(0,0,r*0.1,0,2*Math.PI);
    tp.fillStyle = "#aa4a30";
    tp.fill();
}

function drawNumbers(tp, r) {
  var ang;
  tp.font ="bold 14px Patrick Hand";
  tp.textBaseLine ="middle";
  tp.textAlign ="center";
  for (var i = 1; i < 13; i++) {
 ang = i*(Math.PI/6);
 tp.rotate(ang);
 tp.translate(0,-r*0.85);
 tp.rotate(-ang);
 tp.fillText(i.toString(),0,0)
 tp.rotate(ang);
 tp.translate(0,r*0.85);
 tp.rotate(-ang);
  }

}

function drawTime(tp,r){
 var now = new Date;
 var h = now.getHours();
 var m = now.getMinutes();
 var s = now.getSeconds();
 h =h%12;  //hour

    //calculate angle of hour hand
    h = (h*Math.PI/6)+(m*Math.PI/(6*60))+(s*Math.PI/(6*60*60));
    //make hour hand 50% of canvas's radius
    drawhand(tp, h, r*0.5, r*0.07);
    m = (m*Math.PI/30)+(s*Math.PI/(30*60)); //minute
    drawhand(tp, m, r*0.7, r*0.07);  //calculate angle of minute hand

    //make minute hand 80% of canvas's radius
    s = s*Math.PI/30; //second
    //calculate angle of second hand
  drawhand(tp, s, r*0.8, r*0.04);
    //make second hand 90% of canvas's radius

}
function drawhand(tp,t,l,w){
  tp.beginPath();
  tp.lineWidth = w;
  tp.lineCap ="round";
  tp.moveTo(0,0);
  tp.rotate(t);
  tp.lineTo(0,-l);
  tp.stroke();
  tp.rotate(-t);
}
