import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js'
const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`

        const songsData = {
            name,
            desc,
            album,
            file: audioUpload.secure_url,
            image: imageUpload.secure_url,
            duration
        }
        const song = songModel(songsData);
        await song.save();
        res.json({ success: true, message: "song Added" })
    } catch (error) {
        res.json({ success: false })
    }
}


const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({})
        const songCount = await songModel.countDocuments();
        res.json({
            success: true,
            length: songCount,
            songs: allSongs
        })
    } catch (error) {
        res.json({ success: false })
    }
}

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song Removed" })
    } catch (error) {
        res.json({ success: false })
    }
}

export { addSong, listSong, removeSong }