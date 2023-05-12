import { isEmpty } from "./fonctions"

export const validation_create_enchere = (data) => {
    const init_error = { hostID: "", title: "", files: "", description: "", started_price: "", reserve_price: "", increase_price: "", categories: "" }
    let error = init_error

    const { hostID, title, files, description, started_price, reserve_price, increase_price, categories } = data

    if (isEmpty(files)) error = { ...error, files: "Veuillez choisir au moins une image ou video" }
    else {
        files.forEach(img_vid => {
            if (!img_vid?.type && !img_vid?.size) {
                if (!upload_files_constants.FILES_ALLOW_TYPES_2.includes(img_vid?.substring(img_vid?.length - 4))) {
                    error = { ...error, files: "Seuls les fichiers JPEG, PNG, MP4 et MOV sont autorisés" }
                }
            } else {
                if ((img_vid.type && !upload_files_constants.FILES_ALLOW_TYPES.includes(img_vid.type))) {
                    error = { ...error, files: "Seuls les fichiers JPEG, PNG, MP4 et MOV sont autorisés" }
                } else {
                    const size = parseInt(convertOctetsToMo(img_vid.size), 10)
                    if (img_vid.size && size >= parseInt(convertOctetsToMo(upload_files_constants.MAX_SIZE))) {
                        error = { ...error, files: `La taille d'un fichier ne doit pas depasser ${convertOctetsToMo(upload_files_constants.MAX_SIZE)} Mo` }
                    }
                }
            }
        })
    }

    if (isEmpty(categories)) error = { ...error, categories: "Veuillez choisir au moins une categorie" }
    else if (categories.length > 3) error = { ...error, categories: "Le nombre maximal de choix doit être : 3" }
    else error = { ...error, categories: "" }

    if (isEmpty(hostID)) error = { ...error, hostID: "Veuillez renseigner le hostID" }

    if (isEmpty(title)) error = { ...error, title: "Veuillez renseigner le title" }
    else error = { ...error, title: "" }

    if (isEmpty(description)) error = { ...error, description: "Veuillez renseigner la description" }
    else error = { ...error, description: "" }


    if (isEmpty(started_price)) error = { ...error, started_price: "Veuillez renseigner le prix de depart" }
    else if (parseInt(started_price, 10) < 500) error = { ...error, started_price: "Le prix doit être superieur ou égale à 500 fcfa" }
    else error = { ...error, started_price: "" }

    if (isEmpty(reserve_price)) error = { ...error, reserve_price: "Veuillez renseigner le prix de reserve" }
    else if (parseInt(reserve_price, 10) < 500) error = { ...error, reserve_price: "Le prix doit être superieur ou égale à 500 fcfa" }
    else error = { ...error, reserve_price: "" }

    if (isEmpty(increase_price)) error = { ...error, increase_price: "Veuillez renseigner le prix d'incrementation" }
    else if (parseInt(increase_price, 10) < 500) error = { ...error, increase_price: "Le prix doit être superieur ou égale à 500 fcfa" }
    else error = { ...error, increase_price: "" }

    if (isEmpty(hostID)) error = { ...error, hostID: "Veuillez renseigner le hostID" }

    return { init_error, error }
}

export const validation_create_client = (data, users) => {
    const init_error = { phone: "", password: "", password_confirm: "" }
    let error = init_error

    const { phone, password, password_confirm } = data


    if (isEmpty(phone) || phone === "") error = { ...error, phone: "Un numéro de téléphone est requis." }
    else if (!(/(^(\+223|00223)?[5-9]{1}[0-9]{7}$)/).test(phone)) error = { ...error, phone: "Format du numéro de téléphone incorrect." }
    if (users?.some(user => user?.phone === phone)) error = { ...error, phone: "Ce compte existe déjà." }

    if (isEmpty(password) || password === "") error = { ...error, password: "Un mot de passe est requis." }
    else if (password.length < 6) error = { ...error, password: "Mot de passe trop court. Min: 6 caractères" }
    else if (password !== password_confirm) error = { ...error, password: "Les mots de passe ne se correspondent pas." }

    if (password !== password_confirm) error = { ...error, password_confirm: "Les mots de passe ne se correspondent pas." }

    return { init_error, error }
}

export const validation_create_admin = (data, users) => {
    const init_error = { phone: "", password: "", name: "", email: "" }
    let error = init_error

    const { phone, password, name, email } = data

    if (isEmpty(phone) || phone === "") error = { ...error, phone: "Un numéro de téléphone est requis." }
    else if (!(/(^(\+223|00223)?[5-9]{1}[0-9]{7}$)/).test(phone)) error = { ...error, phone: "Format du numéro de téléphone incorrect." }
    if (users?.some(user => user?.phone === phone)) error = { ...error, phone: "Ce compte existe déjà." }

    if (isEmpty(password) || password === "") error = { ...error, password: "Un mot de passe est requis." }
    else if (password.length < 6) error = { ...error, password: "Mot de passe trop court. Min: 6 caractères" }

    if (isEmpty(name) || name === "") error = { ...error, name: "Un nom est requis." }
    if (isEmpty(email) || email === "") error = { ...error, email: "Un e-mail est requis." }

    return { init_error, error }
}


export const validation_update_admin = (data, pass) => {
    const init_error = { phone: "", password: "", name: "", email: "" }
    let error = init_error

    const { phone, password, name, email } = data

    if (isEmpty(phone) || phone === "") error = { ...error, phone: "Un numéro de téléphone est requis." }
    else if (!(/(^(\+223|00223)?[5-9]{1}[0-9]{7}$)/).test(phone)) error = { ...error, phone: "Format du numéro de téléphone incorrect." }
    console.log(pass)
    if (password) {
        if (isEmpty(password) || password === "") error = { ...error, password: "Un mot de passe est requis." }
        else if (password.length < 6) error = { ...error, password: "Mot de passe trop court. Min: 6 caractères" }
    }

    if (isEmpty(name) || name === "") error = { ...error, name: "Un nom est requis." }
    if (isEmpty(email) || email === "") error = { ...error, email: "Un e-mail est requis." }

    return { init_error, error }
}


export const upload_files_constants = {
    MAX_FILES_TO_UPLOAD: 5,
    FILES_ALLOW_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/avi'],
    FILES_ALLOW_TYPES_2: ['.jpeg', '.jpg', '.png', '.mp4', '.avi'],
    MAX_SIZE: 10 * 1024 * 1024, //10 MO
}

export const convertOctetsToMo = (octets) => {
    const megaoctets = octets / (1024 * 1024)
    return megaoctets.toFixed(0)
}