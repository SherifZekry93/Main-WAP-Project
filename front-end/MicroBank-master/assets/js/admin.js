

var section1 = document.getElementById("sec1");
var section2 = document.getElementById("sec2");
var section3 = document.getElementById("sec3");

function depositeMenu() {
    if (section2.className === 'hidden') {
        section1.className = 'hidden';
        section3.className = 'hidden';
        section2.className = 'show';    
    }
}
function listTransactionMenu() {

    if (section3.className === 'hidden') {
        section2.className = "hidden";
        section1.className = "hidden";
        section3.className = "show";

    }
}
function createAccountMenu() {
     if (section1.className === 'hidden') {
         section2.className = 'hidden';
         section3.className = 'hidden';
         section1.className = 'show ';

     }
 }