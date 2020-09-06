"use strict";
//Declaration des variables globales //Defaut UberVan
let duree        = 0;
let distanceCalc = 0;
let base         = 5;
let prixDuree    = 0.50;
let prixKm       = 1.55;
spanBase.textContent = "+" + base + "€"; //Mise à jour du prix de base

//Gestion LocalStorage UberX/UberVan
if(localStorage.getItem("type") == "uberX") 
{
    //Mise à jour des prix UberX
    uberX.checked = true;
    base      = 1.20;
    prixDuree = 0.31;
    prixKm    = 1.05;
    spanBase.textContent = "+" + base + "0€";
    labelDuree.textContent = '0.31€/min';
    labelDistance.textContent = '1.05€/kms';
}

//Demarrage de l'effet slide au chargement de la page
labelDuree.classList     .add("slide");
spanPrixAttente.classList.add("slide");
labelDistance.classList  .add("slide");
spanBase.classList       .add("slide");



uberX.onclick = () => {
    //Mise à jour des prix
    base      = 1.20;
    prixDuree = 0.31;
    prixKm    = 1.05;
    spanBase.textContent = "+" + base + "0€";
    labelDuree.textContent = '0.31€/min';
    labelDistance.textContent = '1.05€/kms';
    calcul();
    //Toggle de l'effet css sur les radios
    document.querySelectorAll("label")[1].classList.add('checked');
    document.querySelectorAll("label")[0].classList.remove('checked');

    localStorage.setItem("type", "uberX"); //sauvegarde du choix dans le localstorage

    //Redemarrage de l'effet slide via un setTimeout
    labelDuree.classList.remove("slide");
    labelDistance.classList.remove("slide");
    spanBase.classList.remove("slide");

    setTimeout(()=>{
        labelDuree.classList.add("slide");
        labelDistance.classList.add("slide");
        spanBase.classList.add("slide");
    },300);
};
    
van.onclick   = () => {     
    base      = 5;
    prixDuree = 0.50;
    prixKm    = 1.55;
    spanBase.textContent = "+" + base + "€";
    labelDuree.textContent = '0.50€/min';
    labelDistance.textContent = '1.55€/kms'; 
    calcul(); 
    document.querySelectorAll("label")[1].classList.remove('checked');
    document.querySelectorAll("label")[0].classList.add('checked'); 

    localStorage.setItem("type", "van"); //sauvegarde du choix dans le localstorage

    labelDuree.classList.remove("slide");
    labelDistance.classList.remove("slide");
    spanBase.classList.remove("slide");
    
    setTimeout(()=>{
        labelDuree.classList.add("slide");
        labelDistance.classList.add("slide");
        spanBase.classList.add("slide");
    },300);
};

//Mise à jour en temps reel des prix en fonction des inputs
const liveUpdate = (input,span) =>{
    calcul(); 
    span.classList.add("slide");
    if(span == spanDuree && duree == 0.00) span.classList.remove("slide");
    else if(input.value == "")             span.classList.remove("slide");
    
    divRevenu.classList.add("scale15");
    setTimeout(()=>{divRevenu.classList.remove("scale15")},300);
};
//----------Gestion des focus---------------------------
let hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
//Quand la page perd la visibilité, le focus d'un input actif est enlevé pour eviter son effacement
document.addEventListener(visibilityChange, ()=>{document.activeElement.blur()}, false);

hour.onfocus     = () => {hour.value     = ""; calcul();if(duree == 0.00) spanDuree.classList.remove("slide");} 
minute.onfocus   = () => {minute.value   = ""; calcul();if(duree == 0.00) spanDuree.classList.remove("slide");} 
seconde.onfocus  = () => {seconde.value  = ""; calcul();if(duree == 0.00) spanDuree.classList.remove("slide");} 
distance.onfocus = () => {distance.value = ""; liveUpdate(distance,spanDistance);};
attente.onfocus  = () => {attente.value  = ""; liveUpdate(attente,spanAttente);};
coeff.onfocus    = () => coeff.value = "";

//----------Gestion des inputs en temps réel--------------
hour.oninput    = () => liveUpdate(hour,spanDuree);
minute.oninput  = () => liveUpdate(minute,spanDuree);
seconde.oninput = () => liveUpdate(seconde,spanDuree);

distance.oninput   = () => {
    let regex = /^\d{1,4}(\.\d{0,2})?$|^\d{1,4}(,\d{0,2})?$/; //regex pour controle autorisé uniquement nombre avec 2 chiffres apres virgule
    distance.value = distance.value.replace(",","."); //remplace "," par "."
    if (!regex.test(distance.value))
        distance.value = distance.value.substring(0,distance.value.length-1);//supprime le dernier caractere non autorisé

    liveUpdate(distance,spanDistance);
};

attente.oninput   = () => {
    let regex = /^\d{1,3}(\.\d{0,2})?$|^\d{1,3}(,\d{0,2})?$/;
    attente.value = attente.value.replace(",",".");
    if (!regex.test(attente.value))
        attente.value = attente.value.substring(0,attente.value.length-1);

    liveUpdate(attente,spanAttente);
};

coeff.oninput   = () => {
    let regex = /^\d{1}(\.\d{0,1})?$|^\d{1}(,\d{0,1})?$/;
    coeff.value = coeff.value.replace(",",".");
    if (!regex.test(coeff.value))
        coeff.value = coeff.value.substring(0,coeff.value.length-1);

    calcul();
    divRevenu.classList.add("scale15");
    setTimeout(()=>{divRevenu.classList.remove("scale15")},300);
};

//----------Gestion des calculs-------------- 
const calcul   = () => {
    duree = ((Number(hour.value)*60 + Number(minute.value) + Number(seconde.value)/60)*prixDuree).toFixed(2);
    spanDuree.textContent = "+" + duree + "€";
    
    distanceCalc = (distance.value*prixKm).toFixed(2);
    spanDistance.textContent = "+" + distanceCalc + "€"; 

    spanAttente.textContent = "+" + attente.value + "€"; 

    let multi = (coeff.value == "")? 1 : coeff.value; //coefficient dynamique

    let total  = ((Number(duree) + Number(attente.value) + Number(distanceCalc) + base)*multi).toFixed(2);
    if( total/multi <15 && van.checked)       total = 15*multi + Number(attente.value);
    else if (total/multi <6 && uberX.checked) total =  6*multi + Number(attente.value);

    let frais  = (total*0.25).toFixed(2);
    let revenu = (total-frais).toFixed(2);
    spanTotal.textContent  = total  + "€";
    spanFrais.textContent  = "-" + frais + "€";
    
    //Active l'effet translate si aucune valeur est nulle
    if(duree == 0  && distanceCalc == 0 && attente.value == 0) 
    {
        spanTotal.classList.remove("slide");
        spanFrais.classList.remove("slide");
        divRevenu.textContent = "0€";
    }

    else 
    {
        spanTotal.classList.add("slide");
        spanFrais.classList.add("slide");
        divRevenu.textContent = revenu + "€";
    }
};

//*************Service Worker ******************/
//Register service worker to control making site work offline
if('serviceWorker' in navigator)
{
	navigator.serviceWorker
			 .register('/uber-verif/sw.js', {scope: '/uber-verif/'})
			 .then(function() { console.log('Service Worker for uber-verif Registered'); });
}

/************Permettre le 100vh sur mobile */
let vh = window.innerHeight * 0.01;
const hauteur = window.innerHeight;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

const metas = document.getElementsByTagName('meta');
metas[1].content = 'width=device-width, height=' + window.innerHeight + ' initial-scale=1.0, maximum-scale=5.0,user-scalable=0';
