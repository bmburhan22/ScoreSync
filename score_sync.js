// Check if localStorage is supported
if (typeof Storage === 'undefined') {
  alert('Your browser does not support local storage. Please use a different browser.');
}
resetBallNumber();
displayJsonList();

function addJson(run) {

  var jsonList = JSON.parse(localStorage.getItem('jsonList')) || [];

  var ball = jsonList[0].ball || 0;
  console.log(ball);
  var over = jsonList[0].over || 0;
  console.log(over);

  if (ball >= 6) {
    ball = 1;
    over = over + 1;
  } else {
    ball = ball + 1;
  }

  var json = {
    "run": run,
    "ball": ball,
    "over": over
  };

  jsonList.unshift(json);

  localStorage.setItem('jsonList', JSON.stringify(jsonList));
  displayJsonList();
}

function deleteLatestJson() {
  var jsonList = JSON.parse(localStorage.getItem('jsonList')) || [];
  var deletedJson = jsonList.shift(); // Remove the first element from the list
  localStorage.setItem('jsonList', JSON.stringify(jsonList));
  displayJsonList();
}

function displayJsonList() {
  var totalRuns = 0;
  var resetFound = false;
  var jsonList = JSON.parse(localStorage.getItem('jsonList')) || [];

  var jsonListDiv = document.getElementById('jsonList');
  jsonListDiv.innerHTML = '';

  for (var i = 0; i < jsonList.length; i++) {
    var json = jsonList[i];

    if (json.totalRuns != null) {
      var itemText = 'Total Runs: ' + json.totalRuns;
      resetFound = true;
    } else {
      var itemText = json.over + '.' + json.ball + ' ' + json.run;
      if (!resetFound) {
        totalRuns += json.run;
      }
    }
    var itemDiv = document.createElement('div');
    itemDiv.textContent = itemText;
    jsonListDiv.appendChild(itemDiv);
  }

  document.getElementById('totalRuns').textContent = totalRuns;
}

function resetBallNumber() {
  var jsonList = JSON.parse(localStorage.getItem('jsonList')) || [];
var resetFound = false;
  var totalRuns = 0;
  for (var i = 0; i < jsonList.length; i++) {
    var json = jsonList[i];

    if (json.totalRuns != null) {
      resetFound = true;
    } else {
      if (!resetFound) {
        totalRuns += json.run;
      }
    }
  }

  jsonList.unshift({
    "ball": 0,
    "over": 0,
    "totalRuns": totalRuns
  }); // Add the total runs reset point JSON at the beginning of the list
  localStorage.setItem('jsonList', JSON.stringify(jsonList));

  displayJsonList();
}

function copyScores(){
  text = '';
  for (e of document.querySelectorAll("div#jsonList > div")){text += '\n'+e.textContent;}
  navigator.clipboard.writeText(text);
}