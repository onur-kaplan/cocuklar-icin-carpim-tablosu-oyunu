function firstStart() {
  const manager = new AppManager();
  const introScoreData = manager.localDb.getItem(appPrefix.students)
  const scoreListSummary = introScoreData.reduce((carry, item) => {
    carry += introListTemplate
      .replace(/__STUDENTNAME__/, item.userName)
      .replace(/__STUDENTICON__/, item.userId)
      .replace(/__STUDENTSCORE__/, item.userScore);
    return carry;
  }, '');
  introScoreList.innerHTML = scoreListSummary;
  document.querySelector('.login-button').addEventListener('click', function () {
    const userNameValue = document.querySelector('#userName').value;
    const userPassValue = document.querySelector('#userPass').value;
    manager.login(userNameValue, userPassValue)
    loginClose.click();
    appReStart()
  });
}

function appReStart() {
  const manager = new DBManager();
  const introScoreData = manager.getItem(appPrefix.currentStudent);
  if (!!introScoreData) {
    const quizHeadingResult = quizHeadingTemplate
      .replace(/__STUDENTNAME__/, introScoreData.userName)
      .replace(/__STUDENTSCORE__/, introScoreData.userScore)
      .replace(/__STUDENTICON__/, introScoreData.userId)
    quizHeading.innerHTML = quizHeadingResult;

    document.querySelector("body").classList.add("isLogin")
    return;
  }
  document.querySelector("body").classList.remove("isLogin")
}

function logOut() {
  const removeCurrentData = new DBManager();
  removeCurrentData.removeItem(appPrefix.currentStudent);
  location.reload();
}

let quesstionCount = 10;
let generatedQuestion = null;

function newQuestion() {
  appReStart()
  console.log("newquestion" + quesstionCount);
  clearInterval(timerFire)
  timer(0, 10);
  quesstionCount--;
  generatedQuestion = new QuestionGenerator();
  quizNumberFirst.innerHTML = generatedQuestion.firstNumber;
  quizNumberSecond.innerHTML = generatedQuestion.secondNumber;
}

let timerFire;
function timer(minute, second) {
  timerFire = setInterval(contDown, 1000);
  function contDown() {
    second--;
    let currentTime = minute + ":" + (second < 10 ? "0" : "") + second;
    timerBox.innerHTML = currentTime;
    if (second === 0) {
      if (minute > 0 && second === 0) {
        minute--;
        second = 60;
      } else {
        console.log("timer" + quesstionCount)
        clearInterval(timerFire);
        quesstionCount > 0 ? newQuestion() : QuizFinish()
      }
    }
  }
}

function QuizFinish() {
  appReStart()
  const dbManager = new DBManager();
  const currentStuendData = dbManager.getItem(appPrefix.currentStudent);
  const allStudentData = dbManager.getItem(appPrefix.students)
  const updatedAllUserData = allStudentData.map(item => {
    if(item.userName !== currentStuendData.userName){
      return item;
    }
    item.userScore += currentStuendData.userScore;
    return item;
  })
  dbManager.setItem(appPrefix.students, updatedAllUserData)
  logOut()
}


// Events

logOutBtn.addEventListener("click", function () {
  logOut() 
})


startQuiz.addEventListener("click", function () {
  this.remove();
  quizMainBox.classList.remove("d-none");
  quizMainBox.classList.add("d-flex");
  newQuestion()
})

quizGuessInput.addEventListener("change", function(e){
  console.log(e.target.value, generatedQuestion.result)
  if (parseInt(e.target.value) === parseInt(generatedQuestion.result)) {
    quizGuessResult.innerHTML = "Doğru";
    quizGuessResult.classList.add("alert-success");
    quizGuessResult.classList.remove("alert-danger");
    const scoreDB = new Student();
    scoreDB.studentLiveData(10);
  } else {
    quizGuessResult.innerHTML = "Yanlış";
    quizGuessResult.classList.add("alert-danger")
    quizGuessResult.classList.remove("alert-success")
  }
  e.target.value = "";
  quesstionCount > 0 ? newQuestion() : QuizFinish();
})

// Init start
firstStart()
appReStart()
// Init end