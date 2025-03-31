// Règle de validation pour un champ requis
export const requiredRule = (fieldName = "Ce champ") => {
    return (value) => {
        // Retourne une fonction de validation qui vérifie si la valeur est null, undefined ou vide
        if (value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        return `${fieldName} est requis`;
        }
        return true;
    };
};

// Règle de validation pour un champ avec un minimum de caractères
export const minRule = (min) => { 
    // Retourne une fonction de validation qui vérifie si la longueur de la valeur est suffisante
    return (value) => {
        return value?.length >= min || `Ce champ doit contenir au moins ${min} caractères`;
    };
};

// Règle de validation pour un email valide
export const emailRule = (value) => {
    if (!value) return "L'email est requis";
    // Définition de la regex pour vérifier la validité de l'email
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(value) || "Entrez un email valide";
};

// Règle de validation pour un mot de passe valide
export const passwordRule = (value) => {
    if (!value) return "Veuillez entrer un mot de passe";
    // Définition de la regex pour vérifier la complexité du mot de passe
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(value) || "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
}
