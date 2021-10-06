import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import PlaylistTrack from 'PlaylistEditor-Backend/src/playlistTrack';
import { formatDate } from '@angular/common';


interface IPlaylist {
  playlistId: Number;
  playlistName: string;
}
interface ITrack {
  trackId: Number;
  trackName: string;
  albumId: Number;
  mediaTypeId: Number;
  genreId: Number;
  composer: string;
  milliSeconds: number;
}
interface IGenre {
  genreId: Number;
  genereName: string;
}
interface IAlbum {
  albumId: Number;
  albumTitle: string;
  artistId: Number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-template';

  selectedPlaylist: Number = 1;
  playlists: IPlaylist[] = [];
  playlisttracks: ITrack[] = [];
  numberOfTracks: Number = 0;
  totalPlaytime: Number = 0;
  isVisible: boolean = false;
  genres: IGenre[] = [];
  selectedGenre: Number = 1;
  playlistTracks: ITrack[] = [];
  albums: IAlbum[] = [];
  selectedNewTrack: Number = 1;
  tracksOfGenre: ITrack[] = [];



  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {

    this.http
      .get<IAlbum[]>('http://localhost:8000/api/albums')
      .subscribe((result) => (this.albums = result));

    this.http
      .get<IGenre[]>('http://localhost:8000/api/genres')
      .subscribe((result) => (this.genres = result));

    this.http
      .get<IPlaylist[]>('http://localhost:8000/api/playlists')
      .subscribe((result) => (this.playlists = result));

    this.getTracksOfGenre();

    this.getTracksOfPlaylist();

    //  this.playlistTracks.forEach(x => this.genres.forEach(y => y.genreId === x.genreId))
  }

  getTracksOfPlaylist() {
    this.http.get<ITrack[]>(`http://localhost:8000/api/playlisttracks/${this.selectedPlaylist}`)
      .subscribe(result => {
        this.playlistTracks = result;
        this.numberOfTracks = this.playlistTracks.length;
      });
  }

  getTracksOfGenre() {
  
    this.selectedNewTrack = 1;
    this.http.get<ITrack[]>(`http://localhost:8000/api/tracks?genreId=${this.selectedGenre}`)
    .subscribe(result => {
      this.tracksOfGenre = result;
    });

  }

  addNewTrackToPlaylist() {
    const body = { "playlistId": +this.selectedPlaylist, "trackId": +this.selectedNewTrack };
    this.http.post(`http://localhost:8000/api/track`, body).subscribe(data => console.log(data))

    console.log('Selected track to add: ' + this.selectedNewTrack);
    console.log('Selected playlist to add: ' + this.selectedPlaylist);
  }

  checkIfVisible() {
    if (this.isVisible) {
      this.http.get<IGenre[]>(`http://localhost:8000/api/genres`)
        .subscribe(result => this.genres = result);
    }
  }

  myLog(title: string, content: any = undefined) {
    console.log('-----------------------------------------');
    console.log(`LOG: ${title}: ${content}`);
  }
  showTime(milliSeconds: number): string {
    const newDD = milliSeconds
    const date = new Date(milliSeconds);
    return formatDate(date, 'mm:ss', 'en-US')
  }


}
