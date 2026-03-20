// script.js

// --- PAGE ACCUEIL ---
function enterSmash(){document.getElementById("homePage").classList.add("hidden"); document.getElementById("appPage").classList.remove("hidden")}
function enterMatch(){document.getElementById("homePage").classList.add("hidden"); document.getElementById("matchPage").classList.remove("hidden")}

// --- PAGE SMASH ---
let score=0; let smashHistory=[]; const maxSmash=10; let stats={firstCord:0, secondCord:0, beforeFirst:0};

function addPoints(points){
  if(smashHistory.length>=maxSmash){alert("Les 10 smashs sont déjà réalisés"); return}
  smashHistory.push(points); score+=points
  if(points===100) stats.secondCord++
  else if(points===10) stats.firstCord++
  else if(points===1) stats.beforeFirst++
  updateDisplay()
}

function undo(){
  if(smashHistory.length===0) return
  let last=smashHistory.pop(); score-=last
  if(last===100) stats.secondCord--
  else if(last===10) stats.firstCord--
  else if(last===1) stats.beforeFirst--
  updateDisplay()
}

function resetScore(){score=0; smashHistory=[]; stats={firstCord:0, secondCord:0, beforeFirst:0}; updateDisplay()}

function updateDisplay(){
  document.getElementById("score").innerText=score
  let remaining=maxSmash-smashHistory.length
  document.getElementById("remaining").innerText=remaining
  let progress=(smashHistory.length/maxSmash)*100
  document.getElementById("progress").style.width=progress+"%"

  let scoreElement=document.getElementById("score")
  if(smashHistory.length===maxSmash){
    if(score>600) scoreElement.className="text-6xl md:text-7xl font-bold text-green-600"
    else if(score>=300) scoreElement.className="text-6xl md:text-7xl font-bold text-orange-500"
    else scoreElement.className="text-6xl md:text-7xl font-bold text-red-600"
  } else {scoreElement.className="text-6xl md:text-7xl font-bold text-blue-600"}

  const totalHits=smashHistory.length
  const successfulSmash=smashHistory.filter(p=>p>0).length
  const rate=totalHits===0?0:Math.round((successfulSmash/totalHits)*100)

  document.getElementById("totalHits").innerText=totalHits
  document.getElementById("successfulSmash").innerText=successfulSmash
  document.getElementById("firstCord").innerText=stats.firstCord
  document.getElementById("secondCord").innerText=stats.secondCord
  document.getElementById("beforeFirst").innerText=stats.beforeFirst
  document.getElementById("successRate").innerText=rate+"%"
}

// --- PAGE MATCH ---
let playerScore={player1:0, player2:0}; let playerSmash={player1:0, player2:0};

function addPoint(player){playerScore[player]++; checkWinner(player); updateMatchDisplay();}
function addSmash(player){playerSmash[player]++; checkWinner(player); updateMatchDisplay();}

function checkWinner(player){
  if(playerScore[player]>=7 || playerSmash[player]>=2){
    const winnerDiv=document.getElementById("winnerDisplay"); winnerDiv.innerText="🏆 "+player+" a gagné !"; winnerDiv.classList.remove("hidden"); disableMatchButtons()
  }
}

function disableMatchButtons(){
  const buttons=document.querySelectorAll("#matchPage button")
  buttons.forEach(btn=>{if(!btn.innerText.includes("Accueil")&&!btn.innerText.includes("Réinitialiser")){btn.disabled=true; btn.classList.add("opacity-50","cursor-not-allowed")}})
}

function updateMatchDisplay(){
  document.getElementById("player1Score").innerText=playerScore.player1
  document.getElementById("player2Score").innerText=playerScore.player2
  document.getElementById("player1Smash").innerText=playerSmash.player1
  document.getElementById("player2Smash").innerText=playerSmash.player2
}

function resetMatch(){
  playerScore={player1:0, player2:0}; playerSmash={player1:0, player2:0}
  updateMatchDisplay()
  document.getElementById("winnerDisplay").classList.add("hidden")
  const buttons=document.querySelectorAll("#matchPage button")
  buttons.forEach(btn=>{btn.disabled=false; btn.classList.remove("opacity-50","cursor-not-allowed")})
}

function goHome(){
  document.getElementById("appPage").classList.add("hidden")
  document.getElementById("matchPage").classList.add("hidden")
  document.getElementById("homePage").classList.remove("hidden")
}
