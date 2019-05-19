// Adding event Listener to Button
let form = document.getElementsByTagName("form")[0].addEventListener("submit", getTask);
// Creating publick Array
let allObjTask = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//// Function for creating object and continue to create Task
function getTask(e){
  // Get input value
  let inputText = document.getElementById("inputTask").value;
  let timeDuration = document.getElementsByName("timeDuration");
  let pickedTime;
  for(let i = 0; i < timeDuration.length; i++){
    if(timeDuration[i].checked){
      pickedTime = timeDuration[i].value;
    }
  }
  // Setting timestamp
  let timestamp = Math.floor(Date.now()/1000) + Number(pickedTime);
  // Creating Object for task
  let taskObj = {
    text: inputText,
    time: timestamp
  };
  // Pushing object task to Public Object Array
  allObjTask.push(taskObj);
  localStorage.setItem('items', JSON.stringify(allObjTask));
  // adding object as argument to unction to create task UI
  createTask(taskObj);
  // Restarting Input field
  document.getElementById("inputTask").value = "";
  
  e.preventDefault();
};

const data = JSON.parse(localStorage.getItem('items'));
if(data !== null){
  data.forEach(element => {
    let li = document.createElement("LI");
    let text = document.createTextNode(element.text);
    li.appendChild(text);
    ul.appendChild(li);
  });
};

//// Creating UI task
function createTask(task){
  // const data = JSON.parse(localStorage.getItem('items'));
  let taskObject = task;
  
  let ul = document.getElementById("ul");
  let li = document.createElement("LI");
  let text = document.createTextNode(taskObject.text);
  li.appendChild(text);
  ul.appendChild(li);
  // Calling Countdowner
  startCountdown();
};

//// Countdown Initialization for every object in Public Array 
function startCountdown(){
  allObjTask.forEach(element => {
    // Calling function to convert timestamp
    timeConverter(element.time);
  });
};
//// Converting timestamp
function timeConverter(timeObj){
  // Getting timestamp from argument
  let timestamp = timeObj;// timeObj is timestamp of current task
  // Converting time
  var a = new Date(timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  // Time format
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  // Calling time counter for every task
  timer(time, timestamp);
};

function timer(timeConverter, timestamp){
  // Set the date we're counting down to
  var countDownDate = new Date(timeConverter).getTime();
  console.log(countDownDate);
  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      // Function for clearing task
      clearTask(timestamp);
      // Stop interval
      clearInterval(x);
    }
  }, 1000);
};

//// Clear task and setup new UI
function clearTask(taskTimestamp){
  // Looping thru array of Object to fiend specific timestamp of current Task Object
  let timestampObj = taskTimestamp;
  
  const data = JSON.parse(localStorage.getItem('items'));
  for(let i = 0; i < data.length; i++){
    if(data[i].time === timestampObj){
      data.splice(i,(1));
    }
  }
  // Returning filter array of Object in orginal array!
  allObjTask = data;
  // Set 
  localStorage.setItem('items', JSON.stringify(allObjTask));
  // Restart UI in <ul>
  document.getElementById("ul").innerHTML = "";
  // Printing new UI
  allObjTask.forEach(element => {
    let li = document.createElement("LI");
    let text = document.createTextNode(element.text);
    li.appendChild(text);
    document.getElementById("ul").appendChild(li);
  });
  // Checking array
  console.log(allObjTask);
};

document.getElementById("clearTask").addEventListener('click', function() {
  let ul = document.querySelector("ul");
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  allObjTask = [];
});