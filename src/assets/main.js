let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function setHiddenFields() {
    var randomNumber = Math.floor(Math.random()*10000)
    randomNumber = randomNumber.toString()

    while (randomNumber.length < 4) {
        randomNumber = '0' + randomNumber
    }

    answer.value = randomNumber
    attempt.value = 0
}

function setMessage(message) {
    var label = document.getElementById('message')

    label.textContent = message
}

function validateInput(value) {
    if (value.toString().length == 4) {
        return true
    }

    setMessage('Guesses must be exactly 4 characters long.')
    return false
}

function getResults(userInput) {
    var results = document.getElementById('results')
    var allCorrect = true

    results.innerHTML += '<div class="row"><span class="col-md-6">'

    for (var i = 0; i < userInput.length; i++) {
        console.log(userInput, answer.value)
        if (userInput[i] == answer.value[i]) {
            results.innerHTML += '<span class="glyphicon glyphicon-ok"></span>'
        } else if (answer.value.indexOf(userInput[i]) != -1) {
            allCorrect = false
            results.innerHTML += '<span class="glyphicon glyphicon-transfer"></span>'
        } else {
            allCorrect = false
            results.innerHTML += '<span class="glyphicon glyphicon-remove"></span>'
        }
    }

    results.innerHTML += '</span></div>'

    return allCorrect
}

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' && attempt.value == '') {
        setHiddenFields()
    }

    if (!validateInput(input.value)) {
        return false
    }

    attempt.value = parseInt(attempt.value) + 1

    if (getResults(input.value)) {
        setMessage('You Win! :)')
        showAnswer(true)
        showReplay()
    } else if (parseInt(attempt.value) >= 10) {
        setMessage('You Lose! :(')
        showAnswer(false)
        showReplay()
    } else {
        setMessage('Incorrect, try again.')
    }
}

//implement new functions here
function showAnswer(won) {
    var codeLabel = document.getElementById('code')

    codeLabel.innerHTML = answer.value

    if (won) {
        codeLabel.className += ' success'
    } else {
        codeLabel.className += ' failure'
    }
}

function showReplay() {
    var guessingDiv = document.getElementById('guessing-div')
    var replayDiv = document.getElementById('replay-div')

    guessingDiv.style.display = 'none'
    replayDiv.style.display = 'block'
}