const data = [
  {
    id: 1,
    question: "What is  ",
    answers: ["this", "That"],
    rightAnswer: "this",
    image: "imgs/Capture.PNG",
  },
  {
    id: 2,
    question: "What is  ",
    answers: ["these", "those"],
    rightAnswer: "those",
    image: "imgs/Capture2.PNG",
  },
  {
    id: 3,
    question: "What is  ",
    answers: ["this", "That"],
    rightAnswer: "That",
    image: "imgs/Capture3.PNG",
  },
];

const quiz = document.getElementById("questions");
const container = document.querySelector(".container");
const box = document.querySelector(".box");
const loader = document.querySelector(".loader");
const answer = document.getElementById("answers");
const rightAudio = document.getElementById("raudio");
const flaseAudio = document.getElementById("faudio");
const next = document.getElementById("more");
const prev = document.getElementById("less");
const reset = document.getElementById("reset");
const showAnswers = document.getElementById("showAnswers");
const numberQuestion = document.querySelector(".numberQuestion");
const image = document.querySelector("#image");
const reload = document.querySelector("#reload");
const questionNumber = document.querySelector(".questionNumber");
const rightIcon = document.createElement("i");
rightIcon.className = "fas fa-check";
const falseIcon = document.createElement("i");
falseIcon.className = "far fa-times";

reload.addEventListener("click", () => {
  window.location.reload();
  localStorage.clear();
});

let counter = 0;

window.onload = () => {
  container.style.display = "flex";
  loader.style.display = "none";
};

const putData = () => {
  questionNumber.innerHTML = `${data[counter].id} of ${data.length} `;
  numberQuestion.innerHTML = data[counter].id;
  image.src = data[counter].image;
  quiz.innerHTML =
    data[counter].question +
    data[counter].answers
      .map((el) => `<button id='answer'>${el}</button>`)
      .join("/") +
    "?";

  let answeBtn = document.querySelectorAll("#answer");

  for (let i = 0; i < answeBtn.length; i++) {
    if (localStorage.getItem(data[counter].id) === answeBtn[i].innerHTML) {
      answeBtn[i].before(rightIcon);
    }
    answeBtn[i].addEventListener("click", () => {
      if (answeBtn[i].innerHTML === data[counter].rightAnswer) {
        answeBtn[i].disabled = true;
        answeBtn[i].before(rightIcon);
        localStorage.setItem(data[counter].id, answeBtn[i].innerHTML);
        rightAudio.play();
        answeBtn[i].before(rightIcon);
      } else {
        answeBtn[i].disabled = true;
        flaseAudio.play();
        answeBtn[i].before(falseIcon);
      }
    });

    showAnswers.addEventListener("click", () => {
      if (answeBtn[i].innerHTML === data[counter].rightAnswer) {
        answeBtn[i].before(rightIcon);
      }
    });
    reset.addEventListener("click", () => {
      rightIcon.remove();
      falseIcon.remove();

      localStorage.removeItem(data[counter].id);
      answeBtn[i].disabled = false;
    });
  }
};
putData();

function increase(e) {
  counter++;
  if (counter >= data.length - 1) {
    next.disabled = true;
  }

  if (counter > 0) {
    prev.disabled = false;
  }
  putData();
}

function decrease(e) {
  counter--;
  if (counter <= 0) {
    prev.disabled = true;
  }

  if (counter <= data.length - 1) {
    next.disabled = false;
  }
  putData();
}

function resize() {
  $innerHeight = window.innerHeight;
  $innerWidth = window.innerWidth;

  if (innerWidth > innerHeight - 1) {
    return;
  }

  $("body").css("transform", `scale( ${innerWidth / innerHeight})`);
}

$(window).resize(function () {
  resize();
});
$(document).ready(function () {
  resize();
});
