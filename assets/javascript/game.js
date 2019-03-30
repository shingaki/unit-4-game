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



// set all characters to start the game
// initialize all message areas
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


        function myCharacter(myChar) {
            for (var i = 0; players.name.length > i; i++) {
                if (players.name[i] === $(myChar).attr("id")) {
                    players.currentState[i] = 'C';
                    characterID = i;
                }
            }
            buildMyCharacter();
            buildAvailableEnemies();
        }

        function buildAvailableEnemies() {
            $("#row-two").empty();
            for (var i = 0; players.name.length > i; i++) {
                if (players.currentState[i] === "P") {
                    var charDiv = $("<div>");
                    charDiv.attr("id", "e-" + players.name[i]);
                    charDiv.addClass("col-sm-3 player-img-border text-center");
                    buildCharacterDiv(charDiv, i);
                    $("#row-two").append(charDiv);
                }
            }


            for (var j = 0; players.name.length > j; j++) {
                $("#e-" + players.name[j]).on("click", function () {
                    if (defenderID < 0) {
                        myEnemy(this);
                        buildAvailableEnemies();
                        //$("#e-"+players.name[j]).unbind("click");
                    }
                });
            };

        }



//
        function myEnemy(theEnemy) {
            $("#row-six").text("");
            for (var i = 0; players.name.length > i; i++) {
                if ("e-" +players.name[i] === $(theEnemy).attr("id")) {
                    players.currentState[i] = 'D';
                    buildMyDefender();
                    defenderID = i;
                    $("#row-four").text("");
                    $("#row-five").text("");
                    $("#row-six").text("");
                }
            }
        }


        function buildMyCharacter() {
            $("#row-one").empty();
            $("#all-characters").text("");
            $("#your-character").text("Your Character");

            for (var i = 0; players.name.length > i; i++)
            {
                if (players.currentState[i] === "C")
                {
                    var charDiv = $("<div>");
                    charDiv.attr("id", "c-"+players.name[i]);
                    charDiv.addClass("col-sm-3 player-img-border text-center");
                    buildCharacterDiv(charDiv, i);
                    $("#row-one").append(charDiv);
                }
            }
        }

        function buildMyDefender() {

            $("#row-three").empty();
            for (var i = 0; players.name.length > i; i++)
            {
                if (players.currentState[i] === "D")
                {
                    var charDiv = $("<div>");
                    charDiv.attr("id", "d-"+players.name[i]);
                    charDiv.addClass("col-sm-3 player-img-border text-center");
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
                $("#row-four").text("Please choose another defender!");
                $("#row-five").text("");
                $("#row-six").text("");
            }
            else {
                gameRound++;
                console.log("Another around" + gameRound);
                players.currentPoints[characterID] -= players.counterAttackPower[defenderID];
                players.currentPoints[defenderID] -= players.attackPower[characterID] * gameRound;
                $("#healthPoints" + defenderID).text(players.currentPoints[defenderID]);
                $("#healthPoints" + characterID).text(players.currentPoints[characterID]);
                //console.log("character=" + players.currentPoints[characterID]);
                $("#row-four").text("You attacked " + players.name[defenderID] +" for " + players.attackPower[characterID] * gameRound + " damage.");
                $("#row-five").text(players.name[defenderID] + " attacked you back for " + players.counterAttackPower[defenderID] + " damage.");
                console.log("character points =" + players.currentPoints[characterID]);
                console.log("defender points =" + players.currentPoints[defenderID]);

                if (players.currentPoints[defenderID] <= 0 && players.currentPoints[defenderID] < players.currentPoints[characterID]) {
                    players.currentState[defenderID] = "L";
                    players.currentPoints[characterID] = players.origHealthPoints[characterID];
                    $("#healthPoints" + characterID).text(players.currentPoints[characterID]);
                    gameRoundOver = true;
                    gameOver = anyEnemiesAvailable();

                } else {

                    if (players.currentPoints[characterID] <= 0 && players.currentPoints[characterID] < players.currentPoints[defenderID]) {
                        players.currentState[characterID] = "L";
                        gameRoundOver = true;
                        gameOver = true;
                    }
                }
                if (gameOver === true) {
                    $("#attack").hide();
                    $("#row-four").text("");
                    $("#row-five").text("");
                    console.log("character = " + players.currentState[characterID]);
                    console.log("defender = " + players.currentState[defenderID]);
                    if(players.currentState[characterID] === "L")
                    {
                        $("#row-six").text(players.name[defenderID]+" Won!!!! GAME OVER!!!");
                    }
                    else
                    {
                        $("#row-six").text(players.name[characterID]+", You Won!!!! GAME OVER!!!");
                    }


                    $("#restart").show();

                    $("#restart").on("click", function() {
                        location.reload(true);
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



