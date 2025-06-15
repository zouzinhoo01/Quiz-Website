const QUIZ_LIST = document.querySelector(".quiz-list");
const QUIZ_SEARCH = document.querySelector(".search");
const QUIZ_CREATE = document.querySelector(".create");
const QUIZ = document.querySelector(".quiz");
const QUIZ_CORRECT_ANSWER = document.querySelector(".quiz-correct-answer");
const QUIZ_WRONG_ANSWER = document.querySelector(".quiz-wrong-answer");
const QUIZ_FINISH = document.querySelector(".quiz-finish");
const QUIZ_FINISH_BUTTON = document.querySelector(".quiz-finish-button");
const QUIZ_FINISH_TITLE = document.querySelector(".quiz-finish-title");
const QUIZ_FINISH_DIFFICULTY = document.querySelector(".quiz-finish-difficulty");
const QUIZ_FINISH_QUESTIONS = document.querySelector(".quiz-finish-questions");
const QUIZ_FINISH_CORRECT_QUESTIONS = document.querySelector(".quiz-finish-correct-questions");
const QUIZ_FINISH_INCORRECT_QUESTIONS = document.querySelector(".quiz-finish-incorrect-questions");
const QUIZ_FINISH_ALL_CORRECT_QUESTIONS = document.querySelector(".quiz-finish-all-correct-questions");

const LOADING = document.querySelector(".loading");

let can_play_quiz = true;
let can_finish_quiz = true;

function get_CSSStyle(e, p) {
    return getComputedStyle(e).getPropertyValue(p)
}

function play_quiz(quiz) {
    let corrects = 0;
    let incorrects = 0;
    let can_answer = true;
    let current_question = 0;

    let create_question = null;

    let finish_questions = () => {
        console.log("- " + quiz.title + " Finished!")

        LOADING.style.display = "flex"

        QUIZ_FINISH_TITLE.textContent = quiz.title
        QUIZ_FINISH_DIFFICULTY.textContent = "Difficulty: " + quiz.difficulty
        QUIZ_FINISH_QUESTIONS.textContent = "Questions: " + String(quiz.questions.length)
        QUIZ_FINISH_CORRECT_QUESTIONS.textContent = "Correct Questions: " + String(corrects)
        QUIZ_FINISH_INCORRECT_QUESTIONS.textContent = "Incorrect Questions: " + String(incorrects)

        if (corrects === quiz.questions.length) {
            QUIZ_FINISH_ALL_CORRECT_QUESTIONS.style.display = "block"
        } else {
            QUIZ_FINISH_ALL_CORRECT_QUESTIONS.style.display = "none"
        }

        setTimeout(() => {
            LOADING.style.opacity = 1

            setTimeout(() => {
                QUIZ_FINISH.style.display = "flex"
                LOADING.style.opacity = 0

                setTimeout(() => { LOADING.style.display = "none" }, 500)
            }, 1500)
        }, 300)
    }

    QUIZ.style.display = "flex"

    create_question = (question) => {
        let div = document.createElement("div");
        let div_2 = document.createElement("div");
        let h1 = document.createElement("h1");
        let h2 = document.createElement("h2");
        let button = document.createElement("button");
        let button_2 = document.createElement("button");
        let button_3 = document.createElement("button");
        let button_4 = document.createElement("button");

        if (quiz.questions.indexOf(question) === current_question) {
            div.style.display = "flex"
        } else {
            div.style.display = "none"
        }

        function pass_question(button_chose) {
            if (can_answer === true) {
                can_answer = false

                if (button_chose.textContent === question.answers[question.correct_answer]) {
                    corrects = corrects + 1

                    QUIZ_CORRECT_ANSWER.style.transform = "scale(1)"
                    QUIZ_CORRECT_ANSWER.style.opacity = 1

                    setTimeout(() => {
                        QUIZ_CORRECT_ANSWER.style.transform = "scale(0)"
                        QUIZ_CORRECT_ANSWER.style.opacity = 0

                        div.style.opacity = 0
                        div.style.transform = "translateX(-100%)"

                        setTimeout(() => {
                            div.remove()
                            can_answer = true
                            current_question = current_question + 1

                            if (current_question === quiz.questions.length) {
                                finish_questions()
                            } else {
                                create_question(quiz.questions[current_question])
                            }
                        }, 700)
                    }, 1500)
                } else {
                    incorrects = incorrects + 1

                    QUIZ_WRONG_ANSWER.style.transform = "scale(1)"
                    QUIZ_WRONG_ANSWER.style.opacity = 1

                    setTimeout(() => {
                        QUIZ_WRONG_ANSWER.style.transform = "scale(0)"
                        QUIZ_WRONG_ANSWER.style.opacity = 0

                        div.style.opacity = 0
                        div.style.transform = "translateX(-100%)"

                        setTimeout(() => {
                            div.remove()
                            can_answer = true
                            current_question = current_question + 1

                            if (current_question === quiz.questions.length) {
                                finish_questions()
                            } else {
                                create_question(quiz.questions[current_question])
                            }
                        }, 700)
                    }, 1500)
                }
            }
        }

        QUIZ.appendChild(div)

        div.appendChild(h1)
        div.appendChild(h2)
        div.appendChild(div_2)
        div_2.appendChild(button)
        div_2.appendChild(button_2)
        div_2.appendChild(button_3)
        div_2.appendChild(button_4)

        div.id = "quiz-question-" + String(quiz.questions.indexOf(question))

        h1.textContent = "Question " + String(quiz.questions.indexOf(question) + 1)
        h2.textContent = question.title

        button.textContent = question.answers[0]
        button_2.textContent = question.answers[1]
        button_3.textContent = question.answers[2]
        button_4.textContent = question.answers[3]

        button.onclick = function () { pass_question(button) }
        button_2.onclick = function () { pass_question(button_2) }
        button_3.onclick = function () { pass_question(button_3) }
        button_4.onclick = function () { pass_question(button_4) }
    }

    create_question(quiz.questions[0])
}

function create_quiz(quiz) {
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let button = document.createElement("button");
    let div_2 = document.createElement("div");
    let div_3 = document.createElement("div");
    let div_4 = document.createElement("div");
    let div_5 = document.createElement("div");
    let h3_2 = document.createElement("h3");
    let h5 = document.createElement("h5");
    let h4 = document.createElement("h4");
    let h4_2 = document.createElement("h4");
    let h4_3 = document.createElement("h4");
    let button_2 = document.createElement("button");
    let span = document.createElement("span");

    let check_debounce = false

    QUIZ_LIST.appendChild(div)

    div.appendChild(h3)
    div.appendChild(button)
    div.appendChild(div_2)

    div_2.appendChild(div_3)
    div_2.appendChild(div_5)
    div_2.appendChild(h3_2)
    div_2.appendChild(h5)
    div_2.appendChild(h4)
    div_2.appendChild(h4_2)
    div_2.appendChild(h4_3)
    div_2.appendChild(button_2)
    div_2.appendChild(span)

    div_3.appendChild(div_4)

    div.id = "quiz-" + quiz.title

    div_2.id = "" + div.id + "-info-" + quizes.indexOf(quiz)

    div_3.id = "quiz_loading"

    h3.textContent = quiz.title
    h3_2.textContent = quiz.title

    button.textContent = "Check"

    h5.textContent = quiz.description

    h4.textContent = quiz.difficulty
    h4.id = "quiz-difficulty"

    h4_3.textContent = "Made By " + quiz.author

    span.className = "material-icons"
    span.textContent = "close"

    if (quiz.difficulty === "Easy") {
        h4.style.color = "lightgreen"
    } else if (quiz.difficulty === "Medium") {
        h4.style.color = "yellow"
    } else {
        h4.style.color = "red"
    }

    h4.textContent = quiz.difficulty

    h4_2.textContent = String(quiz.questions.length) + " Questions"

    button_2.textContent = "Play"

    span.onclick = function () {
        div_2.style.display = "none"
        div.style.transform = "translateY(0px)"
        div.style["box-shadow"] = "none"
        div.style["z-index"] = 0
    }

    button.onclick = function () {
        if (check_debounce === false) {
            if (get_CSSStyle(div_2, "display") === "none") {
                let loading_divs = document.getElementsByTagName("div");

                for (let i = (loading_divs.length - 1); i > 0; i--) {
                    if (loading_divs[i].id.includes("quiz-")) {
                        if (loading_divs[i].id.includes("-info-") === false) {
                            if (loading_divs[i].id.includes("quiz-difficulty") === false) {
                                loading_divs[i].style.transform = "translateY(0px)"
                                loading_divs[i].style["box-shadow"] = "none"
                                loading_divs[i].style["z-index"] = 0
                            }
                        } else {
                            loading_divs[i].style.display = "none"
                        }
                    }
                }

                div.style["z-index"] = 1
                div.style.transform = "translateY(-8px)"
                div.style["box-shadow"] = "0px 7px 8px rgb(0, 0, 0, 0.1)"

                div_2.style.display = "flex"
                div_3.style.display = "flex"

                check_debounce = true

                setTimeout(() => {
                    check_debounce = false
                    div_3.style.display = "none"
                }, 500)
            } else {
                div_2.style.display = "none"
                div.style.transform = "translateY(0px)"
                div.style["box-shadow"] = "none"
                div.style["z-index"] = 0
            }
        }
    }

    button_2.onclick = function () {
        if (can_play_quiz === true) {
            can_play_quiz = false

            LOADING.style.display = "flex"

            div_2.style.display = "none"
            div.style.transform = "translateY(0px)"
            div.style["box-shadow"] = "none"
            div.style["z-index"] = 0

            setTimeout(() => {
                LOADING.style.opacity = 1

                setTimeout(() => {
                    play_quiz(quiz)
                    LOADING.style.opacity = 0

                    setTimeout(() => { LOADING.style.display = "none" }, 500)
                }, 1500)
            }, 200)
        }
    }
}

let quizes = [
    {
        title: "Math",
        description: "A very basic math quiz",
        difficulty: "Easy",
        author: "Joabe",
        questions: [
            {
                title: "What is 2 + 2?",
                answers: ["5", "2", "1", "4"],
                correct_answer: 3
            },
            {
                title: "What is 2 + 3?",
                answers: ["5", "2", "1", "4"],
                correct_answer: 0
            }
        ]
    },
    {
        title: "JavaScript",
        description: "A basic JavaScript quiz to test your knowledge",
        difficulty: "Easy",
        author: "Joabe",
        questions: [
            {
                title: "What would it output? console.log(5 + 5)",
                answers: ["5", "2", "10", "4"],
                correct_answer: 2
            },
            {
                title: "How to create a variable?",
                answers: ["x = y", "x: y", "class x = y", "let x = y"],
                correct_answer: 3
            },
        ]
    }
]

{
    let my_quizes = localStorage.getItem("my_quizes")

    if (my_quizes !== "") {
        my_quizes = JSON.parse(my_quizes)
        my_quizes.forEach((quiz) => {
            quizes.push(quiz)
        })
    }

    quizes.forEach(create_quiz)
}

QUIZ_SEARCH.oninput = function (input) {
    quizes.forEach((quiz) => {
        if (quiz.title.includes(QUIZ_SEARCH.value)) {
            let quiz_div = document.getElementById("quiz-" + quiz.title)
            if (quiz_div != null) { quiz_div.style.display = "flex" }
        } else {
            let quiz_div = document.getElementById("quiz-" + quiz.title)
            if (quiz_div != null) { quiz_div.style.display = "none" }
        }
    })
}

QUIZ_FINISH_BUTTON.onclick = function () {
    if (can_finish_quiz === true) {
        can_finish_quiz = false

        LOADING.style.display = "flex"

        setTimeout(() => {
            LOADING.style.opacity = 1

            setTimeout(() => {
                QUIZ_FINISH.style.display = "none"
                QUIZ.style.display = "none"
                LOADING.style.opacity = 0

                setTimeout(() => {
                    LOADING.style.display = "none"
                    can_play_quiz = true
                    can_finish_quiz = true
                }, 500)
            }, 1500)
        }, 500)
    }
}