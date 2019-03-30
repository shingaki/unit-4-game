$(document).ready(function() {

    var characterID = -1;
    var defenderID = -1;
    var gameRound = 0;
    var gameOver = false;


   // check to xee if the first player was chosen for the character




        var players =
            {
                name: ["Katniss", "Peeta", "Snow", "Haymitch"],
                image: ["katniss.png", "peeta.png", "snow.png", "haymitch.png"],
                origHealthPoints: [108, 112, 142, 130],
                currentPoints: [108, 112, 142, 130],
                currentState: ["P", "P", "P", "P"],
                attackPower: [8, 10, 12, 14],
                counterAttackPower: [10, 20, 30, 40]
            };

// currentStatus
    // P = Player (beginning of game)
    // C = Character
    // D = Defender
    // L = Loser
    // E = Enemy Available to Fight




function gameStart() {

    $("#restart").hide();


    $("#row-four").text("");
    $("#row-five").text("");
    $("#row-six").text("");

    $("#row-one").empty();


    for (var i = 0; players.name.length > i; i++) {

        var charDiv = $("<div>");

        // charDiv.attr("id", "player-" + i);
        charDiv.attr("id", players.name[i]);

        charDiv.addClass("col-sm-3 player-img-border text-center");

        buildCharacterDiv(charDiv,i);

        $("#row-one").append(charDiv);



    }

    for (var j = 0; players.name.length > j; j++) {
        $("#"+players.name[j]).on("click", function () {
            myCharacter(this);

        });
    }

    $("#attack").on("click", function() {
        //alert("Click the attack button");


        attackEnemy();
    })

}

        function buildCharacterDiv(theDiv,i)
        {

            var playerName = $("<div>");

            playerName.addClass("text-1");

            playerName.text(players.name[i]);

            var charImage = $("<img>");

            charImage.addClass("player-image-1");

            charImage.attr("src", "./assets/images/" + players.image[i]);

            var healthPointsRow = $("<div>");

            healthPointsRow.addClass("row text-1")

            var healthPointsCol = $("<div>");
            healthPointsCol.attr("id", "healthPoints" + [i]);

            healthPointsCol.addClass("col-sm-12 bottomcenter-1");

            healthPointsCol.text(players.origHealthPoints[i]);

            healthPointsRow.append(healthPointsCol);

            theDiv.append(playerName);

            theDiv.append(charImage);

            theDiv.append(healthPointsRow);
        }


gameStart();

// for (var j = 0; players.name.length > j; j++) {
//     $("#"+players.name[j]).on("click", function () {
//         myCharacter(this);
//
//     });
// }


//
function myCharacter(myChar) {
    // alert($(myChar).attr("id"));

    for (var i = 0; players.name.length > i; i++) {

        if (players.name[i] === $(myChar).attr("id")) {
            players.currentState[i] = 'C';

            characterID = i;

            //alert("This player's current state: " + players.currentState[i]);
        }
        //$("#"+myChar).off("click");

    }

    buildMyCharacter();
    buildAvailableEnemies();
    // buildMyDefender();

    // for (var j = 0; players.name.length > j; j++) {
    //
    //     alert("YET ANOTHER ALERT");
    //
    //     alert($("#e-"+players.name[j]).attr("id"));
    //
    //     $("#e-"+players.name[j]).on("click", function () {
    //         //alert($(this).attr("id"));
    //
    //         myEnemy(this);
    //         buildAvailableEnemies();
    //
    //
    //         $("#attack").on("click", function() {
    //             //alert("Click the attack button");
    //
    //             attackEnemy();
    //         })
    //
    //     });
    //}
    // buildMyDefender();

}

function buildAvailableEnemies() {

    //alert('Calling BuildAvailableEnemies');
    $("#row-two").empty();

    for (var i = 0; players.name.length > i; i++) {

        if (players.currentState[i] === "P")
        {

            // alert ("in the if statement");
            var charDiv = $("<div>");

            // charDiv.attr("id", "player-" + i);
            charDiv.attr("id", "e-"+players.name[i]);

            charDiv.addClass("col-sm-3 player-img-border text-center");


            //alert("Did it work?");
            buildCharacterDiv(charDiv,i);
            //alert("Yes!!!!!");

            $("#row-two").append(charDiv);

        }

        }
    for (var j = 0; players.name.length > j; j++) {

        $("#e-"+players.name[j]).on("click", function () {

            myEnemy(this);
            buildAvailableEnemies();


        });


    };
}



//
        function myEnemy(theEnemy) {
            //alert($(theEnemy).attr("id"));
            $("#row-six").text("");


            for (var i = 0; players.name.length > i; i++) {

                if ("e-" +players.name[i] === $(theEnemy).attr("id")) {
                    players.currentState[i] = 'D';

                    //alert("This player's current state: " + players.currentState[i]);
                    buildMyDefender();

                    defenderID = i;
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

                        buildCharacterDiv(charDiv, i);

                        $("#row-one").append(charDiv);
                    }
                }
        }

        function buildMyDefender() {

            $("#row-three").empty();

            // alert("Build Defender");

            for (var i = 0; players.name.length > i; i++)
            {
                //alert("Defender loop - Current State = " + players.currentState[i] + " " + i);

                if (players.currentState[i] === "D")
                {
                    // alert ("in the if statement");
                    var charDiv = $("<div>");

                    // charDiv.attr("id", "player-" + i);
                    charDiv.attr("id", "d-"+players.name[i]);

                    charDiv.addClass("col-sm-3 player-img-border text-center");

                    // charDiv.attr("onClick", chooseCharacter(this));

                    buildCharacterDiv(charDiv, i);

                    $("#row-three").append(charDiv);
                }
            }
        }

        function attackEnemy() {


            var gameRoundOver = false;
            if (gameOver) {
                console.log("Game is over");
            }
            else if (defenderID < 0){
                alert("Please choose a defender");
            }
            else {
                gameRound++;
                console.log("Another around" + gameRound);
                players.currentPoints[characterID] -= players.counterAttackPower[defenderID];
                players.currentPoints[defenderID] -= players.attackPower[characterID] * gameRound;
                $("#healthPoints" + defenderID).text(players.currentPoints[defenderID]);
                $("#healthPoints" + characterID).text(players.currentPoints[characterID]);
                //console.log("character=" + players.currentPoints[characterID]);
                $("#row-four").text("You attacked " + players.name[defenderID] +" for " + players.currentPoints[characterID] + " damage.");
                $("#row-five").text(players.name[defenderID] + " attacked you back for " + players.currentPoints[defenderID] + " damage.");
                //console.log("defender=" + players.currentPoints[defenderID]);

                if (players.currentPoints[defenderID] <= 0) {
                    //alert("defender is out!!!!")
                    players.currentState[defenderID] = "L";
                    players.currentPoints[characterID] = players.origHealthPoints[characterID]
                    gameRoundOver = true;
                    gameOver = anyEnemiesAvailable();

                } else {

                    if (players.currentPoints[characterID] <= 0) {
                        alert("Character  is out!!!!")
                        players.currentState[characterID] = "L";
                        gameRoundOver = true;
                        gameOver = true;
                    }
                }
                if (gameOver === true) {
                        $("#attack").hide();
                        $("#row-four").text("");
                        $("#row-five").text("");
                        $("#row-six").text("You defeat all enemies");

                        $("#restart").show();

                        $("#restart").on("click", function() {
                            //alert("Click the attack button");
                            location.reload(true);
                            //gameStart();
                        })

                    buildMyDefender();

                }
                else {
                    if (gameRoundOver === true) {
                        $("#row-four").text("");
                        $("#row-five").text("");
                        $("#row-six").text("You have defeated " + players.name[defenderID] + ", you can choose to fight another enemy.");
                        defenderID = -1;
                        buildMyDefender();



                    }
                }
            }

        }
function anyEnemiesAvailable()
{
    moreEnemies = true;
    for (var i = 0; players.name.length > i; i++)
    {

        if (players.currentState[i] === "P")
        {
           moreEnemies = false;
        }
    }
    return moreEnemies;
}







}
);



