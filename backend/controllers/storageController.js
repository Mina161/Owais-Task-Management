const { getDownloadURL } = require("firebase-admin/storage");
const { storage, bucket } = require("../config/firebase-admin");

async function getMediaURL(media) {
    const mediaRef = bucket.file(media);
    const mediaURL = await getDownloadURL(mediaRef);
    return mediaURL;
}

async function deleteMediaObject(media) {
    const mediaRef = bucket.file(media);
    return await mediaRef.delete();
}

module.exports = { getMediaURL, deleteMediaObject }