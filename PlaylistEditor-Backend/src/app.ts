import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';
import fs from 'fs';
import Playlist from './playlist';
import Album from './album';
import Genre from './genre';
import PlaylistTrack from './playlistTrack';
import Track from './track';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

function readPlaylists() {
  fs.readFile('.\\csv\\playlist.csv', 'utf-8', (err, res) =>
    res
      .split('\n')
      .slice(1)
      .map((x: string) => new Playlist(x))
  );
}
function readAlbums() {
  fs.readFile('.\\csv\\album.csv', 'utf-8', (err, res) =>
    res
      .split('\n')
      .slice(1)
      .map((x: string) => new Album(x))
  );
}
function readGenres() {
  fs.readFile('.\\csv\\genre.csv', 'utf-8', (err, res) =>
    res
      .split('\n')
      .slice(1)
      .map((x: string) => new Genre(x))
  );
}
function readTracksPlaylists() {
  fs.readFile('.\\csv\\playlist-track.csv', 'utf-8', (err, res) =>
    res
      .split('\n')
      .slice(1)
      .map((x: string) => new PlaylistTrack(x))
  );
}
function readTracks() {
  fs.readFile('.\\csv\\track.csv', 'utf-8', (err, res) =>
    res
      .split('\n')
      .slice(1)
      .map((x: string) => new Track(x))
  );
}

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
//get all customers
app.get('/api/customers', (req, res) => {
  //readGenres();
  //readPlaylists();
  console.log('Hello');

      
  });

