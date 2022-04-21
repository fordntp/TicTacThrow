const ref = firebase.database().ref('Game');


firebase.auth().onAuthStateChanged((user) => {
    console.log('User: ',user);
    setupUI(user);
});


function setupUI(user){
    if (user) {
        joinGame();
    } 
    else {
    }
}

ref.on('value', snapshot => {
    getGameInfo(snapshot);
})

function joinGame(event){
    const currentUser = firebase.auth().currentUser;
    console.log('[Join] Current user:', currentUser);
    var playerX = document.getElementById(`user-name-x`).innerText;
    console.log('1111')
    if(currentUser){
        ref.once("value")
            .then(function(snapshot) {
            var room = snapshot.child("game-1/room-state").val();
            console.log(room)
        if(room == null){
            let tmpID = `user-x-id`;
            let tmpEmail =  `user-x-email`;
            let roomState = `room-state`
            let tmpImg = `user-x-img`
            ref.child('game-1').update({
                [tmpID]: currentUser.uid,
                [tmpEmail]: currentUser.email,
                [tmpImg]:currentUser.photoURL,
                [roomState]: 1,
            });
            console.log(currentUser.email+' added.');
        }
        else if(room == 1){
            let tmpID = `user-o-id`;
            let tmpEmail =  `user-o-email`;
            let roomState = `room-state`
            let tmpImg = `user-o-img`
            ref.child('game-1').update({
                [tmpID]: currentUser.uid,
                [tmpEmail]: currentUser.email,
                [tmpImg]:currentUser.photoURL,
                [roomState]: 2,
            });
            console.log(currentUser.email+' added.');
        }
        ref.once("value")
            .then(function(snapshot) {
            var usero = snapshot.child("game-1/user-o-email").val();
            var userx = snapshot.child("game-1/user-x-email").val();
            var imgX = snapshot.child("game-1/user-x-img").val();
            var imgO = snapshot.child("game-1/user-o-img").val();

            document.querySelector('#user-name-x').innerHTML = userx;
            document.querySelector('#user-name-o').innerHTML = usero;
            document.querySelector('#user-profile-x').innerHTML = `<img src="${imgX}" class="display-img1" id="profile-img" ></img>`;
            document.querySelector('#user-profile-o').innerHTML = `<img src="${imgO}" class="display-img2" id="profile-img" ></img>`;
            });
        })
    }
}



//random

let randomImg;
var numbers = ['gun-h','gun-p','gun-s'];
  function generateNumber() {
  var duration = 2000;

  var output = $('#output'); // Start ID with letter
  var started = new Date().getTime();
  randomImg = numbers[Math.floor(Math.random()*numbers.length)]

  animationTimer = setInterval(function() {
    if (new Date().getTime() - started > duration) {
      clearInterval(animationTimer); // Stop the loop
      output.html(`<img id="gun" src='assets/${randomImg}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
        max-height: 6.2vw;margin-left:18vw";> `);
      clearInterval(animationTimer); // Stop the loop
    } else {
        output.html(`<img id="gun" src='assets/${numbers[Math.floor(Math.random()*numbers.length)]}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
          max-height: 6.2vw;margin-left:18vw;"> `);
    }
    
  }, 100);
}

generateNumber(0);

//arrow fucntion
    let click_left = 0;
    let click_right = 0;
    function left(){
        if(click_left = 1){
            document.getElementById('gun').style.marginLeft = '4.5vw';
            click_left = 0;
        }
        if(click_right == 1){
            document.getElementById('gun').style.marginLeft = '18vw';
            click_right = 0;
            click_left = 0;
        }
        document.getElementById('gun').style.transitionDuration = "0.3s";
        document.getElementById('gun').webkitTransitionTimingFunction = "ease-out";
        click_left++;
    }


    function right(){
        if(click_right = 1){
            document.getElementById('gun').style.marginLeft = '30vw';
            click_right = 0;
        }
        if(click_left == 1){
            document.getElementById('gun').style.marginLeft = '18vw';
            click_right = 0;
            click_left = 0;
        }
        document.getElementById('gun').style.transitionDuration = "0.3s";
        document.getElementById('gun').webkitTransitionTimingFunction = "ease-out";
        click_right++;
    }

//Hold Events

//Select Column Function

var gunPosit = 18;

function selectCol(){
    gunPosit = parseInt(document.getElementById('gun').style.marginLeft);
    console.log(gunPosit)

    if(gunPosit == 4){
        console.log('Col1');
    }
    if(gunPosit == 18){
        console.log('Col2');
    }
    if(gunPosit == 30){
        console.log('Col3');
    }
    return gunPosit;
}

$(document).bind("contextmenu",function(e){
    return false;
      });

let mouseState = 0;

const btnHold = document.querySelectorAll('.holdbutt');
btnHold.forEach((btnHold) => btnHold.addEventListener('mousedown', charge));

var timer = 0,
    timerInterval;

const btnUp = document.querySelectorAll('.holdbutt');
btnUp.forEach((btnUp) => btnUp.addEventListener('mouseup', release));

var powerValue = 0;

function NextGenerate() {
    var duration = 2000;
  
    var output = $('#output'); // Start ID with letter
    var started = new Date().getTime();
    randomImg = numbers[Math.floor(Math.random()*numbers.length)]
  
    animationTimer = setInterval(function() {
      if (new Date().getTime() - started > duration) {
        clearInterval(animationTimer); // Stop the loop
        output.html(`<img id="gun" src='assets/${randomImg}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
          max-height: 6.2vw;margin-left:${document.getElementById('gun').style.marginLeft};"> `);
        clearInterval(animationTimer); // Stop the loop
      } else {
          output.html(`<img id="gun" src='assets/${numbers[Math.floor(Math.random()*numbers.length)]}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
            max-height: 6.2vw;margin-left:${document.getElementById('gun').style.marginLeft};"> `);
      }
      
    }, 100);
  }

function charge(event){
    const btnJoinID = event.currentTarget.getAttribute("id");
    const player = btnJoinID[btnJoinID.length - 1];
    let heightbar =  document.getElementById(`hold-${player}`);
    var startTime = new Date().getTime();
    var round = 0;
    timerInterval = setInterval(function(){
            for (let i = -2.3; i < (new Date().getTime()/1000 - startTime/1000) ; i++) {
                    if(round == 0) {
                        timer += 1;
                    }
                    if((timer/100) == 2.99){
                        round = 2;
                    }
                    if(round == 2){
                        timer -= 1;
                    }
                    if(timer == 0){
                        round = 0;
                    }
                    powerValue = document.querySelector(`.power-${player}`).offsetHeight;
                    console.log('timer-Plus: ' + (parseInt(timer/100) % 3),timer,powerValue);
                    return powerValue;
            }
  });
    //console.log(timer)
    heightbar.classList.add("play-anim");
    heightbar.classList.remove("paused");
    console.log('Exc',gunPosit , powerValue,randomImg,countTurn)
    console.log('Add',mouseState,countTurn)
}

var countTurn = 1;

function putXO(){
    if(countTurn % 2 == 0){
        if(gunPosit == 4 && powerValue > 240 ){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countTurn,
            });
        }
        else if(gunPosit == 4 && powerValue < 240 && powerValue >= 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countTurn,
            });        
        }
        else if(gunPosit == 4 && powerValue >= 0  && powerValue < 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countTurn,
            });        
        }
        
        else if(gunPosit == 18 && powerValue > 240 ){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countTurn,
            });        
        }
        else if(gunPosit == 18 && powerValue < 240 && powerValue >= 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countTurn,
            });        
        }
        else if(gunPosit == 18 && powerValue >= 0  && powerValue < 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countTurn,
            });        
        }
        
        else if(gunPosit == 30 && powerValue > 240 ){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countTurn,
            });        
        }
        else if(gunPosit == 30 && powerValue < 240 && powerValue >= 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countTurn,
            });        
        }
        else if(gunPosit == 30 && powerValue >= 0  && powerValue < 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countTurn,
            });        
        }   
    }
    else if (countTurn % 2 != 0){
        if(gunPosit == 4 && powerValue > 240 ){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countTurn,
            });
        }
        else if(gunPosit == 4 && powerValue < 240 && powerValue >= 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countTurn,
            });
        }
        else if(gunPosit == 4 && powerValue >= 0  && powerValue < 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countTurn,
            });        
        }

        else if(gunPosit == 18 && powerValue > 240 ){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countTurn,
            });        
        }
        else if(gunPosit == 18 && powerValue < 240 && powerValue >= 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countTurn,
            });        
        }
        else if(gunPosit == 18 && powerValue >= 0  && powerValue < 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countTurn,
            });        
        }

        else if(gunPosit == 30 && powerValue > 240 ){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countTurn,
            });        
        }
        else if(gunPosit == 30 && powerValue < 240 && powerValue >= 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countTurn,
            });        
        }
        else if(gunPosit == 30 && powerValue >= 0  && powerValue < 120){
            countTurn += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countTurn,
            });        
        }

    }
}

function release(event){
    mouseState = 1;
    setTimeout(NextGenerate,600);  
    const btnJoinID = event.currentTarget.getAttribute("id");
    const player = btnJoinID[btnJoinID.length - 1];
    let heightbar =  document.getElementById(`hold-${player}`);
    //console.log(timer)
    heightbar.classList.add("paused");
    clearInterval(timerInterval);
    timer = 0;
    console.log('clear',heightbar.id, mouseState)
    setTimeout(putXO,200);  
    setTimeout(function(){
    heightbar.classList.remove("play-anim");
    heightbar.classList.remove("paused"); 
    }, 1000);
}

ref.on('value', snapshot => {
    getGameInfo(snapshot);
})
function getGameInfo(snapshot){
    const users = firebase.auth().currentUser;

    snapshot.forEach((data) => {
        const gameInfos = data.val();
        Object.keys(gameInfos).forEach(key => {
            switch (key) {
                case 'room-state':
                    state = gameInfos[key];
                    var countXO = snapshot.child("game-1/round").val();
                    if (state == 0){
                        document.querySelector('#statusText').innerText = 'Waiting...';
                    }
                    if (state == 1){
                        document.querySelector('#statusText').innerText = 'Waiting...';
                    }
                    if (state == 2){
                        document.querySelector('#statusText').innerText = 'Ready!';
                        if(countXO == null){
                            document.querySelector('#statusText').innerText = 'Turn X';
                        }
                        if(countXO % 2 != 0){
                            document.querySelector('#statusText').innerText = 'Turn X';
                            document.querySelector(`#button-x`).disabled = false;
                            document.querySelector(`#button-o`).disabled = true;
                            document.getElementById('button-o').style.backgroundColor = 'grey';
                            document.getElementById('button-x').style.backgroundColor = '#c3001e';
                            document.getElementById('butStyle2').style.border = '0px solid white';
                            document.getElementById('butStyle1').style.border = '5px solid #c3001e';

                        }
                        else if(countXO % 2 == 0){
                            document.querySelector('#statusText').innerText = 'Turn O';
                            document.querySelector(`#button-o`).disabled = false;
                            document.querySelector(`#button-x`).disabled = true;
                            document.getElementById('button-x').style.backgroundColor = 'grey';
                            document.getElementById('button-o').style.backgroundColor = '#c3001e';
                            document.getElementById('butStyle1').style.border = '0px solid white';
                            document.getElementById('butStyle2').style.border = '5px solid #c3001e';

                        }
                        ref.once("value")
                            .then(function(snapshot) {
                            var onBoard = snapshot.child("game-1/onBoard").val();
                            const writeonBoard  = document.getElementById(onBoard);
                            var whatSym = writeonBoard.innerText;
                            var whatImg = writeonBoard.getElementsByTagName('img')[0];
                            var ImgSym = whatImg.src[whatImg.src.length - 6];
                            var onBoard_img = snapshot.child("game-1/onBoard_img").val();
                            var onBoard_sym = snapshot.child("game-1/onBoard_sym").val(); 
                            var ImgSym_onBoard = onBoard_img[onBoard_img.length - 2];
                            var checkBoard = snapshot.child(`game-1/checkBoard-${onBoard}`).val();
                            console.log(whatSym,ImgSym,'---',onBoard_img,onBoard_sym,ImgSym_onBoard,checkBoard,onBoard)
                            if(whatSym == ''){
                                writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                console.log('writed');
                                checkWin();
                            }
                            else if( whatSym == 'X' &&  onBoard_sym == 'O' ){
                                if(ImgSym == 'h' && ImgSym_onBoard == "p" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                                else if(ImgSym == 's' && ImgSym_onBoard == "h" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                                else if(ImgSym == 'p' && ImgSym_onBoard == "s" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                            }
                            else if( whatSym == 'O' &&  onBoard_sym == 'X' && checkBoard != 1){
                                if(ImgSym == 'h' && ImgSym_onBoard == "p"){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                                else if(ImgSym == 's' && ImgSym_onBoard == "h" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                                else if(ImgSym == 'p' && ImgSym_onBoard == "s" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                            }

                            });
                    }
                    if (state == 3){
                        var winner = snapshot.child("game-1/WinnerIs").val();
                        document.querySelector('#statusText').innerText = winner;
                        console.log(winner);
                    }
                    break;
            }
        });
    });
}

var whoWin;
function checkWin(){
    var GridRow1 = [];
    var GridRow2 = [];
    var GridRow3 = [];
    for (var i = 1 ; i < 4 ; i++){
            GridRow1[i] = document.querySelector('#row-1-col-'+i).innerText;
            GridRow2[i] = document.querySelector('#row-2-col-'+i).innerText;
            GridRow3[i] = document.querySelector('#row-3-col-'+i).innerText;

        }
    // row check
    if(GridRow1[1] != '' & GridRow1[2] != '' & GridRow1[3] != ''){
        if (GridRow1[1] == 'X' & GridRow1[2] == 'X' & GridRow1[3] == 'X'){
            whoWin = 'Winner: X';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
            
        }
        else if (GridRow1[1] == 'O' & GridRow1[2] == 'O' & GridRow1[3] == 'O'){
            whoWin = 'Winner: O';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }        
    }
    if(GridRow2[1] != '' & GridRow2[2] != '' & GridRow2[3] != ''){
        if (GridRow2[1] == 'X' & GridRow2[2] == 'X' & GridRow2[3] == 'X'){
            whoWin = 'Winner: X';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }
        else if (GridRow2[1] == 'O' & GridRow2[2] == 'O' & GridRow2[3] == 'O'){
            whoWin = 'Winner: O';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }        
    }
    if(GridRow3[1] != '' & GridRow3[2] != '' & GridRow3[3] != ''){
        if (GridRow3[1] == 'X' & GridRow3[2] == 'X' & GridRow3[3] == 'X'){
            whoWin = 'Winner: X';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }
        else if (GridRow3[1] == 'O' & GridRow3[2] == 'O' & GridRow3[3] == 'O'){
            whoWin = 'Winner: O';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }        
    }
    //col check
    if(GridRow1[1] != '' & GridRow2[1] != '' & GridRow3[1] != ''){
        if (GridRow1[1] == 'X' & GridRow2[1] == 'X' & GridRow3[1] == 'X'){
            whoWin = 'Winner: X';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }
        else if (GridRow1[1] == 'O' & GridRow2[1] == 'O' & GridRow3[1] == 'O'){
            whoWin = 'Winner: O';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }        
    }
    if(GridRow1[2] != '' & GridRow2[2] != '' & GridRow3[2] != ''){
        if (GridRow1[2] == 'X' & GridRow2[2] == 'X' & GridRow3[2] == 'X'){
            whoWin = 'Winner: X';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }
        else if (GridRow1[2] == 'O' & GridRow2[2] == 'O' & GridRow3[2] == 'O'){
            whoWin = 'Winner: O';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }        
    }
    if(GridRow1[3] != '' & GridRow2[3] != '' & GridRow3[3] != ''){
        if (GridRow1[3] == 'X' & GridRow2[3] == 'X' & GridRow3[3] == 'X'){
            whoWin = 'Winner: X';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }
        else if (GridRow1[3] == 'O' & GridRow2[3] == 'O' & GridRow3[3] == 'O'){
            whoWin = 'Winner: O';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }        
    }
    if(GridRow1[2] != '' & GridRow2[2] != '' & GridRow3[2] != ''){
        if (GridRow1[2] == 'X' & GridRow2[2] == 'X' & GridRow3[2] == 'X'){
            whoWin = 'Winner: X';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }
        else if (GridRow1[2] == 'O' & GridRow2[2] == 'O' & GridRow3[2] == 'O'){
            whoWin = 'Winner: O';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }        
    }
    if(GridRow1[1] != '' & GridRow2[2] != '' & GridRow3[3] != ''){
        if (GridRow1[1] == 'X' & GridRow2[2] == 'X' & GridRow3[3] == 'X'){
            whoWin = 'Winner: X';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }
        else if (GridRow1[1] == 'O' & GridRow2[2] == 'O' & GridRow3[3] == 'O'){
            whoWin = 'Winner: O';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }        
    }
    if(GridRow1[3] != '' & GridRow2[2] != '' & GridRow3[1] != ''){
        if (GridRow1[3] == 'X' & GridRow2[2] == 'X' & GridRow3[1] == 'X'){
            whoWin = 'Winner: X';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }
        else if (GridRow1[3] == 'O' & GridRow2[2] == 'O' & GridRow3[1] == 'O'){
            whoWin = 'Winner: O';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`
            ref.once("value")
            .then(function(snapshot) {
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                    });
                });
        }        
    }
    if (GridRow1[1] != '' & GridRow1[2] != '' & GridRow1[3] != '' & GridRow2[1] != '' & GridRow2[2] != '' & GridRow2[3] != '' & GridRow3[1] != '' & GridRow3[2] != '' & GridRow3[3] != ''){
        whoWin = 'Draw';
        let checkST = `room-state`;
        let who_Win = `WinnerIs`
        ref.once("value")
        .then(function(snapshot) {
                ref.child('game-1').update({
                    [checkST]: 3,
                    [who_Win]:whoWin,
                });      
            });
    }
    console.log('Check',GridRow1[1],GridRow1[2],GridRow1[3])

}
