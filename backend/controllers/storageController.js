const { ref, getDownloadURL, deleteObject } = require("firebase/storage");
const { storage } = require("../config/firebase");

async function getMediaURL(media) {
    const mediaRef = ref(storage, media);
    const mediaURL = await getDownloadURL(mediaRef);
    return mediaURL;
}

async function deleteMediaObject(media) {
    const mediaRef = ref(storage, media);
    return await deleteObject(mediaRef);
}

module.exports = { getMediaURL, deleteMediaObject }