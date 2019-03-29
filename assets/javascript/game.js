$(document).ready(function() {

    var playerCharacter;

   // check to xee if the first player was chosen for the character




        var players =
            {
                name: ["Katniss", "Peeta", "Snow", "Haymitch"],
                image: ["katniss.png", "peeta.png", "snow.png", "haymitch.png"],
                origHealthPoints: [108, 112, 142, 130],
                currentPoints: [108, 112, 142, 130],
                currentState: ["P", "P", "P", "P"]
            };

// currentStatus
    // P = Player (beginning of game)
    // C = Character
    // D = Defender
    // L = Loser
    // E = Enemy Available to Fight

function gameStart() {

    for (var i = 0; players.name.length > i; i++) {

        var charDiv = $("<div>");

        // charDiv.attr("id", "player-" + i);
        charDiv.attr("id", players.name[i]);

        charDiv.addClass("col-sm-3 player-img-border text-center");

        // charDiv.attr("onClick", chooseCharacter(this));

        var playerName = $("<div>");

        playerName.addClass("text-1");

        playerName.text(players.name[i]);

        var charImage = $("<img>");

        charImage.addClass("player-image-1");

        charImage.attr("src", "./assets/images/" + players.image[i]);

        var healthPointsRow = $("<div>");

        healthPointsRow.addClass("row text-1")

        var healthPointsCol = $("<div>");

        healthPointsCol.addClass("col-sm-12 bottomcenter-1");

        healthPointsCol.text(players.origHealthPoints[i]);

        healthPointsRow.append(healthPointsCol);

        charDiv.append(playerName);

        charDiv.append(charImage);

        charDiv.append(healthPointsRow);

        $("#row-one").append(charDiv);

    }

}




gameStart();

for (var j = 0; players.name.length > j; j++) {
    $("#"+players.name[j]).on("click", function () {
        // alert($(this).attr("id"));

        myCharacter(this);

    });
}


//
function myCharacter(myChar) {
    // alert($(myChar).attr("id"));

    for (var i = 0; players.name.length > i; i++) {

        if (players.name[i] === $(myChar).attr("id")) {
            players.currentState[i] = 'C';

            alert("This player's current state: " + players.currentState[i]);
        }

    }

    buildMyCharacter();
    buildAvailableEnemies();

    for (var j = 0; players.name.length > j; j++) {

        // alert("YET ANOTHER ALERT");

        // alert($("#e-"+players.name[j]).attr("id"));

        $("#e-"+players.name[j]).on("click", function () {
            alert($(this).attr("id"));

            myEnemy(this);

        });
    }


}

function buildAvailableEnemies() {

    alert('Calling BuildAvailableFunction');

    for (var i = 0; players.name.length > i; i++) {

        if (players.currentState[i] === "P")
        {

            // alert ("in the if statement");
            var charDiv = $("<div>");

            // charDiv.attr("id", "player-" + i);
            charDiv.attr("id", "e-"+players.name[i]);

            charDiv.addClass("col-sm-3 player-img-border text-center");

            // charDiv.attr("onClick", chooseCharacter(this));

            var playerName = $("<div>");

            playerName.addClass("text-1");

            playerName.text(players.name[i]);

            var charImage = $("<img>");

            charImage.addClass("player-image-1");

            charImage.attr("src", "./assets/images/" + players.image[i]);

            var healthPointsRow = $("<div>");

            healthPointsRow.addClass("row text-1")

            var healthPointsCol = $("<div>");

            healthPointsCol.addClass("col-sm-12 bottomcenter-1");

            healthPointsCol.text(players.origHealthPoints[i]);

            healthPointsRow.append(healthPointsCol);

            charDiv.append(playerName);

            charDiv.append(charImage);

            charDiv.append(healthPointsRow);

            $("#row-two").append(charDiv);

        }

        }




}

        // for (var j = 0; players.name.length > j; j++) {
        //
        //     $("#e-"+players.name[j]).on("click", function () {
        //         alert($(this).attr("id"));
        //
        //         myEnemy(this);
        //
        //     });
        // }


//
        function myEnemy(theEnemy) {
            alert($(theEnemy).attr("id"));

            for (var i = 0; players.name.length > i; i++) {

                if ("e-" +players.name[i] === $(theEnemy).attr("id")) {
                    players.currentState[i] = 'D';

                    alert("This player's current state: " + players.currentState[i]);
                }

            }



        }


        function buildMyCharacter() {

                $("#row-one").empty();
                $("#all-characters").text("");
                $("#your-character").text("Your Character");

                for (var i = 0; players.name.length > i; i++)
                {
                    // alert("Current State = " + players.currentState[i] + " " + i);

                    if (players.currentState[i] === "C")
                    {
                        // alert ("in the if statement");
                        var charDiv = $("<div>");

                        // charDiv.attr("id", "player-" + i);
                        charDiv.attr("id", "c-"+players.name[i]);

                        charDiv.addClass("col-sm-3 player-img-border text-center");

                        // charDiv.attr("onClick", chooseCharacter(this));

                        var playerName = $("<div>");

                        playerName.addClass("text-1");

                        playerName.text(players.name[i]);

                        var charImage = $("<img>");

                        charImage.addClass("player-image-1");

                        charImage.attr("src", "./assets/images/" + players.image[i]);

                        var healthPointsRow = $("<div>");

                        healthPointsRow.addClass("row text-1")

                        var healthPointsCol = $("<div>");

                        healthPointsCol.addClass("col-sm-12 bottomcenter-1");

                        healthPointsCol.text(players.origHealthPoints[i]);

                        healthPointsRow.append(healthPointsCol);

                        charDiv.append(playerName);

                        charDiv.append(charImage);

                        charDiv.append(healthPointsRow);

                        $("#row-one").append(charDiv);
                    }
                }
        }




}
);



