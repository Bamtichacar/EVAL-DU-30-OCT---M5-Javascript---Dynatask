//création un tableau d'objet à l'aide de la méthode constructeur


// Déclaration des variables temporelles
let DateduJour = new Date();
//let specificDate = new Date('2024-10-30'); // Date spécifique


// Fonction constructeur pour la création des objets - 1ere lettre en majuscule par convention
function Creationtache (titre, description, dateEcheance) {
    this.titre = titre;
    this.description = description;
    this.dateEcheance = dateEcheance;
    this.tacheTerminee = false;
    this.marquerCommeTerminee = function() {
        this.tacheTerminee =  true;
    };
}

// Création du tableau pour ensuite y stocker les objets
let listeDesTaches = [];

// Fonction pour ajouter une tache dans le tableau avec l'ajout de l'objet au début du tableau (utilisation de unshift au lieu de push)
function AjoutTache (titre, description, dateEcheance) {
    const nouvelleTache = new Creationtache(titre, description, dateEcheance);
    listeDesTaches.unshift(nouvelleTache);
}
