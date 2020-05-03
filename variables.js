let introScoreList = document.querySelector(".intro-score-list");
let loginClose = document.querySelector(".close");
let logOutBtn = document.querySelector(".logout-btn");
let loginCheckAlert = document.querySelector(".login-control-alert");
let activeUserNameContainer = document.querySelector(".active-user-name");
let activeUserScoreContainer = document.querySelector(".user-score");
let quizContainer = document.querySelector(".quiz-container");
let quizContainerHeading = document.querySelector(".quiz-container");
let quizHeading = document.querySelector(".quiz-heading");
let quizMainBox = document.querySelector(".quiz-main-box");
let startQuiz = document.querySelector(".start-to-quiz");
let quizGuessResult = document.querySelector(".quiz-guess-result");
let quizNumberFirst = document.querySelector(".number-one");
let quizNumberSecond = document.querySelector(".number-two");
let quizGuessInput = document.querySelector(".quiz-guess");
let timerBox = document.querySelector("#timer-box")

  
const appPrefix = {
    students: '__kerrat_students',
    currentStudent: "__kerrat_current_student",
}
  
  
let introListTemplate = `
<div class="d-flex align-items-center justify-content-between py-2 border-bottom border-gray scoreboard-list-item">
  <div class="d-flex align-items-center">
    <img class="mr-2 rounded" src="img/user-__STUDENTICON__.svg" width="80" height="80">
    <div class="media-body mb-0 small lh-125">
      <div class="d-flex justify-content-between align-items-center w-100">
        <h5 class="text-gray-dark">__STUDENTNAME__</h5>
      </div>
    </div>
  </div>
  <h4 class="user-score">
    <span class="badge badge-success">__STUDENTSCORE__</span> <small>Puan</small>
  </h4>
</div>
`;

let quizHeadingTemplate = `
<div class="d-flex align-items-center justify-content-between border-bottom border-gray">
  <div class="d-flex align-items-center">
    <img alt="32x32" class="mr-2 rounded" src="img/user-__STUDENTICON__.svg" width="100" height="100">
    <div class="media-body mb-0 small lh-125">
      <div class="d-flex justify-content-between align-items-center w-100">
        <h5 class="text-gray-dark active-user-name">__STUDENTNAME__</h5>
      </div>
    </div>
  </div>
  <h3 class="user-score-box">
      Toplam Puanın: <span class="user-score">__STUDENTSCORE__</span>  
  </h3>
</div>
`;