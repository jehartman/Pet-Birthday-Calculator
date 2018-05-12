// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxgAGhMI0GOA2KtwlCGvL3K7S_Mw3MazI",
    authDomain: "superduperprojectomatic.firebaseapp.com",
    databaseURL: "https://superduperprojectomatic.firebaseio.com",
    projectId: "superduperprojectomatic",
    storageBucket: "superduperprojectomatic.appspot.com",
    messagingSenderId: "401274810157"
};

firebase.initializeApp(config);
var database = firebase.database();

//set global variables
var petName;
var petType;
var lifespan = 0;
var birthday;
var nextBirthday;
var petCounter = 0;
var humanLifespan = 79;
var petAge = 0;
var humanAge = 0;
var onePetYear;
var nextDate;
var daysAway;

// stores values in database on Add a Pet click
$("#submit").on("click", function() {
    event.preventDefault();
    petCounter++;

    //captures and trims user input
    petName = $("#nameInput").val().trim();
    petType = $("#typeInput").val().trim();
    lifespan = $("#lifespanInput").val().trim();
    birthday = $("#date").val().trim();
    birthdayParse = moment(birthday).format('MM-DD-YYYY');

    timeCalculation();

    //pushes user inputs to db
    database.ref().push({
        petName: petName,
        petType: petType,
        birthdayParse: birthdayParse,
        lifespan: lifespan,
        nextBirthday: nextBirthday,
        daysAway: daysAway,
        petAge: petAge,
        humanAge: humanAge,
        onePetYear: onePetYear,
        nextDate: nextDate
    });
});

//takes a snapshot of database variables on value change and stores them in the global variables for each
database.ref().on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        petName = (childSnapshot.val().petName);
        petType = (childSnapshot.val().petType);
        birthdayParse = (childSnapshot.val().birthdayParse);
        lifespan = (childSnapshot.val().lifespan);
        nextBirthday = (childSnapshot.val().nextBirthday);
        daysAway = (childSnapshot.val().daysAway);
        petAge = (childSnapshot.val().petAge);
        humanAge = (childSnapshot.val().humanAge);
        onePetYear = (childSnapshot.val().onePetYear);
        nextDate = (childSnapshot.val().nextDate);
    });
});

//updates hmtl on db child-added
database.ref().on("child_added", function(childsnap) {
    if (petCounter > 0) {
        var petNameId = "id='" + petName + petCounter + "'";
        var petTypeId = "id='" + petType + petCounter + "'";
        var lifespanId = "id='" + lifespan + petCounter + "'";
        var birthdayParseId = "id='" + birthdayParse + petCounter + "'";
        var humanAgeId = "'id='" + humanAge + petCounter + "'";
        var petAgeId = "'id='" + petAge + petCounter + "'";
        var onePetYearId = "'id='" + onePetYear + petCounter + "'";
        var nextDateId = "id='" + nextDate + petCounter + "'";
        var daysAwayId = "id='" + daysAway + petCounter + "'";

        $("#petTable").append(
            "<tr><td " + petNameId + '>' + petName + '</><td ' +
            petTypeId + '>' + petType + '</><td ' +
            lifespanId + '>' + lifespan + '</><td ' +
            birthdayParseId + '>' + birthdayParse + '</><td ' +
            humanAgeId + '>' + humanAge + '</><td ' +
            petAgeId + '>' + petAge + '</><td ' +
            onePetYearId + '>' + onePetYear + ' days</><td ' +
            nextDateId + '>' + nextDate + '</><td ' +
            daysAwayId + '>' + Math.round(daysAway) + ' days</td></tr>');

        petName = (childsnap.val().petName);
        petType = (childsnap.val().petType);
        birthdayParse = (childsnap.val().birthdayParse);
        lifespan = (childsnap.val().lifespan);
        nextBirthday = (childsnap.val().nextBirthday);
        daysAway = (childsnap.val().daysAway);
    }
});

//empties the database and uses the default button refresh to clear page
$("#destroy").on("click", function() {
    event.preventDefault();
    database.ref().remove();
    $("#bannerLeft").css("background-image", "url('./assets/images/petsyellowblackbig.png')");
    console.log('destroyed');
    setTimeout(function() {
        $("#bannerLeft").css("background-image", "url('./assets/images/petsSmaller.png'");
    }, 500);
    setTimeout(function() {
        location.reload();
    }, 500);
});

function timeCalculation() {
    var today = moment();
    var bday = moment(birthdayParse);
    var intervalSinceBirth = Math.abs(bday.diff(today));
    var petYPerHumanY = lifespan / humanLifespan;
    onePetYear = Math.round(365 * petYPerHumanY);
    var sinceLastBirthday = moment.duration(intervalSinceBirth).asDays() % onePetYear;
    humanAge = Math.floor(moment.duration(intervalSinceBirth).asYears());
    petAge = Math.floor((moment.duration(intervalSinceBirth).asYears()) / petYPerHumanY);
    daysAway = onePetYear - sinceLastBirthday;
    nextBirthday = today + moment.duration(daysAway, 'days');
    nextDate = moment(nextBirthday).format('MM-DD-YYYY');
}