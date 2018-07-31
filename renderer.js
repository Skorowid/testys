// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//const {remote} = require('electron');
//const {Menu, BrowserWindow, MenuItem, shell} = remote;
window.eval =  function () {
    throw new Error(`Sorry, this app does not support window.eval().`)
}
console.log(window.readConfig)
let readDir;
let questions = [];
let questionsLength;
let questionTitle; //
let questionAnswers; //
let questionsCheckout = []; //how many questions still needed ... indeed
let takedQuestion; // right...
let btnStart;


btnStart = document.getElementsByClassName("btnStart")[0];
//btnStart.addEventListener("click", startRender);


/**
 * 
 * @param {*} value  name of file
 * @param {*} index  index of readed files from dir ../database/
 */
function load(value, index) {
    //not that button. well, that should fix it. now don't touch the machine. It's has nasty temperament
    questions[index] = JSON.parse(fs.readFileSync(__dirname + "/database/" + value), 'utf8');
    questionsLength = questions.length;
}
/*
//what's going on here?
if (fs.existsSync(__dirname + "/database")) {
    readDir = fs.readdirSync(__dirname + "/database");
    console.log('folder exits');
} else {
    console.log('folder dosent exists');// not that button?!
}
readDir.forEach(load);
*/

function setValue() {
    if (this.getAttribute("value") == "0") {
        this.setAttribute("value", "1");
    } else {
        this.setAttribute("value", "0");
    }

}

function getSelectedAnswers() {
    let buttons = document.getElementsByClassName("btn");
    let table = [];
    for (it = 0; it < buttons.length; it++) {
        table[it] = buttons[it].getAttribute("value");
    }
    return table;
}
function checkAnswer() {
    if (!this.getAttribute("value")) {
        this.setAttribute("value", "1");
        let gsa = getSelectedAnswers();
        let qcl = questions[takedQuestion].correctAnswers.length;
        let ica = 0;
        for (; ica < qcl; ica++) {
            if (questions[takedQuestion].correctAnswers[ica] == gsa[ica]) {
                if (((ica + 1) == qcl)) {
                    renderPositive();
                    return;
                }
            } else {
                renderNegative();
                return;
            }

        }
    }
}


function createQuestionCheckout() {
    for (icq = 0; icq < questions.length; icq++) {
        questionsCheckout[icq] = { icq: [icq, 1] };
    }
}

/**
 *
 * @param {*} value  value + index is name of element id
 * @param {*} index
 * @param {*} type type of html element, like p,div,h1,button (if type is button)
 * @param {*} text  text inside element
 */
function addNewElement(value, index, type, text) {
    if (!document.getElementById(value + index)) {
        var br = document.createElement("br");
        var element = document.createElement(type);
        element.setAttribute("id", value + index);
        if (type == "button") {
            element.setAttribute("class", "btn");
            element.setAttribute("value", "0");
        }
        var insideText = document.createTextNode(text);
        element.appendChild(insideText);
        element.addEventListener("click", setValue);
        var node = document.getElementById("questions");
        node.appendChild(element);
        node.appendChild(br);
    }
}

function takeRandomQuestion() {
    let temp = 0;
    if (questionsCheckout.length == 0) {
        console.log(questionsCheckout.length);
        //render end of questionare
    } else {
        temp = Math.floor(Math.random() * questionsCheckout.length);
        takedQuestion = temp;
    }
    return questions[takedQuestion];
}
//rendering functions

function nextQuestion() {
    if (document.getElementById("check0").getAttribute("value")) {
        clearDocument();
        renderQuestions(takeRandomQuestion(questions));
    }
}

function startRender() {
    clearDocument();
    createQuestionCheckout();
    renderQuestions(takeRandomQuestion());
}

function renderQuestionsAll(val, index) {
    document.write("<ul>");
    document.write(`<li> ${val.title} </li> `);
    document.write(`<li> ${val.correctAnswers} </li> `);
    document.write(`<li> ${val.answers} </li> `);

    document.write("</ul>")

}//old function

function renderQuestions(q) {
    addNewElement("title", 0, "h1", q.title);
    for (ic = 0; ic < q.answers.length; ic++) {
        addNewElement("q", ic, "button", q.answers[ic]);
    }
    addNewElement("check", 0, "div", "Check answers");
    addNewElement("next", 0, "div", "Next answer");
    document.getElementById("check0").removeEventListener("click", setValue);
    document.getElementById("check0").addEventListener("click", checkAnswer, true);
    document.getElementById("next0").removeEventListener("click", setValue);
    document.getElementById("next0").addEventListener("click", nextQuestion, true);
    //q.answers.forEach(addNewElement);
}

function clearDocument() {
    document.getElementsByClassName("main-container")[0].innerHTML = "";
    var element = document.createElement("div");
    element.setAttribute("id", "questions");
    var node = document.getElementsByClassName("main-container")[0];
    node.appendChild(element);

}
function renderPositive() {
    addNewElement("success", 1, "div", "Prawidłowa odpowiedź");
    console.log(takedQuestion);
    console.log(questionsCheckout[takedQuestion].icq[1]--);
    if (questionsCheckout[takedQuestion].icq[1] == 0) {
        questionsCheckout.splice(takedQuestion, 1);
    }
    console.log(questionsCheckout);
}

function renderNegative() {
    addNewElement("success", 0, "div", "Nie prawidłowa odpowiedź");
    console.log(takedQuestion);
    console.log(questionsCheckout[takedQuestion].icq[1]++);
}
