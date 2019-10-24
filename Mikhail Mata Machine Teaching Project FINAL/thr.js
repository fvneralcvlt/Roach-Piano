// Title of Project: "Cockroach uses a Ball to Play Piano Because You told it to"
//By Mikhail Mata 3172420

let video; //video is set as a variable

let poseNet; //poseNet is set as a variable

let noseX = 0; //noseX is a variable that has the value of 0
let noseY = 0; //noseY is a variable that has the value of 0

let osc; //osc is set as a variable

let notes = [60, 62, 64, 65, 67, 69, 71, 72]; //notes is set as a variable that contains these values in the array, P.S The C Major Scale


function setup() {
  
  //This creates the canvas, canvas is set to 400px by 400px.
  createCanvas(400, 400);


  //video is assigned to make a video.
  video = createCapture(VIDEO);
  video.hide();

  //poseNet is assigned the ml5 poseNet library.
  poseNet = ml5.poseNet(video,modelReady);
  poseNet.on('pose', gotPoses);
  
  
  //osc is set to a square oscillator.
  osc = new p5.Oscillator('square');
  osc.start();
  
  img = loadImage("images/cc.png");
  img2 = loadImage("images/bg.png");
}



//This function gets the necessary keypoints for noseX and noseY to work.
function gotPoses(poses){
  
console.log(poses);

  noseX = poses[0].pose.keypoints[0].position.x
  noseY = poses[0].pose.keypoints[0].position.y

}


//This tells if the model is ready in the console log.
function modelReady(){

console.log('model ready');

}




function draw() {
  
  //This is the image set as a background.
  image(img2, 0,0);
  
  
  //This randomizes the piano keys' colour.
  fill(random(250),random(250),random(250));

  //These are the piano keys.
  strokeWeight(4);
  rect(0,width/2,40,10);   //NOTE C Marker 
  
  rect(40,width/2,40,10);  //NOTE D ""
  
  rect(100,width/2,40,10); //NOTE E ""
  
  rect(160,width/2,40,10); //NOTE F ""
  
  rect(200,width/2,40,10); //NOTE G ""
  
  rect(240,width/2,40,10); //NOTE A ""
  
  rect(290,width/2,40,10); //NOTE B ""
  
  rect(340,width/2,60,10); //NOTE C OCTAVE ""
  
  
//-----------------------------------------------------------
  //This dictates the limits of the oscillator, how far to go.
  let index = floor(map(noseX, 0, width, 0, notes.length));
  console.log(index);
  
  //Volume is mapped to the value of the Y axis of the nose tracked.
  let volume = map(noseY, height, 0, 0, 1);
  
  //size is mapped to the value of the Y axis of the nose tracked.
  let size = map(noseY, height, 0, 0, 100);
  
  osc.freq(midiToFreq(notes[index]));
  osc.amp(volume);
  
  //Wall dictates the the restrictions.
  let wall = constrain(noseX, size/2, width - size/2);
    
//-----------------------------------------------------------
  //This dictates the thickness of ellipse's border.
  strokeWeight(2);
  //This sets the color of the ellipse.
  fill(255,255,255);

  //This is the ellipse.
  ellipse(wall, width/2-20, 40);

  //The image of the cockroach.
  image(img,wall,width/2-20,40,40);
  
}
