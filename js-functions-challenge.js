var gameInfo = function(){
  return [
   {
     home_team: "Patriots",
     away_team: "Broncos",
     home_score: 7,
     away_score: 3
   },
   {
     home_team: "Broncos",
     away_team: "Colts",
     home_score: 3,
     away_score: 0
   },
   {
     home_team: "Patriots",
     away_team: "Colts",
     home_score: 11,
     away_score: 7
   },
   {
     home_team: "Steelers",
     away_team: "Patriots",
     home_score: 7,
     away_score: 21
   }
 ]
}

var teamConstructor;
var teams;
var teamNames;
var ratios;
var sortedRatios;
var sortedTeams;


teamConstructor = function(teamName){
  var team = {
    teamName : teamName,
    wins : 0,
    losses : 0,
    rank : 0,
    ratio : 0,
    addWin : function() {
      this.wins += 1;
    },
    addLoss : function() {
      this.losses += 1;
    },
    determineRatio : function() {
      this.ratio = ((this.wins + 1) / (this.losses + 1));
    },
    setRank : function(num) {
      this.rank = num;
    },
    summary : function() {
      console.log("The " + this.teamName + " are ranked no. " + this.rank +
      " in the league with " + this.wins + " wins and " + this.losses + " losses.");
      console.log("Games Played:");
      for (var i = 0; i < gameInfo().length; i++) {
        var homeTeam = gameInfo()[i].home_team;
        var awayTeam = gameInfo()[i].away_team;
        if ((homeTeam == this.teamName) || (awayTeam == this.teamName)) {
          console.log ("- " + gameInfo()[i].away_team + " " + gameInfo()[i].away_score + " @ " +
          gameInfo()[i].home_team + " " + gameInfo()[i].home_score);
        }
      }
      console.log("\n");
    }
  }
  return team;
}

teams = [];
teamNames = [];

for (var i = 0; i < gameInfo().length; i++) {
  var homeTeam = gameInfo()[i].home_team;
  var awayTeam = gameInfo()[i].away_team;
  if (teamNames.indexOf(homeTeam) == -1) {
    var newTeam = teamConstructor(homeTeam);
    teamNames.push(homeTeam);
    teams.push(newTeam);
  };
  if (teamNames.indexOf(awayTeam) == -1) {
    var newTeam = teamConstructor(awayTeam);
    teamNames.push(awayTeam);
    teams.push(newTeam);
  };
};

for (var i = 0; i < gameInfo().length; i++) {
  var homeIndex = teamNames.indexOf(gameInfo()[i].home_team);
  var awayIndex = teamNames.indexOf(gameInfo()[i].away_team);
  if (gameInfo()[i].home_score > gameInfo()[i].away_score) {
    teams[homeIndex].addWin();
    teams[awayIndex].addLoss();
  }
  else {
    teams[homeIndex].addLoss();
    teams[awayIndex].addWin();
  }
}

ratios = [];
for (var i = 0; i < teams.length; i++) {
  teams[i].determineRatio();
  ratios.push(teams[i].ratio);
}

sortedRatios = ratios.sort().reverse();

sortedTeams = []
for (var i = 0; i < sortedRatios.length; i++) {
  for (var j = 0; j < teams.length; j++) {
    if (teams[j].ratio == sortedRatios[i]) {
      teams[j].setRank(i + 1);
      sortedTeams.push(teams[j])
    }
  }
}

console.log("--------------------------------------------------");
console.log("| Name      Rank      Total Wins    Total Losses |");
for (var i = 0; i < sortedTeams.length; i++) {
  var spacesNeeded = 10 - sortedTeams[i].teamName.length;
  var spaces = "";
  for (var j = 0; j < spacesNeeded; j++) {
    spaces = spaces.concat(" ");
  }
  console.log("| " + sortedTeams[i].teamName + spaces + sortedTeams[i].rank +
  "         " + sortedTeams[i].wins + "             " + sortedTeams[i].losses + "            |");
}
console.log("--------------------------------------------------");
console.log("\n")

for (var i = 0; i < sortedTeams.length; i++) {
  sortedTeams[i].summary();
}
