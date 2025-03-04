export const requiredRule = (fieldName = "Ce champ") => {
    return (value) => {
        if (value === null || value === undefined || value === "") {
        return `${fieldName} est requis`;
        }
        return true;
    };
};

export const minRule = (min) => { 
    return (value) => {
        return value.length >= min || `Ce champ doit contenir au moins ${min} caractères`;
    };
};

export const emailRule = (value) => {
    if (!value) return "L'email est requis";
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(value) || "Entrez un email valide";
};

export const passwordRule = (value) => {
    if (!value) return "Veuillez entrer un mot de passe";
    const regex = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(value) || "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
}
