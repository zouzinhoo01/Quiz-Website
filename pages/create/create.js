const QUIZ_CREATION_TITLE = document.getElementById("quiz_creation_title");
const QUIZ_CREATION_AUTHOR = document.getElementById("quiz_creation_author")
const QUIZ_CREATION_DESCRIPTION = document.getElementById("quiz_creation_description");
const QUIZ_CREATION_DIFFICULTY = document.getElementById("quiz_creation_difficulty");
const QUIZ_CREATION_CLEAR_QUESTIONS = document.getElementById("quiz_creation_clear_questions");
const QUIZ_CREATION_CREATE_QUESTION = document.getElementById("quiz_creation_create_question");
const QUIZ_DELETE_YES = document.getElementById("quiz-delete-yes");
const QUIZ_DELETE_NO = document.getElementById("quiz-delete-no");
const QUIZ_CREATION_QUESTIONS_CREATION = document.querySelector(".questions-creation");
const QUIZ_CREATION_EDITING = document.querySelector(".quiz-creation-editing");
const QUIZ_CREATION_INVALID_TITLE = document.querySelector(".quiz-creation-invalid-title");
const QUIZ_CREATION_INVALID_QUESTIONS = document.querySelector(".quiz-creation-invalid-questions");
const QUIZ_CREATION_FINISH = document.querySelector(".quiz-creation-finish");
const QUIZ_CREATION_CLOSE = document.querySelector(".quiz-creation-close");
const QUIZ_CREATION_WARNING = document.querySelector(".quiz-creation-warning");
const QUIZ_DELETE_PROCESS = document.querySelector(".quiz-delete-process");
const QUIZ_CREATE = document.querySelector(".create");
const QUIZ_CREATION = document.querySelector(".quiz-creation");
const QUIZ_LIST = document.querySelector(".quiz-list");
const LOADING = document.querySelector(".loading");

let can_press_create = true;
let can_show_creation_warning = true;
let can_delete_quiz = true;
let editing_quiz = null;

if (localStorage.getItem("my_quizes") === null || localStorage.getItem("my_quizes") === "") {
    localStorage.setItem("my_quizes", JSON.stringify([]))
}

function create_question(setting) {
    let section = document.createElement("section");
    let div = document.createElement("div");
    let p = document.createElement("p");
    let input = document.createElement("input");
    let span = document.createElement("span");
    let span_2 = document.createElement("span");
    let section_2 = document.createElement("section");
    let input_2 = document.createElement("input");
    let input_3 = document.createElement("input");
    let input_4 = document.createElement("input");
    let input_5 = document.createElement("input");
    let div_2 = document.createElement("div");
    let p_2 = document.createElement("p");
    let button = document.createElement("button");

    QUIZ_CREATION_QUESTIONS_CREATION.appendChild(section)

    section.appendChild(div)
    div.appendChild(p)
    div.appendChild(input)
    div.appendChild(span)
    div.appendChild(span_2)
    section.appendChild(section_2)
    section_2.appendChild(input_2)
    section_2.appendChild(input_3)
    section_2.appendChild(input_4)
    section_2.appendChild(input_5)
    section.appendChild(div_2)
    div_2.appendChild(p_2)
    div_2.appendChild(button)

    p.textContent = "Title"

    p_2.textContent = "Correct Answer"

    button.textContent = "1"

    section.className = "questions-creation-setting"

    section_2.className = "questions-creation-answers"

    input.placeholder = "Title"
    input.id = "question_title"
    input.type = "text"

    input_2.placeholder = "Answer 1"
    input_2.id = "question_answer_1"
    input_2.type = "text"

    input_3.placeholder = "Answer 2"
    input_3.id = "question_answer_2"
    input_3.type = "text"

    input_4.placeholder = "Answer 3"
    input_4.id = "question_answer_3"
    input_4.type = "text"

    input_5.placeholder = "Answer 4"
    input_5.id = "question_answer_4"
    input_5.type = "text"

    span.className = "material-icons"
    span.title = "Hide Answers"
    span.textContent = "keyboard_arrow_up"

    span_2.textContent = "delete"
    span_2.className = "material-icons"
    span_2.title = "Delete"

    if (setting !== undefined) {
        input.value = setting.title

        input_2.value = setting.answers[0]
        input_3.value = setting.answers[1]
        input_4.value = setting.answers[2]
        input_5.value = setting.answers[3]

        button.textContent = String(setting.correct_answer + 1)
    }

    span.onclick = function () {
        if (span.textContent === "keyboard_arrow_up") {
            span.textContent = "keyboard_arrow_down"
            section_2.style.display = "none"
        } else {
            span.textContent = "keyboard_arrow_up"
            section_2.style.display = "flex"
        }
    }

    span_2.onclick = function () { section.remove() }

    button.onclick = function () {
        if (button.textContent === "1") {
            button.textContent = "2"
        } else if (button.textContent === "2") {
            button.textContent = "3"
        } else if (button.textContent === "3") {
            button.textContent = "4"
        } else {
            button.textContent = "1"
        }
    }
}

function clear_questions() {
    let questions = document.getElementsByClassName("questions-creation-setting");

    for (let i = (questions.length - 1); i > -1; i--) {
        questions[i].remove()
    }
}

function open_editor(quiz) {
    if (can_press_create === true) {
        can_press_create = false

        QUIZ_CREATION_INVALID_TITLE.style.display = "none"
        QUIZ_CREATION_INVALID_QUESTIONS.style.display = "none"
        LOADING.style.display = "flex"

        clear_questions()

        setTimeout(() => {
            LOADING.style.opacity = 1

            setTimeout(() => {
                QUIZ_CREATION.style.display = "flex"
                LOADING.style.opacity = 0

                if (quiz !== undefined) {
                    QUIZ_CREATION_TITLE.value = quiz.title
                    QUIZ_CREATION_AUTHOR.value = quiz.author
                    QUIZ_CREATION_DESCRIPTION.value = quiz.description
                    QUIZ_CREATION_DIFFICULTY.textContent = quiz.difficulty
                    QUIZ_CREATION_EDITING.style.display = "block"

                    quiz.questions.forEach((question) => {
                        create_question({
                            title: question.title,
                            correct_answer: question.correct_answer,
                            answers: [
                                question.answers[0],
                                question.answers[1],
                                question.answers[2],
                                question.answers[3]
                            ]
                        })
                    })

                    editing_quiz = quiz
                } else {
                    QUIZ_CREATION_TITLE.value = ""
                    QUIZ_CREATION_AUTHOR.value = ""
                    QUIZ_CREATION_DESCRIPTION.value = ""
                    QUIZ_CREATION_DIFFICULTY.textContent = "Easy"
                    QUIZ_CREATION_EDITING.style.display = "none"
                }

                setTimeout(() => {
                    LOADING.style.display = "none"
                    can_press_create = true
                }, 500)
            }, 1500)
        }, 500)
    }
}

function close_editor() {
    LOADING.style.display = "flex"

    setTimeout(() => {
        LOADING.style.opacity = 1

        setTimeout(() => {
            QUIZ_CREATION.style.display = "none"
            LOADING.style.opacity = 0

            editing_quiz = null

            setTimeout(() => {
                LOADING.style.display = "none"
            }, 500)
        }, 1500)
    }, 500)
}

function ask_delete(quiz) {
    if (can_delete_quiz === true) {
        can_delete_quiz = false
        can_press_create = false

        QUIZ_DELETE_PROCESS.style.display = "flex"

        setTimeout(() => {
            let selected_option = "None";

            QUIZ_DELETE_PROCESS.style.opacity = "0.8"

            QUIZ_DELETE_YES.onclick = function () {
                if (selected_option === "None") {
                    selected_option = "Yes"

                    let my_quizes = JSON.parse(localStorage.getItem("my_quizes"));

                    let filtered_my_quizes = my_quizes.filter((item) => {
                        return JSON.stringify(item) !== JSON.stringify(quiz)
                    })

                    localStorage.setItem("my_quizes", JSON.stringify(filtered_my_quizes))

                    QUIZ_DELETE_PROCESS.style.opacity = "0"

                    setTimeout(() => {
                        QUIZ_DELETE_PROCESS.style.display = "none"

                        refresh_quiz_list()

                        can_delete_quiz = true
                        can_press_create = true
                    }, 400)
                }
            }

            QUIZ_DELETE_NO.onclick = function () {
                if (selected_option === "None") {
                    selected_option = "No"

                    QUIZ_DELETE_PROCESS.style.opacity = "0"

                    setTimeout(() => {
                        QUIZ_DELETE_PROCESS.style.display = "none"

                        can_delete_quiz = true
                        can_press_create = true
                    }, 400)
                }
            }
        }, 100)
    }
}

function refresh_quiz_list() {
    if (localStorage.getItem("my_quizes") !== "") {
        {
            let quizes = document.getElementsByTagName("div");

            for (let i = (quizes.length - 1); i > -1; i--) {
                if (quizes[i].id.includes("quiz_")) { quizes[i].remove() }
            }
        }

        let quizes = JSON.parse(localStorage.getItem("my_quizes"));

        for (let i = (quizes.length - 1); i > -1; i--) {
            let div = document.createElement("div");
            let h3 = document.createElement("h3");
            let h5 = document.createElement("h5");
            let button = document.createElement("button");
            let button_2 = document.createElement("button");

            QUIZ_LIST.appendChild(div)

            div.appendChild(h3)
            div.appendChild(h5)
            div.appendChild(button)
            div.appendChild(button_2)

            div.id = "quiz_" + quizes[i].title

            button.textContent = "Edit"

            button_2.style["background-color"] = "coral"
            button_2.textContent = "Delete"
            button_2.style["margin-top"] = "5px"

            h3.textContent = quizes[i].title
            h5.textContent = "By " + quizes[i].author

            button.onclick = function () {
                open_editor(quizes[i])
            }

            button_2.onclick = function () {
                ask_delete(quizes[i])
            }
        }
    } else {
        let quizes = document.getElementsByTagName("div");

        for (let i = (quizes.length - 1); i > -1; i--) {
            if (quizes[i].id.includes("quiz_")) { quizes[i].remove() }
        }
    }
}

QUIZ_CREATION_DIFFICULTY.onclick = function () {
    if (QUIZ_CREATION_DIFFICULTY.textContent === "Easy") {
        QUIZ_CREATION_DIFFICULTY.textContent = "Medium"
    } else if (QUIZ_CREATION_DIFFICULTY.textContent === "Medium") {
        QUIZ_CREATION_DIFFICULTY.textContent = "Hard"
    } else {
        QUIZ_CREATION_DIFFICULTY.textContent = "Easy"
    }
}

QUIZ_CREATION_CREATE_QUESTION.onclick = function () { create_question() }
QUIZ_CREATION_CLEAR_QUESTIONS.onclick = function () { clear_questions() }

QUIZ_CREATION_CLOSE.onclick = function () { close_editor() }
QUIZ_CREATE.onclick = function () { open_editor() }

QUIZ_CREATION_FINISH.onclick = function () {
    let quiz = {
        title: QUIZ_CREATION_TITLE.value,
        description: QUIZ_CREATION_DESCRIPTION.value,
        author: QUIZ_CREATION_AUTHOR.value,
        difficulty: QUIZ_CREATION_DIFFICULTY.textContent,
        questions: []
    };

    let questions = document.getElementsByClassName("questions-creation-setting");

    for (let i = (questions.length - 1); i > -1; i--) {
        let inputs = questions[i].getElementsByTagName("input");

        let correct_answer_button = questions[i].getElementsByTagName("button")[0];
        let title = null;
        let answer_1 = null;
        let answer_2 = null;
        let answer_3 = null;
        let answer_4 = null;

        for (let i1 = (inputs.length - 1); i1 > -1; i1--) {
            if (inputs[i1].id === "question_title") { title = inputs[i1].value }
            else if (inputs[i1].id === "question_answer_1") { answer_1 = inputs[i1].value }
            else if (inputs[i1].id === "question_answer_2") { answer_2 = inputs[i1].value }
            else if (inputs[i1].id === "question_answer_3") { answer_3 = inputs[i1].value }
            else if (inputs[i1].id === "question_answer_4") { answer_4 = inputs[i1].value }
        }

        let question = {
            title: title,
            answers: [answer_1, answer_2, answer_3, answer_4],
            correct_answer: Number(correct_answer_button.textContent) - 1,
        }

        quiz.questions.push(question)
    }

    let pass = true;

    QUIZ_CREATION_INVALID_TITLE.style.display = "none"
    QUIZ_CREATION_INVALID_QUESTIONS.style.display = "none"

    if (localStorage.getItem("my_quizes") !== null) {
        let my_quizes = JSON.parse(localStorage.getItem("my_quizes"));

        my_quizes.forEach((item) => {
            if (pass === true) {
                if (item.title === quiz.title) {
                    if (!(editing_quiz !== null && editing_quiz.title === quiz.title)) {
                        QUIZ_CREATION_INVALID_TITLE.style.display = "block"
                        pass = false
                    } else if (quiz.questions.length === 0) {
                        QUIZ_CREATION_INVALID_QUESTIONS.style.display = "block"
                        pass = false
                    }
                } else if (quiz.questions.length === 0) {
                    QUIZ_CREATION_INVALID_QUESTIONS.style.display = "block"
                    pass = false
                }
            }
        })
    }

    if (pass === true) {
        if (can_show_creation_warning === true) {
            can_show_creation_warning = false

            QUIZ_CREATION_WARNING.style.top = "10px"

            if (editing_quiz === null) {
                QUIZ_CREATION_WARNING.textContent = "Quiz Created Successfully"
            } else {
                QUIZ_CREATION_WARNING.textContent = "Quiz Edited Successfully"
            }

            setTimeout(() => {
                QUIZ_CREATION_WARNING.style.top = "-50px"
                can_show_creation_warning = true
            }, 5000)
        }

        let my_quizes = localStorage.getItem("my_quizes");

        if (editing_quiz === null) {
            if (my_quizes !== "") {
                my_quizes = JSON.parse(my_quizes)
                my_quizes.push(quiz)
            } else {
                my_quizes = []
                my_quizes.push(quiz)
            }
        } else {
            my_quizes = JSON.parse(my_quizes)

            let filtered_my_quizes = my_quizes.filter((item) => {
                return JSON.stringify(item) !== JSON.stringify(editing_quiz)
            })

            filtered_my_quizes.push(quiz)
            my_quizes = filtered_my_quizes
        }

        localStorage.setItem("my_quizes", JSON.stringify(my_quizes))

        setTimeout(() => { refresh_quiz_list() }, 500)

        close_editor()
    }
}

refresh_quiz_list()