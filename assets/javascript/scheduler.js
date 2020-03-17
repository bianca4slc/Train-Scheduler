// initialize firebase
// var config = {};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-button").on("click", function(event) {
  event.preventDefault();

  // grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var trainDest = $("#destination-input")
    .val()
    .trim();
  var trainTime = moment(
    $("#first-train-input")
      .val()
      .trim(),
    "HH:mm"
  ).format("x");
  var trainFreq = $("#frequency-input")
    .val()
    .trim();

  // creates local temp object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };

  // uploads train data to the database
  database.ref().push(newTrain);

  // logs to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // clear all text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// create firebase event for adding employee to the database and row in the html

// store everything into a variable
var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().destination;
var trainTime = childSnapshot.val().time;
var trainFreq = childSnapshot.val().frequency;

// train info
console.log(trainName);
console.log(trainDest);
console.log(trainTime);
console.log(trainFreq);

// pretty train start
var trainStartPretty = moment.unix(trainTime).format("HH:mm");

// calculate next arrival
// var nextTrain = moment().diff
// console.log(nextTrain)

// calculate minutes away
// var minAway =

// create new row
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDest),
  $("<td>").text(trainTime),
  $("<td>").text(trainFreq),
  $("<td>").text(nextTrain),
  $("<td>").text(minAway)
);

// append new row to table

$("#train-table > tbody").append(newRow);
