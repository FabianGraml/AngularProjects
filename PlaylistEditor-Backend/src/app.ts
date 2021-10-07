import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';
import fs from 'fs';
import Playlist from './playlist';
import Album from './album';
import Genre from './genre';
import PlaylistTrack from './playlistTrack';
import Track from './track';
import TrackDTO from './trackDTO'

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//List creation stuff

let playlists: Playlist[] = [];
let albums: Album[] = [];
let genres: Genre[] = [];
let playlistTracks: PlaylistTrack[] = [];
let tracks: Track[] = [];
let playlist: TrackDTO[] = [];


//CSV Reading stuff

fs.readFile('.\\csv\\playlist.csv', 'utf-8', (err, res) => {
    res.split('\n').slice(1).map((x: string) => playlists.push(new Playlist(x)))
})

fs.readFile('.\\csv\\album.csv', 'utf-8', (err, res) => {
    res.split('\n').slice(1).map((x: string) => albums.push(new Album(x)))
})

fs.readFile('.\\csv\\genre.csv', 'utf-8', (err, res) => {
    res.split('\n').slice(1).map((x: string) => genres.push(new Genre(x)))
})

fs.readFile('.\\csv\\playlist-track.csv', 'utf-8', (err, res) => {
    res.split('\n').slice(1).map((x: string) => playlistTracks.push(new PlaylistTrack(x)))
})

fs.readFile('.\\csv\\track.csv', 'utf-8', (err, res) => {
    res.split('\n').slice(1).map((x: string) => tracks.push(new Track(x)))
})
// Weird stuff
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});


//Playlist stuff

//Get all Playlists
app.get('/api/playlists', (req, res) => {
    res.json(playlists);
});

app.get('/api/test', (req, res) => {

    console.log("yeet it")
    for (let i = 0; i < tracks.length; i++) {

        var dto = new TrackDTO(
            tracks[i].trackId,
            tracks[i].trackName,
            tracks[i].albumId,
            albums.find(x => x.albumId === tracks[i].albumId)?.albumTitle as string,
            tracks[i].genreId,
            genres.find(x => x.genreId === tracks[i].genreId)?.genereName as string,
            tracks[i].milliSeconds
        );
        playlist.push(dto)


    }


});

//Get all Tracks of a Playlist
app.get('/api/playlisttracks/:id', (req, res) => {
    const playListId = parseInt(req.params.id);


    if (playListId) {
        const playlist = playlists.find(x => x.playlistId === playListId)
        if (playlist) {

            tracks.sort((first, second) => first.trackName.localeCompare(second.trackName));

            res.status(StatusCodes.OK).send(playlistTracks.filter(x => x.playlistId === playListId)
                .map(x => tracks.find(y => y.trackId === x.trackId)).sort((first: any, second: any) => first.trackName.localeCompare(second.trackName)))
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`Playlist with id ${playListId} was not found`)
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).send('Something went completely wrong!')
    }
});

//Add a Track to a Playlist
app.post("/api/track", (req, res) => {
    if (!req.body.playlistId || !req.body.trackId) {
        res.status(StatusCodes.BAD_REQUEST).send("Mandatory fields missing");
    }
    else {

        let track = playlistTracks.find(x => x.trackId === req.body.trackId && x.playlistId === req.body.playlistId)
        if (track) {
            console.log('hoids maul')
            res.status(StatusCodes.FORBIDDEN).send('Song is already in this list')
        } else {

            const newPlaylistTrack: PlaylistTrack = {
                playlistId: req.body.playlistId,
                trackId: req.body.trackId,
            };
            console.log(newPlaylistTrack)
            playlistTracks.push(newPlaylistTrack);
            res
                .status(StatusCodes.CREATED)
                .send(newPlaylistTrack);
        }
    }

});

//Delete a Track from a Playlist

app.delete('/api/track*', (req, res) => {
    const playListId = Number(req.query.playlistid);
    const trackId = Number(req.query.trackid);

    playlistTracks.forEach((item, index) => {
        if (item.playlistId === playListId && item.trackId === trackId) {
            playlistTracks.splice(index, 1);
        }
    });
})

//Genre stuff

//Get all Genres
app.get('/api/genres', (req, res) => {
    res.json(genres);
})

//Get all tracks of a genre with query parameter
app.get('/api/tracks*', (req, res) => {
    const genreId = Number(req.query.genreId);
    const genreToSearch = genres.find(x => x.genreId === genreId)
    if (req.query.genreId != undefined) {
        if (genreToSearch) {
            res.status(StatusCodes.OK).send(tracks.filter(x => x.genreId === genreId))
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`Genre with id ${genreId} was not found`)
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).send(`Cannot work with the given query parameter`)
    }
})

app.get('/api/albums', (req, res) => {
    res.status(StatusCodes.OK).send(albums)
});

