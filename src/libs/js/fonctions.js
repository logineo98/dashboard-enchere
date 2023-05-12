// VERIFIER SI UN ELEMENT EST VIDE
export const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

// HANDLE CHANGE D'UN USESTATE DE TYPE OBJET
export const handleChange = (e, setInputs) => {
    const { name, value } = e.target;
    setInputs((other) => {
        return {
            ...other,
            [name]: value,
        };
    });
};

export const handleChangeCheck = (e, setInputs) => {
    const { name, checked } = e.target;
    setInputs((other) => {
        return {
            ...other,
            [name]: checked,
        };
    });
};

export const dateConvertor = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
};

// VERIFIER QUE LES ELEMENTS D'UN TABLEAU SONT INCLUS DANS UN AUTRE TABLEAU
export const areIn = (arr1, arr2) => {
    return arr1?.some((arr) => arr2?.includes(arr));
};

// VERIFIER SI UN ELEMENT EXISTE DANS IN TABLEAU
export const isIn = (element, arr) => {
    return arr.includes(element);
};

// FAIRE LA SOMME DE TOUS LES ELEMENTS D'UN TABLEAU
export const sum = (arr) => {
    return arr.reduce((a, b) => a + b, 0);
};

// GENENRER UNE CHAINE DE CARATERE ALEATOIRE UNIQUE
export const randomdString = () => {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return uniqid;
};

// SUPPRIMER TOUTES LES OCCURENCES D'UN ELEMENT DANS UN TABLEAU
export const removeItemAll = (arr, value) => {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
};

// SUPPRIMER LA PREMIERE OCCURENCE D'UN ELEMENT DANS UN TABLEAU
export const removeItemOnce = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};

export const setPath = (value) => {
    localStorage.setItem("previousPath", value)
};

export function convertDateToMillis(date) {
    return new Date(date).getTime();
}

export function ExpirationVerify(date) {
    const isExpired = convertDateToMillis(date) - new Date().getTime()
    return isExpired > 0 ? false : true
}




export const convertOctetsToMo = (octets) => {
    const megaoctets = octets / (1024 * 1024)
    return megaoctets.toFixed(0)
}

export const formatNumberWithSpaces = (data, separator) => data?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, separator || ".");


export const inputSeparator = (e, setInputs) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ''); // supprimer tous les caractères qui ne sont pas des chiffres
    const formattedValue = Number(inputValue).toLocaleString(); // ajouter un séparateur de milliers
    setInputs(formattedValue);
}

export const separatorMille = (value) => {
    const inputValue = value.replace(/[^0-9]/g, '.');
    return Number(inputValue).toLocaleString();
}

export const inputSeparatorMille = (e, fieldName, setInputs) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ''); // supprimer tous les caractères qui ne sont pas des chiffres
    const formattedValue = Number(inputValue).toLocaleString(); // ajouter un séparateur de milliers
    setInputs(prevState => ({ ...prevState, [fieldName]: formattedValue }));
};

export const deleteSeparator = (input) => { return input.replace(/\D/g, '') }


export const separatorhandleChange = (e, val, setInputs) => {
    const { name, value } = e.target;
    const formattedValue = name === val ? Number(value).toLocaleString() : value;
    setInputs(prevState => ({ ...prevState, [name]: formattedValue }));
}