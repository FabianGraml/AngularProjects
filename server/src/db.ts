import loki from 'lokijs';
import fs from 'fs';
import Playlist from './models/playlist';
import Album from './models/album';
import Genre from './models/genre';
import PlaylistTrack from './models/playlistTrack';
import Track from './models/track';


export class Datastore {
    constructor(public db: loki, public genres: loki.Collection, public playlists: loki.Collection, public playlistTracks: loki.Collection, public tracks: loki.Collection, public albums: loki.Collection) { }
}
export function init(): Datastore {


    const db = new loki('./data.db', {
        autoload: true,
        autosave: true,

    });
    const dbi = db.loadDatabaseInternal('./data.db')

    let genres = db.getCollection('genres');
    let playlists = db.getCollection('playlists');
    let playlistTracks = db.getCollection('playlistTracks');
    let tracks = db.getCollection('tracks');
    let albums = db.getCollection('albums');

    //    db.addCollection('genres');
    if (!genres) {

        console.log("Genres do not exist!")
        genres = db.addCollection('genres');

        fs.readFile('.\\csv\\genre.csv', 'utf-8', (err, res) => {
            res.split('\n').slice(1).map((x: string) => genres.insert(new Genre(x)))
        })

    }
    if (!playlists) {
        console.log("Playlists do not exist!")
        playlists = db.addCollection('playlists');

        fs.readFile('.\\csv\\playlist.csv', 'utf-8', (err, res) => {
            res.split('\n').slice(1).map((x: string) => playlists.insert(new Playlist(x)))
        })

    }
    if (!playlistTracks) {
        console.log("PlaylistTracks do not exist!")

        playlistTracks = db.addCollection('playlistTracks');
        fs.readFile('.\\csv\\playlist-track.csv', 'utf-8', (err, res) => {
            res.split('\n').slice(1).map((x: string) => playlistTracks.insert(new PlaylistTrack(x)))
        })

    }
    if (!tracks) {
        console.log("Tracks do not exist!")

        tracks = db.addCollection('tracks');
        fs.readFile('.\\csv\\track.csv', 'utf-8', (err, res) => {
            res.split('\n').slice(1).map((x: string) => tracks.insert(new Track(x)))
        })

    }
    if (!albums) {
        console.log("Albums do not exist!")
        albums = db.addCollection('albums');

        fs.readFile('.\\csv\\album.csv', 'utf-8', (err, res) => {
            res.split('\n').slice(1).map((x: string) => albums.insert(new Album(x)))
        })

    }
    console.log(db.listCollections())
    db.saveDatabase();
    return new Datastore(db, genres, playlists, playlistTracks, tracks, albums);
}