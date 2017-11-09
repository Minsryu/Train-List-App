$(document).ready(function() {

  var config = {
	    apiKey: "AIzaSyDbjKOtSlUj-6UpMuZZW0XC_0GF_e-WN4w",
	    authDomain: "in-class-demo-min.firebaseapp.com",
	    databaseURL: "https://in-class-demo-min.firebaseio.com",
	    projectId: "in-class-demo-min",
	    storageBucket: "in-class-demo-min.appspot.com",
	    messagingSenderId: "594198822166"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit-btn").on("click", function(){

    	event.preventDefault();

    	console.log($("#input-train").val());
    	console.log($("#input-destination").val());
    	console.log($("#input-time").val());
    	console.log($("#input-frequency").val());


    	database.ref("/train").push({

    		train_name: $("#input-train").val(),
    		destination: $("#input-destination").val(),
    		time: $("#input-time").val(),
    		frequency: $("#input-frequency").val()

    	});

    });

    database.ref("/train").on("child_added",function(snapshot){

    	var frequency = snapshot.val().frequency;
        var firstTime = moment(snapshot.val().time,"hh:mm").subtract(1,"years");
        var diffTime = moment().diff(firstTime, "minutes")
        var remainder = diffTime%frequency;
        var tillTrain = frequency - remainder;
        var nextTrain = moment().add(tillTrain,"minutes").format("hh:mm");

        var newrow = $("<tr>");
    	var tr1 = $("<td>")
    	var tr2 = $("<td>")
    	var tr3 = $("<td>")
    	var tr4 = $("<td>")
    	var tr5 = $("<td>")

    	tr1.append(snapshot.val().train_name);
    	tr2.append(snapshot.val().destination);
    	tr3.append(snapshot.val().frequency);
    	tr4.append(nextTrain);
    	tr5.append(tillTrain);

    	newrow.append(tr1, tr2, tr3, tr4, tr5);

    	$("#train-schedule").append(newrow);

    });

    console.log(moment().format("HH:mm"));

    function convertTime (time){

    	var time = time.split(":")
    	console.log(time);
    	var hours = parseInt(time[0]);
    	var minutes = parseInt(time[1]);
    	console.log(hours);
    	console.log(minutes);
    	minutes

    };

    convertTime("10:30");


});