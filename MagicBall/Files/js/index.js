let answerField = document.getElementById('answer-field');
let questionField = document.getElementById('question-field');

let answerButton = document.getElementById('answer-button');

let answerPhrases = ["Более чем вероятно", "Не думаю", "Возможно", "Маловероятно", "Конечно", "Да"];


function getAnswer() {
    if(questionField.value === "" || !isNaN(questionField.value)){
        answerField.innerHTML = "Не могу ответить";
    } else {
        let figure = Math.floor(Math.random() * answerPhrases.length);
        answerField.innerHTML = answerPhrases[figure];
    }
}

answerButton.addEventListener('click', getAnswer);



