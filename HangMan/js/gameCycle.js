let hangManGame = {
    //текущее изображение
    slide: document.querySelector(".main-content__man-slide"),
    answerLetter: null,
    //массивы
    hangProgressSlides: [],
    answerArray: [],
    //поля
    fields: {
        usedLettersField: document.querySelector(".aside-content__letters-field"),
        gameScoreField: document.querySelector(".aside-content__score-field"),
        currentWordField: document.querySelector(".main-content__current-word"),
        remainingTriesField: document.querySelector(".main-content__remaining-attempts"),
        userLetter: document.querySelector(".user-letter__input"),
    },
    //стандартные значения
    standartValues: {
        currentSlide: 0,
        remainingLetters: null,
        remainingTries: null,
        currentWord: null,
        userScore: 0,
    },
    //кнопки
    buttons: {
        submitButton: document.querySelector(".user-letter__submit-button"),
        restartButton: document.querySelector("#restart-button"),
        startButton: document.querySelector("#start-button"),
    },
    //функция запуска игры
    start: function () {
        let that = this;
        //to disable buttons 
        this.buttons.restartButton.disabled = true;
        this.buttons.submitButton.disabled = true;
        //отключение поля ввода
        this.fields.userLetter.disabled = true;
        //заполнение массива фотографиями висселицы
        for (i = 0; i < 10; i++) {
            this.hangProgressSlides[i] = 'img/TheGameSlides/' + String(i) + '.png';
        }
        //начальный слайд
        this.slide.src = this.hangProgressSlides[this.standartValues.currentSlide];

        //add event listeners to game buttons
        this.buttons.submitButton.addEventListener('click', function (e) {
            that.checkAnswer();
        });
        this.buttons.restartButton.addEventListener('click', function (e) {
            that.restart();
        });
        this.buttons.startButton.addEventListener('click', function (e) {
            that.play();
        });
    },
    //фукнция начала игры
    play: function () {
        //выбор случайного слова
        this.standartValues.currentWord = words[Math.floor(Math.random() * words.length)];
        //заполнение поля пустышками
        for (let i = 0; i < this.standartValues.currentWord.length; i++) {
            this.answerArray[i] = "_";
        }
        //установка кол-ва букв и попыток
        this.standartValues.remainingLetters = this.standartValues.currentWord.length;
        this.standartValues.remainingTries = 10;

        this.fields.currentWordField.innerHTML = this.answerArray.join(" ");
        //отключение кнопки старт
        this.buttons.startButton.disabled = true;
        //включение возможности ввода и рестарта
        this.buttons.restartButton.disabled = false;
        this.buttons.submitButton.disabled = false;
        this.fields.userLetter.disabled = false;

        this.fields.remainingTriesField.innerHTML = "Удачи!";
    },
    //функция перезапуска игры
    restart: function () {
        //обнуление слайда
        this.standartValues.currentSlide = 0;
        this.slide.src = this.hangProgressSlides[this.standartValues.currentSlide];
        //обнуление поля слова
        for (let j = 0; j < this.standartValues.currentWord.length; j++) {
            this.answerArray.shift();
        }
        //обнуление полей
        this.fields.userLetter.value = "";
        this.fields.usedLettersField.innerHTML = "";
        this.play();
    },
    //функция проверки буквы
    checkAnswer: function () {
        this.answerLetter = this.fields.userLetter.value.toLowerCase();
        //входная проверка буквы 
        if (!(/^[а-яА-Я]$/.test(this.answerLetter))) {
            alert("Введите одну букву!");
            this.fields.userLetter.value = "";
        } else {
            //пробег по буквам заданного слова
            for (let j = 0; j < this.standartValues.currentWord.length; j++) {
                //проверка на переиспользование буквы
                if (this.answerLetter === this.answerArray[j]) {
                    alert("Уже вводили");
                } else if (this.standartValues.currentWord[j] === this.answerLetter) {
                    // проверка подходит ли буква к слову
                    this.answerArray[j] = this.answerLetter;
                    this.standartValues.remainingLetters--;
                    this.fields.usedLettersField.innerHTML += "\" " + this.fields.userLetter.value + " \", ";
                }
            }
            //проверка на ошибочную быкву
            if (this.standartValues.currentWord.indexOf(this.answerLetter) < 0) {
                this.standartValues.remainingTries--;
                this.standartValues.currentSlide++;
                this.slide.src = this.hangProgressSlides[this.standartValues.currentSlide];
                this.fields.remainingTriesField.innerHTML = "Осталось " + this.standartValues.remainingTries + " попыток";
            }
            this.fields.currentWordField.innerHTML = this.answerArray.join(" ");
            this.fields.userLetter.value = "";
        }
        this.makeResult();
    },
    makeResult: function () {
        //проверка результата игры
        if (this.standartValues.remainingLetters === 0) {
            this.fields.remainingTriesField.innerHTML = "Отлично!";
            this.standartValues.userScore++;
            this.fields.gameScoreField.innerHTML = this.standartValues.userScore;
            this.buttons.submitButton.disabled = true;
            this.fields.userLetter.disabled = true;
        } else if (this.standartValues.remainingTries === 0) {
            this.fields.currentWordField.innerHTML = this.standartValues.currentWord;
            this.fields.remainingTriesField.innerHTML = "Невезуха!";
            this.slide.src = this.hangProgressSlides[9];
            this.buttons.submitButton.disabled = true;
            this.fields.userLetter.disabled = true;
        }
    }
}