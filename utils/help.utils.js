const fs = require("fs");
const ObjectId = require('mongoose').Types.ObjectId;
const crypto = require('crypto');
const {rsaEncrypt, rsaDecrypt} = require("./crypto.help");

// Validator function
function isValidObjectId(id){
    if(ObjectId.isValid(id)){
        return (String)(new ObjectId(id)) === id;
    }
    return false;
}

function randomValueHex () {
    function randomValueHex (len) {
        return crypto.randomBytes(Math.ceil(len/2))
            .toString('hex') // convert to hexadecimal format
            .slice(0,len).toUpperCase();   // return required number of characters
    }

    return  randomValueHex(32)
}

async function uploadFile(data) {
    console.log(data)
    // Initialisation des variables
    let base64Data
    let ext
    // On set l'extenion sur fichier à enregistrer
    ext = '.' + data.name.split('.').pop()

    // Et on retire la balise data - base64 du fichier
    // Pour pouvoir l'entregistrer
    base64Data = data.file.replace(/^data:([A-Za-z-+\/]+);base64,/, "")

    // On set le nom du fichier tel qu'il
    // Sera enregistrer sur le serveur
    const filename = new Date().getTime() + ext
    // On set le chemin d'enregistrement
    // Dans le dosssier upload et dans
    // un dossier nommer en fct de l'_id du ticket
    const path = 'upload/' + data.linkedTo + '/' + filename
    const fsPath = './upload/' + data.linkedTo
    // On verifie si le dossier existe déjà ou pas
    const isDirExisting = await fs.existsSync(fsPath)

    // Si il n'existe pas  on le créer
    if (!isDirExisting) {
        await fs.mkdirSync(fsPath)
    }

    // On écris le fichier
    await fs.writeFileSync(path, base64Data, 'base64')

    // On renseigne le chemin d'accès du fichier
    // Afin de le rendre accessible depuis le frontEnd
    // ex : https://localhost:3000/_id/filename.ext
    return process.env.API_LINK + data.linkedTo + '/' + filename
}

async function deleteFile(user) {
    let oldPicturePath
    if (user.avatar) {
        oldPicturePath  = user.avatar.replace(process.env.API_LINK, '')
    } else {
        oldPicturePath = user.logo.replace(process.env.API_LINK, '')
    }

    try {
        await fs.unlinkSync('upload/' + oldPicturePath)
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.error('fichier non existant')
        } else {
            console.error(e)
        }
    }
}

function encryptObject (object, exclusionArray) {
    if (!object) return null
    const ARRAY = exclusionArray ? exclusionArray : []

    Object.keys(object).map((item) => {
        !ARRAY.includes(item) ? object[item] = rsaEncrypt(object[item]) : null
    })

    return object
}

function decryptObject (object, exclusionArray) {
    if (!object) return null
    const ARRAY = exclusionArray ? exclusionArray : []

    Object.keys(object).map((item) => {
        !ARRAY.includes(item) ? object[item] = rsaDecrypt(object[item]) : null
    })

    return object
}

module.exports = { isValidObjectId, uploadFile, deleteFile, randomValueHex, encryptObject, decryptObject }
