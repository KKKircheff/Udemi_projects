let toDo = "plus";
let noSpace ='';
let memoryUp = 0;
let memoryUpString ='';
let calcMemory = 0;
let screenMemoryString = "";
let roundPrecision = 10000000000000;

function numEnter(input) {
  let strNumber = input;
  let clSound = document.getElementById("clickAudio"); 
  clSound.play(); 

  /* dec point is pressed */
    screenMemoryString=screenMemoryString.trim();
  if ((strNumber == "decPoint") && (screenMemoryString.indexOf('.')<0)) {
    strNumber = ".";
    if (screenMemoryString.length<=0) {strNumber="0.";}
    screenMemoryString += strNumber;
    document.querySelector(".calc").innerHTML = `${screenMemoryString}`;
    return;
  } 
       /* dec point case + format number*/ 
  if ((screenMemoryString.length < 15)&&(screenMemoryString.indexOf('.')>=0)) {
      screenMemoryString += strNumber;
      noSpace = screenMemoryString.replace(/ /g, "");
      let symbPos = noSpace.indexOf('.');
      let dcL = noSpace.length;
      let decPart = noSpace.slice(symbPos,dcL);
      let intPart = noSpace.slice(0,symbPos);
      let spaceCount =0;
          screenMemoryString='';

      for (let i=symbPos; i>0; i--) { 
        spaceCount++;
        screenMemoryString = intPart[i-1] + screenMemoryString;
        if (spaceCount % 3 == 0) {
          screenMemoryString = " " + screenMemoryString;               
        }         
      } 
      screenMemoryString += decPart;
      document.querySelector(".calc").innerHTML = `${screenMemoryString}`;
    }
        
     /* no dec point case + format number*/ 
    if ((screenMemoryString.length < 15)&&(screenMemoryString.indexOf('.')<0)) { 
      screenMemoryString += strNumber;
      noSpace = screenMemoryString.replace(/ /g, "");  
      let lng = noSpace.length;
      screenMemoryString = "";
      let spaceCount =0;
      for (let i=lng-1; i>=0; i--) { 
        spaceCount++;
        if (spaceCount % 3 == 1) {
          screenMemoryString =  " " + screenMemoryString;               
         }
          screenMemoryString = noSpace[i] + screenMemoryString;
       }     
       document.querySelector(".calc").innerHTML = `${screenMemoryString}`;       
      }
}

function operation(input) {
  let instOp = input;
  let clSound = document.getElementById("clickAudio"); 
  clSound.play(); 


  if (instOp == "plus") {
    document.querySelector(".operand").innerHTML = "+";
  }
  if (instOp == "minus") {
    document.querySelector(".operand").innerHTML = "-";
  }
  if (instOp == "mul") {
    document.querySelector(".operand").innerHTML = "x";
  }
  if (instOp == "dvd") {
    document.querySelector(".operand").innerHTML = "/";
  }
  if (instOp == "percent") {
    document.querySelector(".operand").innerHTML = "%";
  }

  if (instOp == "eql") {
  clSound = document.getElementById("clickAudioEQ"); 
  clSound.play(); 
  document.querySelector(".operand").innerHTML = "=";
  }

  if (instOp == "clr") {
    calcMemory = 0;
    screenMemoryString = "0";
    document.querySelector(".calc").innerHTML = `${screenMemoryString}`;
    document.querySelector(".operand").innerHTML = "";
    screenMemoryString = "";
    toDo = "plus";
    return;
  }
  if (instOp == "ce") {
    screenMemoryString = "0";
    document.querySelector(".calc").innerHTML = `${calcMemory}`;
    document.querySelector(".operand").innerHTML = "";
    screenMemoryString = "";
    toDo = "plus";
    return;
  }

  if (instOp == "mPlus") {
    if (calcMemory == 0) {
      memoryUp = memoryUp + Number(screenMemoryString.replace(/ /g, ""));
    } else {
      memoryUp = memoryUp + calcMemory;
    }
    formatHScrn(memoryUp);
    /*document.querySelector("#hist").innerHTML = `${memoryUp}`;*/
    screenMemoryString = "";
    return;
  }

  if (instOp == "mMinus") {
    if (calcMemory == 0) {
      memoryUp = memoryUp - Number(screenMemoryString.replace(/ /g, ""));
    } else {
      memoryUp = memoryUp - calcMemory;
    }
    formatHScrn(memoryUp);
    screenMemoryString = "";
    return;
  }

  if (instOp == "mc") {
    memoryUp = 0;
    document.querySelector("#hist").innerHTML = `${memoryUp}`;
    return;
  }
  if (instOp == "mr") {
    formatHScrn(memoryUp);
    /* screenMemoryString = memoryUp.toString();
    document.querySelector(".calc").innerHTML = `${screenMemoryString}`;*/
    return;
  }

  if (instOp == "del") { 
    if (screenMemoryString.length<=0) {return;}
    noSpace = screenMemoryString.replace(/ /g, "");
    screenMemoryString ='';
    if (noSpace.length > 1) {
      noSpace = noSpace.slice(0, -1);
      prnClc(noSpace);
      /*document.querySelector(".calc").innerHTML = `${screenMemoryString}`;*/
    } else {
      screenMemoryString = "0";
      document.querySelector(".calc").innerHTML = `${screenMemoryString}`;
      document.querySelector(".operand").innerHTML = "";
      screenMemoryString = "";
      calcMemory = 0;
      toDo = "plus";
    }
    return;
  }

  if (toDo == "plus") {
    calcMemory =
      calcMemory + Number(screenMemoryString.replace(/ /g, ""));
      calcMemory = Math.round(calcMemory*roundPrecision)/roundPrecision;
      prnClc(calcMemory);
    screenMemoryString = "";
    toDo = input;
    return;
  }

  if (toDo == "minus") {
    calcMemory =
      calcMemory - Number(screenMemoryString.replace(/ /g, ""));
      calcMemory = Math.round(calcMemory*roundPrecision)/roundPrecision;
      prnClc(calcMemory);
    screenMemoryString = "";
    toDo = input;
    return;
  }

  if (toDo == "mul") {
    calcMemory =
      calcMemory * Number(screenMemoryString.replace(/ /g, ""));
      calcMemory = Math.round(calcMemory*roundPrecision)/roundPrecision;
      prnClc(calcMemory);
    screenMemoryString = "";
    toDo = input;
  }

  if (toDo == "dvd") {
    calcMemory =
      calcMemory / Number(screenMemoryString.replace(/ /g, ""));
      calcMemory = Math.round(calcMemory*roundPrecision)/roundPrecision;
      prnClc(calcMemory);
    screenMemoryString = "";
    toDo = input;
    return;
  }
  if (toDo == "percent") {
    calcMemory =
      (Number(screenMemoryString.replace(/ /g, "")) * calcMemory) / 100;
      calcMemory = Math.round(calcMemory*roundPrecision)/roundPrecision;
      prnClc(calcMemory);
    screenMemoryString = "";
    toDo = input;
    return;
  }

  if (toDo == "eql") {
    calcMemory =
      calcMemory + Number(screenMemoryString.replace(/ /g, ""));
      prnClc(calcMemory);
    /*document.querySelector(".calc").innerHTML = `${calcMemory}`;*/
    screenMemoryString = "";
    toDo = input;
    return;
  }

  toDo = "eql";
}

/* prnClc - a function that formats a number on yhe main display with white spaces for better presentation*/ 
function prnClc (inpt) {

  let numForStyle = inpt.toString();
  screenMemoryString = '';
  /* dec point case + format number*/ 
  if (numForStyle.indexOf('.')>=0) {  
      noSpace = numForStyle.replace(/ /g, "");
      let symbPos = noSpace.indexOf('.');
      let dcL = noSpace.length;
      let decPart = noSpace.slice(symbPos,dcL);
      let intPart = noSpace.slice(0,symbPos);
      let spaceCount =0;
          screenMemoryString='';

      for (let i=symbPos; i>0; i--) { 
        spaceCount++;
        screenMemoryString = intPart[i-1] + screenMemoryString;
        if (spaceCount % 3 == 0) {
          screenMemoryString = " " + screenMemoryString;               
        }         
      } 
      screenMemoryString += decPart;
      document.querySelector(".calc").innerHTML = `${screenMemoryString}`;
    }
        
    /* no dec point case + format number*/ 
    if (screenMemoryString.indexOf('.')<0) { 
      noSpace = numForStyle.replace(/ /g, "");  
      let lng = noSpace.length;
      screenMemoryString = "";
      let spaceCount =0;
      for (let i=lng-1; i>=0; i--) { 
        spaceCount++;
        if (spaceCount % 3 == 1) {
          screenMemoryString =  " " + screenMemoryString;               
         }
          screenMemoryString = noSpace[i] + screenMemoryString;
       }     
       document.querySelector(".calc").innerHTML = `${screenMemoryString}`;       
      }
  
}
/* formatHScrn - a function that formats a number on the memory display with white spaces for better presentation*/
function formatHScrn(input) {

  let numForStyle = input.toString();
  memoryUpString = '';
/*  dec point case + format number*/ 
  if (numForStyle.indexOf('.')>=0) {  
      noSpace = numForStyle.replace(/ /g, "");
      let symbPos = noSpace.indexOf('.');
      let dcL = noSpace.length;
      let decPart = noSpace.slice(symbPos,dcL);
      let intPart = noSpace.slice(0,symbPos);
      let spaceCount =0;
          memoryUpString='';

      for (let i=symbPos; i>0; i--) { 
        spaceCount++;
        memoryUpString = intPart[i-1] + memoryUpString;
        if (spaceCount % 3 == 0) {
          memoryUpString = " " + memoryUpString;               
        }         
      } 
      memoryUpString += decPart;
      document.querySelector("#hist").innerHTML = `${memoryUpString}`;
    }
        
    /* no dec point case + format number*/ 
    if (memoryUpString.indexOf('.')<0) { 
      noSpace = numForStyle.replace(/ /g, "");  
      let lng = noSpace.length;
      memoryUpString = "";
      let spaceCount =0;
      for (let i=lng-1; i>=0; i--) { 
        spaceCount++;
        if (spaceCount % 3 == 1) {
          memoryUpString =  " " + memoryUpString;               
         }
          memoryUpString = noSpace[i] + memoryUpString;
       }     
       document.querySelector("#hist").innerHTML = `${memoryUpString}`;       
      }
  
}
