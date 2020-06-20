window.onload = () =>{
    "use strict";
//Declaration des variables globales
let dureeSec     = 0;  
let distanceCalc = 0;
let base         = 5;
let prixDuree    = 0.50;
let prixKm       = 1.55;

//Demarrage de l'effet slide au chargement de la page
labelDuree.classList     .add("slide");
spanPrixAttente.classList.add("slide");
labelDistance.classList  .add("slide");
divBase.classList        .add("slide");
//Mise à jour du prix de base
divBase.innerHTML = `Prix de Base: <em>${base}€</em>`;


uberX.onclick = () => {
    //Mise à jour des prix
    base      = 1.20;
    prixDuree = 0.31;
    prixKm    = 1.05;
    divBase.innerHTML = `Prix de Base: <em>${base}0€</em>`;
    labelDuree.textContent = '0.31€/min';
    labelDistance.textContent = '1.05€/kms';
    calcul();
    //Toggle de l'effet css sur les radios
    document.querySelectorAll("label")[1].classList.add('checked');
    document.querySelectorAll("label")[0].classList.remove('checked');

    //Redemarrage de l'effet slide via un setTimeout
    labelDuree.classList.remove("slide");
    labelDistance.classList.remove("slide");
    divBase.classList.remove("slide");

    setTimeout(()=>{
        labelDuree.classList.add("slide");
        labelDistance.classList.add("slide");
        divBase.classList.add("slide");
    },300);
};
    
van.onclick   = () => {     
    base      = 5;
    prixDuree = 0.50;
    prixKm    = 1.55;
    divBase.innerHTML = `Prix de Base: <em>${base}€</em>`;
    labelDuree.textContent = '0.50€/min';
    labelDistance.textContent = '1.55€/kms'; 
    calcul(); 
    document.querySelectorAll("label")[1].classList.remove('checked');
    document.querySelectorAll("label")[0].classList.add('checked'); 

    labelDuree.classList.remove("slide");
    labelDistance.classList.remove("slide");
    divBase.classList.remove("slide");
    
    setTimeout(()=>{
        labelDuree.classList.add("slide");
        labelDistance.classList.add("slide");
        divBase.classList.add("slide");
    },300);
};

//Mise à jour en temps reel des prix en fonction des inputs
duree.onchange = () => {
    calcul(); 
    spanDuree.classList.add("slide");
    if(duree.value == "" || duree.value == "00:00") spanDuree.classList.remove("slide");
    //effet scale sur divRevenu 
    divRevenu.classList.add("scale15");
    setTimeout(()=>{divRevenu.classList.remove("scale15")},300);
};

distance.oninput   = () => {
    if(distance.value.length >7) //empeche la saisie d'un nombre de plus de 7 chiffres
        distance.value = Math.trunc((distance.value)/10);

    calcul(); 
    spanDistance.classList.add("slide");
    if(distance.value == "") spanDistance.classList.remove("slide");

    divRevenu.classList.add("scale15");
    setTimeout(()=>{divRevenu.classList.remove("scale15")},300);
};

attente.oninput   = () => {
    if(attente.value.length >6) //empeche la saisie d'un nombre de plus de  chiffres
        attente.value = Math.trunc((attente.value)/10);
    calcul();
    spanAttente.textContent = "+" + attente.value + "€"; 
    spanAttente.classList.add("slide");
    if(attente.value == "") spanAttente.classList.remove("slide");

    divRevenu.classList.add("scale15");
    setTimeout(()=>{divRevenu.classList.remove("scale15")},300);
};
 
const calcul   = () => {
    dureeSec   = (new Date('1970-01-01T' + duree.value   + 'Z').getTime()/1000*prixDuree/60).toFixed(2); //conversion en seconde
    if (isNaN(dureeSec)) dureeSec = 0; //si NaN, prend la valeur 0
    spanDuree.textContent = "+" + dureeSec + "€";
    
    distanceCalc = (distance.value*prixKm).toFixed(2);
    spanDistance.textContent = "+" + distanceCalc + "€"; //onchange ne marche pas sur number

    //let total  = (Number(dureeSec)+Number(attenteSec)+Number(distanceCalc)+base).toFixed(2);
    let total  = (Number(dureeSec) + Number(attente.value) + Number(distanceCalc) + base).toFixed(2);
    let frais  = (total*0.25).toFixed(2);
    let revenu = (total-frais).toFixed(2);
    spanTotal.textContent  = total  + "€";
    spanFrais.textContent  = "-" + frais + "€";
    
    //Affiche l'effet translate si aucune valeur est nulle
    if(dureeSec == 0  && distanceCalc == 0 && attente.value == 0) 
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

/************Permettre le 100vh sur mobile */
let vh = window.innerHeight * 0.01;
const hauteur = window.innerHeight;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


//const metas = document.getElementsByTagName('meta');
//metas[1].content = 'width=device-width, height=' + window.innerHeight + ' initial-scale=1.0, maximum-scale=5.0,user-scalable=0';


/*********************************** */
};