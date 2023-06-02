//вибір усіх необхідних елементів
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// якщо натиснуто кнопку StartQuiz
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //показати інформаційне поле
}

// якщо натиснуто кнопку exitQuiz
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //сховати інформаційне поле
}

// якщо натиснуто кнопку «продовжити тест».
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //сховати інформаційне поле
    quiz_box.classList.add("activeQuiz"); //показати вiкно вiкторини
    showQuetions(0); //виклик функції showQestions
    queCounter(1); //передача 1 параметра queCounter
    startTimer(15); //виклик функції startTimer
    startTimerLine(0); //виклик функції startTimerLine
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// якщо натиснуто кнопку перезапуску Quiz
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //показати вiкно вiкторини
    result_box.classList.remove("activeResult"); //приховати вікно результатів
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //виклик функції showQestions
    queCounter(que_numb); //передача значення que_numb до queCounter
    clearInterval(counter); //чистий лічильник
    clearInterval(counterLine); //очищаємо counterLine
    startTimer(timeValue); //виклик функції startTimer
    startTimerLine(widthValue); //виклик функції startTimerLine
    timeText.textContent = "Залишилося часу"; //змінити текст timeText на Time Left
    next_btn.classList.remove("show"); //приховати наступну кнопку
}

// якщо натиснуто кнопку quitQuiz
quit_quiz.onclick = ()=>{
    window.location.reload(); //перезавантажити поточне вікно
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// якщо натиснуто кнопку Наступний запит
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //якщо кількість запитань менша за загальну довжину запитання
        que_count++; //збільшити значення que_count
        que_numb++; //збільшити значення que_numb
        showQuetions(que_count); //виклик функції showQestions
        queCounter(que_numb); //передача значення que_numb до queCounter
        clearInterval(counter); //очистити counter
        clearInterval(counterLine); //очистити counterLine
        startTimer(timeValue); //виклик функції startTimer
        startTimerLine(widthValue); //виклик функції startTimerLine
        timeText.textContent = "Залишилося часу"; //змініть timeText на Time Left
        next_btn.classList.remove("show"); //приховати наступну кнопку
    }else{
        clearInterval(counter); //очистити counter
        clearInterval(counterLine); //очистити counterLine
        showResult(); //виклик функції showResult
    }
}

// отримання запитань та варіантів із масиву
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //створення нового тегу span і div для питання і параметра і передача значення за допомогою індексу масиву
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //додавання нового тегу span всередині que_tag
    option_list.innerHTML = option_tag; //додавання нового тегу div всередині option_tag
    
    const option = option_list.querySelectorAll(".option");

    // встановити атрибут onclick для всіх доступних параметрів
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// створення нових тегів div для піктограм
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//якщо користувач натиснув опцію
function optionSelected(answer){
    clearInterval(counter); //очистити counter
    clearInterval(counterLine); //очистити counterLine
    let userAns = answer.textContent; //отримання вибраного користувачем параметра
    let correcAns = questions[que_count].answer; //отримання правильної відповіді з масиву
    const allOptions = option_list.children.length; //отримання всіх опцій
    
    if(userAns == correcAns){ //якщо обраний користувачем параметр дорівнює правильній відповіді масиву
        userScore += 1; //підвищення очкiв на 1
        answer.classList.add("correct"); //додавання зеленого кольору до правильного вибраного параметра
        answer.insertAdjacentHTML("beforeend", tickIconTag); //додавання значка галочки до правильного вибраного параметра
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //додавання червоного кольору до неправильного вибраного параметра
        answer.insertAdjacentHTML("beforeend", crossIconTag); //додавання значка хреста до правильного вибраного параметра
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //якщо є параметр, який відповідає масиву відповіді 
                option_list.children[i].setAttribute("class", "option correct"); //додавання зеленого кольору до відповідного варіанту
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //додавання значка галочки до відповідного параметра
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //як тільки користувач вибирає параметр, а потім відключає всі параметри
    }
    next_btn.classList.add("show"); //показувати наступну кнопку, якщо користувач вибрав будь-який параметр
}

function showResult(){
    info_box.classList.remove("activeInfo"); //приховати інформаційне поле
    quiz_box.classList.remove("activeQuiz"); //приховати вiкно вікторини
    result_box.classList.add("activeResult"); //показати вікно результатів
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // якщо користувач набрав більше 3 балів
        //створення нового тегу span і передача номера оцінки користувача та загального номера запитання
        let scoreTag = '<span>🎉🎉🎉 У Вас <p>'+ userScore +'</p> очкiв з <p>'+ questions.length +' 🎉🎉🎉</p></span>';
        scoreText.innerHTML = scoreTag;  //додавання нового тегу span всередині score_Text
    }
    else if(userScore > 1){ // якщо користувач набрав більше 1
        let scoreTag = '<span>😎😎 У Вас <p>'+ userScore +'</p> очкiв з <p>'+ questions.length +' 😎😎</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // якщо користувач набрав менше 1
        let scoreTag = '<span>😐 У Вас <p>'+ userScore +'</p> очкiв з <p>'+ questions.length +' 😐</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //змінюючи значення timeCount на значення часу
        time--; //зменшення значення часу
        if(time < 9){ //якщо таймер менше 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //додати 0 до значення часу
        }
        if(time < 0){ //якщо таймер менше 0
            clearInterval(counter); //очистити counter
            timeText.textContent = "Time Off"; //змінити текст часу на вихідний
            const allOptions = option_list.children.length; //отримання всіх опцій
            let correcAns = questions[que_count].answer; //отримання правильної відповіді з масиву
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //якщо є параметр, який відповідає масиву відповіді
                    option_list.children[i].setAttribute("class", "option correct"); //додавання зеленого кольору до відповідного варіанту
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //додавання значка галочки до відповідного параметра
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //як тільки користувач вибирає параметр, а потім відключає всі параметри
            }
            next_btn.classList.add("show"); //показувати наступну кнопку, якщо користувач вибрав будь-який параметр
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //оновлення значення часу на 1
        time_line.style.width = time + "px"; //збільшення ширини time_line на px за значенням часу
        if(time > 549){ //якщо значення часу більше 549
            clearInterval(counterLine); //очистити counterLine
        }
    }
}

function queCounter(index){
    //створення нового тегу span і передача номера запитання та загального запитання
    let totalQueCounTag = '<span><p>'+ index +'</p>/<p>'+ questions.length +'</p> Запитання</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //додавання нового тегу span всередині bottom_ques_counter
}