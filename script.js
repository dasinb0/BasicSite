// GALERIA
let slideIndex = 0;

function nextSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlides(slideIndex);
}

function showSlides(index) {
    const slides = document.getElementsByClassName('slide');

    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slides[slideIndex].style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    showSlides(slideIndex);
});


// JUEGO
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('start-quiz');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');
    const quizContainer = document.getElementById('quiz-container');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const questionElement = document.getElementById('question');

    let shuffledQuestions, currentQuestionIndex;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const questions = [
        {
            question: '¿Quién fue César Borgia?',
            answers: [
                { text: 'Un líder militar y político del Renacimiento italiano', correct: true },
                { text: 'El primer papa de la Casa Borgia', correct: false },
                { text: 'Un pintor famoso del Renacimiento', correct: false },
                { text: 'Un comerciante veneciano', correct: false }
            ]
        },
        {
            question: '¿Cuál fue el papel de Lucrecia Borgia en la historia?',
            answers: [
                { text: 'Fue una figura central en la política y cultura del Renacimiento', correct: true },
                { text: 'Fue una famosa poeta de la época', correct: false },
                { text: 'Descubrió América', correct: false },
                { text: 'Fue una líder militar', correct: false }
            ]
        },
        {
            question: '¿Qué título tenía Juan Borgia?',
            answers: [
                { text: 'Duque de Gandía', correct: true },
                { text: 'Papa de la Iglesia', correct: false },
                { text: 'Rey de España', correct: false },
                { text: 'Príncipe de Venecia', correct: false }
            ]
        },
        {
            question: '¿Quién fue Rodrigo Borgia?',
            answers: [
                { text: 'El papa Alejandro VI', correct: true },
                { text: 'Un líder militar', correct: false },
                { text: 'Un comerciante', correct: false },
                { text: 'Un poeta', correct: false }
            ]
        }
    ];

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartButton.addEventListener('click', startGame);

    function startGame() {
        startButton.style.display = 'none';
        resultContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        clearBackgroundClass();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function clearBackgroundClass() {
        document.body.classList.remove('correct');
        document.body.classList.remove('wrong');
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        nextButton.style.display = 'none';
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        setStatusClass(selectedButton, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        if (correct) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.style.display = 'block';
        } else {
            showResults();
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function showResults() {
        resultContainer.style.display = 'block';
        quizContainer.style.display = 'none';
        resultMessage.innerText = `Respuestas correctas: ${correctAnswers}\nRespuestas incorrectas: ${incorrectAnswers}`;
    }
});


// RECURSOS
document.getElementById('submit-button').addEventListener('click', function () {
    var contributionText = document.getElementById('contribution').value;
    var messageElement = document.getElementById('contribution-message');
    if (contributionText.trim() !== '') {
        // Simulación de envío exitoso
        setTimeout(function () {
            messageElement.style.display = 'block';
            messageElement.innerText = 'Su mensaje ha sido enviado. Muchas gracias por su aporte.';
            messageElement.className = 'success';
        }, 1000);
    } else {
        messageElement.style.display = 'block';
        messageElement.innerText = 'Por favor, rellena el campo antes de enviar.';
        messageElement.className = 'error';
    }
});