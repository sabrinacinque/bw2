document.addEventListener('DOMContentLoaded', function () {

    // Ricevi i risultati dal local storage
    const correctScoreValue = localStorage.getItem('correctScore');
    const wrongScoreValue = localStorage.getItem('wrongScore');
    const totalQuestions = localStorage.getItem('totalQuestions');


    // Calcola le percentuali
    const correctPercentage = calculatePercentage(correctScoreValue, totalQuestions);
    const wrongPercentage = calculatePercentage(wrongScoreValue, totalQuestions);

    // Imposta le percentuali di colorazione ciano e viola
    var cyanPercent = parseFloat(correctPercentage); // Percentuale corretta
    var purplePercent = parseFloat(wrongPercentage); // Percentuale sbagliata

    // Calcola gli angoli per i colori ciano e viola
    var purpleAngle = 2 * Math.PI * (purplePercent / 100);
    var cyanAngle = 2 * Math.PI * (cyanPercent / 100);
    

    // Disegna l'anello con i colori ciano e viola
    drawRing('purple', -Math.PI / 2, -Math.PI / 2 + purpleAngle); // Viola
    drawRing('cyan', -Math.PI / 2 + purpleAngle, -Math.PI / 2 + purpleAngle + cyanAngle); // Ciano
    

    // Funzione per calcolare la percentuale
    function calculatePercentage(score, total) {
        return ((score / total) * 100).toFixed(1);//qui gli dico di mostrarmi una sola cifra dopo la virgola
    }

    function drawRing(color, startAngle, endAngle) {
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 120;
var lineWidth = 40;

ctx.beginPath();
ctx.arc(centerX, centerY, radius, startAngle, endAngle); // In senso orario
ctx.lineWidth = lineWidth;
ctx.strokeStyle = color;
ctx.shadowColor = '#000';
ctx.shadowBlur = 5;
ctx.shadowOffsetX = 3;
ctx.shadowOffsetY = 3;
ctx.stroke();



// qua gli dico:se il risultato è maggiore o uguale a 60,allora mi vai nell'if e mi fai queste cose 
if (cyanPercent >= 60) {
ctx.fillStyle = 'white';
ctx.font = 'bold 15px Arial';
ctx.textAlign = 'center';

//tutti questi ctx.fillText sono per inserire ciò che va scritto dentro il cerchio quando l'esame è superato
ctx.fillText('Congratulation!', centerX, centerY - 40);

//ce ne sono diversi di ctx.filltext perchè,in base a dove si colloca la scritta sull'asse delle y,ti scrive qualcosa

ctx.fillStyle = '#01F1F3';
ctx.font = 'bold 15px Arial';


ctx.fillText('You passed the exam', centerX, centerY - 20);


ctx.fillStyle = 'white';
ctx.font = 'normal 10px Arial';


ctx.fillText("We'll send you the certificate", centerX, centerY + 10);
ctx.fillText("in few minutes.", centerX, centerY + 30);
ctx.fillText("Check your email (including", centerX, centerY + 50);
ctx.fillText("promotions/spam folder).", centerX, centerY + 70); 

//Questa parte del codice verifica se document.attachEvent è definito nel contesto del browser.
//attachEvent è un metodo specifico di Internet Explorer per gestire gli eventi. Se il browser supporta attachEvent, allora il tipo di document.attachEvent sarà diverso da 'undefined'.
if (typeof document.attachEvent != 'undefined') {
window.attachEvent('onload', carnivalobjsByIole);
} else {//Se il browser non supporta attachEvent, viene eseguito il seguente codice con addEventListener
    window.addEventListener('load', carnivalobjsByIole, false);
}



} else {
//altrimenti se il punteggio non è sufficiente,scrivimi questo
ctx.fillStyle = 'white';
ctx.font = '16px Arial'; 
ctx.textAlign = 'center'; 
ctx.fillText("Sorry!", centerX, centerY - 30);
ctx.fillText("You didn't pass the exam", centerX, centerY);


 // e non fare avviare l'elemento coriandoli
 document.getElementById('confetti-canvas').style.display = 'none';
}
}

    // Seleziona gli elementi HTML in cui visualizzare i risultati
    const correctScoreElement = document.getElementById('correct-score');
    const wrongScoreElement = document.getElementById('wrong-score');
    const correctQuestionsElement = document.getElementById('correct-questions');
    const wrongQuestionsElement = document.getElementById('wrong-questions');

    // Visualizza i risultati
    correctScoreElement.textContent = `${correctPercentage}%`;
    wrongScoreElement.textContent = `${wrongPercentage}%`;
    correctQuestionsElement.textContent = `${correctScoreValue}/${totalQuestions} questions`;
    wrongQuestionsElement.textContent = `${wrongScoreValue}/${totalQuestions} questions`;

});



 /*******************************************************FUNZIONE CORIANDOLI*************************************** */


// Funzione per aggiungere i coriandoli
function carnivalobjsByIole() {
    JSFX215.Falling(2, "02");
    JSFX215.Falling(2, "03");
    JSFX215.Falling(2, "04");
    JSFX215.Falling(2, "05");
    JSFX215.Falling(2, "06");
    JSFX215.Falling(2, "07");
    JSFX215.Falling(2, "08");
    JSFX215.Falling(2, "09");
    JSFX215.Falling(2, "14");
    JSFX215.Falling(2, "15");
    JSFX215.Falling(2, "16");
    JSFX215.Falling(2, "17");
    JSFX215.Falling(2, "18");
    JSFX215.Falling(2, "19");
    JSFX215.Falling(2, "20");
    JSFX215.Falling(2, "21");
}

/*************************************FUNZIONE SUL BOTTONE RATE US DELLA PAGINA DEI RISULTATI************************************************ */

//metto una funzione così che quando clicco su rate us va sulla pagina dei feedback



function gotoFeedbackPage(){
    window.location.href = "feedback_page.html";
}






