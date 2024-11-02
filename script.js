//Création un tableau d'objet à l'aide de la méthode constructeur
// Le tableau sera ensuite affiché dans une table avec en colonne supplémentaire le check de la tâche terminée ainsi que la modification de la tâche et également sa suppression


// Déclaration des variables temporelles
let dateduJour = new Date();
let specificDate = new Date('2024-10-30'); // Date spécifique
console.log(dateduJour)

// Liste des classes
//boutonNouvelleTache.classList.add('boutonNouvelleTache');
//fenetreDeSaisie.classList.add('fenetreDeSaisie');




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

// Création du tableau pour ensuite y stocker les objets
let listeDesTaches = [];
// Affichage du tableau à l'écran
const emplacementListe = document.createElement('p');
document.body.appendChild(emplacementListe);


//------------------------------------------------

// Fonction pour afficher le tableau de la liste des tâches
// finalement non mis, ne rend pas bien
/* function afficheListeDesTaches() {
    // Vider l'affichage actuel pour recréer la liste
    emplacementListe.innerHTML = ''; 
    
    // Créer un nouvel élément <ul>
    let ul = document.createElement('ul');
    listeDesTaches.forEach(function(item) {
        let li = document.createElement('li');
        li.textContent = `${item.titre} - ${item.description} - ${item.dateEcheance.toDateString()}`;
        ul.appendChild(li);
    });
    
    // Ajouter la liste mise à jour à l'emplacementListe
    emplacementListe.appendChild(ul);
}

 */

function afficheListeDesTaches() {
    // Vider l'affichage actuel pour recréer la liste
    emplacementListe.innerHTML = ''; 
        // Vérifier si la liste est vide
        if (listeDesTaches.length === 0) {
            emplacementListe.textContent = "Aucune tâche à afficher.";
            return;
        }

            // Création du conteneur de la liste
    let grillePourListe = document.createElement('section');
    grillePourListe.id = 'grillePourListe'; // Ajout de l'ID pour le style CSS
    listeDesTaches.forEach(function (item) {
        // Création de la cellule pour chaque tâche
        let cellule = document.createElement('article');
        cellule.classList.add('cellule'); // Ajouter la classe pour le style
        cellule.textContent = `${item.titre} - ${item.description} - ${item.dateEcheance.toDateString()}`;
        grillePourListe.appendChild(cellule);
    });
        // Ajouter la liste mise à jour à l'emplacementListe
        emplacementListe.appendChild(grillePourListe);
}



//--------------------------------------------

// Fonction pour ajouter une tache dans le tableau avec l'ajout de l'objet au début du tableau (utilisation de unshift au lieu de push)
function AjoutTache (titre, description, dateEcheance) {
    const nouvelleTache = new Creationtache(titre, description, dateEcheance);
    listeDesTaches.unshift(nouvelleTache);
    return nouvelleTache; // pour pouvoir y accéder diretement après l'ajout à la liste et si on l'appelle il sera avec déjà la maj
}

const devoir = AjoutTache("he", "cestmoi", "2024-10-30");

console.log(devoir);
console.log(listeDesTaches);





// Création fenêtre de saisie pour les éléments de création ou de modification des tâches


// CREATION DE LA FENETRE DE SAISIE :

// Création de la fenêtre de saisie vide
let fenetreDeSaisie = document.createElement('p');
fenetreDeSaisie.classList.add('fenetreDeSaisie');     //ok classe copiée en haut

// Fenêtre masquée tant qu'elle n'est pas appelée par le bouton nouvelle tache
fenetreDeSaisie.style.display = 'none'; // mis juste cette classe ici pour une meilleure compréhension du code


// Création des 3 champs de saisie
let champDeSaisieTitre = document.createElement('input');
champDeSaisieTitre.type = 'text';
champDeSaisieTitre.placeholder = 'Titre de la tâche';
fenetreDeSaisie.appendChild(champDeSaisieTitre);
fenetreDeSaisie.appendChild(document.createElement('br')); // pour ajouter un espace entre les champs

//let champDeSaisieDescription = document.createElement('input');
let champDeSaisieDescription = document.createElement('textarea');
champDeSaisieDescription.setAttribute('rows',"5");
//champDeSaisieDescription.setAttribute('cols',"50");
champDeSaisieDescription.type = 'text';
champDeSaisieDescription.placeholder = 'Description de la tâche';
fenetreDeSaisie.appendChild(champDeSaisieDescription);
fenetreDeSaisie.appendChild(document.createElement('br'));  // idem pour espace

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
//---------

// Création du bouton pour saisir une nouvelle tâche(+ le bouton fera ouvrir la fenêtre)
const boutonNouvelleTache = document.createElement("button");
boutonNouvelleTache.textContent = "Nouvelle Tâche";
//boutonNouvelleTache.classList.add('boutonNouvelleTache');     //ok classe copiée en haut
document.body.appendChild(boutonNouvelleTache);  // pour intégrer le bouton au body, si dans une autre section alors remplacer document.body


// Ajout de l'écouteur d'événement au bouton nouvelle tâche pour ouvrir la fenêtre
boutonNouvelleTache.addEventListener('click', function() {
    fenetreDeSaisie.style.display = 'block'; // le style était none, là on l'affiche
    //boutonNouvelleTache.style.display = 'none'; // on masque le bouton pour ajouter une tâche
    // ou plutot faire ça pour masquer visuellement le bouton sans l'enlever du flux de mise en page.
    boutonNouvelleTache.style.visibility = 'hidden';

});

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
    afficheListeDesTaches();
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

















