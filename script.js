//Création un tableau d'objet à l'aide de la méthode constructeur
// Le tableau sera ensuite affiché dans une table avec en colonne supplémentaire le check de la tâche terminée ainsi que la modification de la tâche et également sa suppression


// Déclaration des variables temporelles
let dateduJour = new Date();
let specificDate = new Date('2024-10-30'); // Date spécifique
console.log(dateduJour)


// Logo et Titre de l'application
let logo = document.createElement('img');
logo.classList.add('logo');
logo.src = 'logo.png'
logo.alt = 'logo de Dynatask';
logo.width = 300; 
logo.height = 200;
document.body.appendChild(logo);

let dynatask = document.createElement('h1');
dynatask.textContent = 'Organiseur de Tâches';
dynatask.classList.add('dynatask');
document.body.appendChild(dynatask);


// Création du tableau pour ensuite y stocker les objets
let listeDesTaches = [];


// Fonction constructeur pour la création des objets - 1ere lettre en majuscule par convention
function Creationtache (titre, description, dateEcheance) {
    this.titre = titre;
    this.description = description;
    this.dateEcheance = new Date(dateEcheance);
    this.tacheTerminee = false;
    this.marquerCommeTerminee = function() {
        this.tacheTerminee =  true;
    };
}


// Fonction pour ajouter une tache dans le tableau avec l'ajout de l'objet au début du tableau (utilisation de unshift au lieu de push)
function AjoutTache (titre, description, dateEcheance) {
    const nouvelleTache = new Creationtache(titre, description, dateEcheance);
    listeDesTaches.unshift(nouvelleTache);
    console.log(listeDesTaches); // Pour vérifier si l'ajout a bien été fait dans le tableau
    return nouvelleTache; // pour pouvoir y accéder diretement après l'ajout à la liste et si on l'appelle il sera avec déjà la maj
}



// CREATION DU BOUTON POUR LANCEMENT FENETRE POUR CREATION NOUVELLE TACHE

// Création du bouton pour saisir une nouvelle tâche(+ le bouton fera ouvrir la fenêtre)
const boutonNouvelleTache = document.createElement("button");
boutonNouvelleTache.textContent = "Nouvelle Tâche";
boutonNouvelleTache.classList.add('boutonNouvelleTache');     //ok classe copiée en haut
document.body.appendChild(boutonNouvelleTache);  // pour intégrer le bouton au body, si dans une autre section alors remplacer document.body


// Ajout de l'écouteur d'événement au bouton nouvelle tâche pour ouvrir la fenêtre
boutonNouvelleTache.addEventListener('click', function() {
    fenetreDeSaisie.style.display = 'block'; // le style était none, là on l'affiche
    //boutonNouvelleTache.style.display = 'none'; // on masque le bouton pour ajouter une tâche
    // ou plutot faire ça pour masquer visuellement le bouton sans l'enlever du flux de mise en page.
    boutonNouvelleTache.style.visibility = 'hidden';
});


// CREATION FENETRE DE SAISIE POUE LES ELMT DE CREATION ET MODIFICATION DES TACHES:

// Création de la fenêtre de saisie vide
let fenetreDeSaisie = document.createElement('p');
fenetreDeSaisie.classList.add('fenetreDeSaisie');     

// Fenêtre masquée tant qu'elle n'est pas appelée par le bouton nouvelle tache
fenetreDeSaisie.style.display = 'none'; // mis juste cette classe ici pour une meilleure compréhension du code

// Création des 3 champs de saisie
let champDeSaisieTitre = document.createElement('input');
champDeSaisieTitre.type = 'text';
champDeSaisieTitre.placeholder = 'Titre de la tâche';
fenetreDeSaisie.appendChild(champDeSaisieTitre);
fenetreDeSaisie.appendChild(document.createElement('br')); // pour ajouter un espace entre les champs
fenetreDeSaisie.appendChild(document.createElement('br')); // pour ajouter un espace entre les champs


//let champDeSaisieDescription = document.createElement('input');
let champDeSaisieDescription = document.createElement('textarea');
champDeSaisieDescription.setAttribute('rows',"6");
champDeSaisieDescription.setAttribute('cols',"40");
champDeSaisieDescription.type = 'text';
champDeSaisieDescription.placeholder = 'Description de la tâche';
fenetreDeSaisie.appendChild(champDeSaisieDescription);
fenetreDeSaisie.appendChild(document.createElement('br'));  // idem pour espace
fenetreDeSaisie.appendChild(document.createElement('br')); // pour ajouter un espace entre les champs


let champDeSaisieEcheance = document.createElement('input');
champDeSaisieEcheance.type = 'date';
champDeSaisieEcheance.placeholder = 'Date d"échéance';
fenetreDeSaisie.appendChild(champDeSaisieEcheance);
fenetreDeSaisie.appendChild(document.createElement('br'));

// Création du bouton pour la validation des saisies
let boutonValidationCreation = document.createElement('button');
boutonValidationCreation.textContent = 'Valider';
fenetreDeSaisie.appendChild(boutonValidationCreation);

// Ajout de la fenêtre de saisie au body
document.body.appendChild(fenetreDeSaisie);


//  Ajout de l'écouteur d'événement au bouton pour le validation des données
boutonValidationCreation.addEventListener('click', function() {
    let saisieUtilisateurTitre = champDeSaisieTitre.value;
    let saisieUtilisateurDescription = champDeSaisieDescription.value;
    let saisieUtilisateurEcheance = champDeSaisieEcheance.value;
    console.log('Champ titre:', saisieUtilisateurTitre);
    console.log('Champ descr:', saisieUtilisateurDescription);
    console.log('Champ echeance:', saisieUtilisateurEcheance);
    // Création en suivant de l'objet tache via la fonction du constructeur
    AjoutTache(saisieUtilisateurTitre, saisieUtilisateurDescription, saisieUtilisateurEcheance);
    // Mise à jour de l'affichage de la liste
    affichageListeDesTaches();
    // Réinitialisation des champs de saisie pour la prochaine tâche
    champDeSaisieTitre.value = '';
    champDeSaisieDescription.value = '';
    champDeSaisieEcheance.value = '';
    
    // Fermeture de la fenêtre après validation
    fenetreDeSaisie.style.display = 'none';
    // Afficjage à nouveau du bouton nouvvelle tache
    boutonNouvelleTache.style.visibility = 'visible'; // on rend à nouveau visible le bouton pour ajouter une tâche
});

console.log(listeDesTaches);

// ----------------------------------------------------------


// FONCTIONS POUR MODIFIER OU SUPPRIMER UNE TACHE
// Fonction pour modifier une tâche
// on peut aussi faire :
// function modifierTache(index) {
    // explication retrait ecouteurs
    //On utilise replaceWith pour remplacer le bouton par un clone, puis on réattribue la référence du clone à la variable boutonValidationCreation. Cela garantit qu’il n’y a plus d’écouteurs accumulés.
    
    //Suppression des anciens écouteurs : La méthode replaceWith(boutonValidationCreation.cloneNode(true)) remplace boutonValidationCreation par un clone, ce qui élimine tous les écouteurs précédents de ce bouton.
    //Ajout d'un nouvel écouteur : Après avoir nettoyé les écouteurs, on ajoute un nouvel événement click pour la modification de la tâche.
    //Ainsi, le code évite de créer plusieurs écouteurs et d'ajouter une tâche au lieu de la modifier.
    // ETAPES :
    // 1/ Clonage du bouton sans écouteurs : boutonValidationCreation.cloneNode(true) crée un clone du bouton sans ses événements.
    // 2/ Remplacement et réassignation : replaceWith(boutonClone) remplace le bouton original par le clone, et on met à jour la référence dans boutonValidationCreation.
    // 3/ Ajout du nouvel événement : Ensuite, on peut ajouter l’événement de modification unique au clone.

function modifierTache(item) {
    // On remplit les champs avec les valeurs actuelles de l'item
    champDeSaisieTitre.value = item.titre;
    champDeSaisieDescription.value = item.description;
    champDeSaisieEcheance.value = item.dateEcheance.toISOString().split('T')[0]; 

    // Affichage fenetre de saisie pour modification
    fenetreDeSaisie.style.display = 'block';
    boutonNouvelleTache.style.visibility = 'hidden'; // Masquer le bouton "Nouvelle Tâche"


    // Supprimer tous les anciens écouteurs "click" du bouton en créant un clone sans écouteurs
    let boutonClone = boutonValidationCreation.cloneNode(true);
    boutonValidationCreation.replaceWith(boutonClone);
    boutonValidationCreation = boutonClone; // Réassigner la référence du clone à la variable


    // Ajout du nouvel événement pour la modification
    boutonValidationCreation.addEventListener('click', function() {
        item.titre = champDeSaisieTitre.value;
        item.description = champDeSaisieDescription.value;
        item.dateEcheance = new Date(champDeSaisieEcheance.value);
    
    // Mise à jour de la tache apres de la modification
    affichageListeDesTaches(); // maj de la liste après modification
        
        // fermer les fenetres
        fenetreDeSaisie.style.display = 'none'; // remasquer la fenetre de saisie
        boutonNouvelleTache.style.visibility = 'visible'; // Rendre à nouveau visible le bouton
        // Réinitialiser les champs
        champDeSaisieTitre.value = '';
        champDeSaisieDescription.value = '';
        champDeSaisieEcheance.value = '';
    });
}




// Fonction pour supprimer une tâche
function supprimerTache(index) {
    listeDesTaches.splice(index, 1); // Supprime la tâche
    affichageListeDesTaches(); // Réafficher la liste après suppression
}

//----------------------


// AFFICHAGE DE LA LISTE DES TACHES

// Emplacement du tableau à l'écran
const emplacementListe = document.createElement('p');
document.body.appendChild(emplacementListe);
emplacementListe.classList.add('emplacementListe');


// Création des options de filtre et de tri
const filtre = document.createElement('select');
filtre.innerHTML = `
    <option value="toutes">Toutes</option>
    <option value="terminees">Terminées</option>
    <option value="nonterminees">Non terminées</option>
`;
filtre.addEventListener('change', affichageListeDesTaches);

const tri = document.createElement('select');
tri.innerHTML = `
    <option value="datecroissante">Par date d'échéance croissante</option>
    <option value="datedecroissante">Par date d'échéance croissante</option>
`;
tri.addEventListener('change', affichageListeDesTaches);

document.body.appendChild(filtre);
document.body.appendChild(tri);



// Fonction pour afficher le tableau de la liste des tâches

function affichageListeDesTaches() {

    let listeAffichee = listeDesTaches.slice();
    if (filtre.value === 'terminees') {
        listeAffichee = listeAffichee.filter(tache => tache.tacheTerminee === true);
    } else if (filtre.value === 'nonterminee') {
        listeAffichee = listeAffichee.filter(tache => tache.tacheTerminee === false);
    }

    if (tri.value === 'datecroissante') {
        listeAffichee.sort((a, b) => a.dateEcheance - b.dateEcheance);
    } else if (tri.value === 'datedecroissante') {
        listeAffichee.sort((a, b) => b.dateEcheance- a.dateEcheance);
    }



    // Vérifier si la liste est vide
    if (listeDesTaches.length === 0) {
        emplacementListe.textContent = "Aucune tâche à afficher.";
        return;
    }

    // Vider l'affichage actuel pour recréer la liste
    emplacementListe.innerHTML = ''; 
    
    // Création élément <ul>
    let ul = document.createElement('ul');

    // Création des entêtes des colonnes
    let liEntete = document.createElement('li');
    liEntete.classList.add('emplacementListe');

    let enteteCaseACocher = document.createElement('input');
    enteteCaseACocher.type = 'checkbox';
    enteteCaseACocher.style.visibility = 'hidden';



    let enteteTitre = document.createElement('section');
    enteteTitre.textContent = 'Titre de la tâche';
    enteteTitre.classList.add('colonneTitre')
    enteteTitre.classList.add('entete')

    let enteteDescription = document.createElement('section');
    enteteDescription.textContent = 'Description';
    enteteDescription.classList.add('colonneDescription');
    enteteDescription.classList.add('entete');


    let enteteDateEcheance = document.createElement('section');
    enteteDateEcheance.textContent = "Date d'écheance";
    enteteDateEcheance.classList.add('colonneDateEcheance');
    enteteDateEcheance.classList.add('entete');

    let enteteModif = document.createElement('img');
    enteteModif.title = "Modifier";
    enteteModif.src = 'iconemodifier.png';
    enteteModif.classList.add('icone');
    enteteModif.style.visibility = 'hidden';

    let enteteSup = document.createElement('img');
    enteteSup.src = 'iconesupprimer.png'; 
    enteteSup.title = "Supprimer";
    enteteSup.classList.add('icone');
    enteteSup.style.visibility = 'hidden';



    // Ajout des entetes au liEntete
    liEntete.appendChild(enteteCaseACocher);
    liEntete.appendChild(enteteTitre);
    liEntete.appendChild(enteteDescription);
    liEntete.appendChild(enteteDateEcheance);
    liEntete.appendChild(enteteModif);
    liEntete.appendChild(enteteSup);
    ul.appendChild(liEntete);

    // Ajout des toutes les taches au ul
    listeDesTaches.forEach(function(item, index) { // mis index en plus de item pour y accéder directement pour la suppression
        let li = document.createElement('li');
        li.classList.add('emplacementListe');
        //li.textContent = `${item.titre} - ${item.description} - ${item.dateEcheance.toDateString()}`;

        // Création section pour chaque propriété

        // Création d'une checkbox pour marquer la tâche comme terminée
        let caseAcocherPourTacheTermine = document.createElement('input');
        caseAcocherPourTacheTermine.type = 'checkbox';
        caseAcocherPourTacheTermine.checked = item.tacheTerminee;
        caseAcocherPourTacheTermine.classList.add('caseAcocherPourTacheTermine');
        caseAcocherPourTacheTermine.addEventListener('change', function() {
            item.tacheTerminee = caseAcocherPourTacheTermine.checked;
            affichageListeDesTaches();  // pour maj
        });

        // Autres sections

        let sectionTitre = document.createElement('article');
        sectionTitre.textContent = item.titre;
        sectionTitre.classList.add('colonneTitre');

        let sectionDescription = document.createElement('article');
        sectionDescription.textContent = item.description;
        sectionDescription.classList.add('colonneDescription');

        let sectionDateEcheance = document.createElement('article');
        sectionDateEcheance.textContent = item.dateEcheance.toDateString();
        sectionDateEcheance.classList.add('colonneDateEcheance');

        // Création en plus sur la ligne des icones modifier et supprimer
        // Modification
        //On souhaites modifier une tâche lorsque l'utilisateur clique sur l'icône de modification :
        //Ici, item est la tâche actuelle, et on n'a pas besoin d'utiliser l'index puisque la fonction modifierTache reçoit directement l'objet item. Cependant, si on voulait faire des choses qui nécessitaient l'index, on pourrait le passer aussi.

        let iconeModif = document.createElement('img');
        iconeModif.src = 'iconemodifier.png'; 
        iconeModif.alt = 'Modifier';
        iconeModif.title = "Modifier"; 
        iconeModif.classList.add('icone');

        iconeModif.addEventListener('click', function() {
            modifierTache(item);// Appel à la fonction de modification
        })

        // Suppression
        //Pour supprimer la tâche correspondante, on pourrait faire ceci :
        //Dans ce cas, index est passé à la fonction supprimerTache, permettant à cette fonction de savoir quelle tâche supprimer en utilisant splice(index, 1).

        let iconeSup = document.createElement('img');
        iconeSup.src = 'iconesupprimer.png'; 
        iconeSup.alt = 'Supprimer';
        iconeSup.title = "Supprimer";
        iconeSup.classList.add('icone');
        iconeSup.onclick = function() {
        supprimerTache(index); // Appel à la fonction de suppression avec l'index
        };
            // Résumé
// forEach : Utilise forEach pour itérer sur le tableau, et l'index est automatiquement fourni comme argument.
// Modification/Suppression : Passes l'index aux fonctions de modification ou de suppression pour identifier la tâche concernée.


        // Ajout de chaque section au li
        li.appendChild(caseAcocherPourTacheTermine);
        li.appendChild(sectionTitre);
        li.appendChild(sectionDescription);
        li.appendChild(sectionDateEcheance);
        li.appendChild(iconeModif);
        li.appendChild(iconeSup);

        ul.appendChild(li);
    });

    // Ajouter la liste mise à jour à l'emplacementListe
    emplacementListe.appendChild(ul);
}
    
// Appel de la fonction pour mettre à jour l'affichage chaque fois qu'une tâche est ajoutée
affichageListeDesTaches();

//---------------------------------------------

 

