// initialize firebase
var firebaseConfig = {
  apiKey: "AIzaSyDQA_27i_CrkxtM6I3yDu85klhn8NbCB4g",
  authDomain: "train-scheduler-cbo.firebaseapp.com",
  databaseURL: "https://train-scheduler-cbo.firebaseio.com",
  projectId: "train-scheduler-cbo",
  storageBucket: "train-scheduler-cbo.appspot.com",
  messagingSenderId: "189207594546",
  appId: "1:189207594546:web:c1ac931a8a0d0df4fcde2b"
};

firebase.initializeApp(firebaseConfig);

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
  var trainTime = $("#first-train-input")
    .val()
    .trim();
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

// create firebase event for adding train to the database and row in the html
database.ref().on("child_added", function(childSnapshot) {
  // store everything into a variable
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = parseInt(childSnapshot.val().frequency);

  // train info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(typeof trainFreq);

  // pretty train start
  var trainStartPretty = moment.unix(trainTime).format("HH:mm");

  // calculate next arrival
  // var nextTrain = moment().diff
  // console.log(nextTrain)

  // calculate minutes away
  // var minAway =
  // Assumptions
  var tFrequency = trainFreq;

  // Time is 3:30 AM
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // console.log("DIFFERENCE IN TIME: " + diffTime);
  console.log(diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFreq;
  console.log(tRemainder);

  // Minute Until Train
  var minAway = trainFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minAway);

  // Next Train
  var newTrain = moment().add(minAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(newTrain).format("hh:mm"));

  // create new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainTime),
    $("<td>").text(trainFreq),
    $("<td>").text(moment(newTrain).format("hh:mm")),
    $("<td>").text(minAway)
  );

  // append new row to table
  $("#train-table > tbody").append(newRow);
});
