import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import Track from './track'


interface IPlaylist {
  playlistId: number;
  playlistName: string;
}
interface ITrack {
  trackId: number;
  trackName: string;
  albumId: number;
  mediaTypeId: number;
  genreId: number;
  milliseconds: number;
}
interface IGenre {
  genreId: number;
  genreName: string;
}
interface IAlbum {
  albumId: number;
  albumTitle: string;
  artistId: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-template';

  selectedPlaylist: number = 1;
  playlists: IPlaylist[] = [];
  playlistFromServer: ITrack[] = [];
  numberOfTracks: number = 0;
  totalPlaytime: number = 0;
  isVisible: boolean = false;
  genres: IGenre[] = [];
  selectedGenre: number = 0;
  albums: IAlbum[] = [];
  selectedNewTrack: number = 0;
  tracksOfGenre: ITrack[] = [];
  playlist: Track[] = [];



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
    this.totalPlaytime = 0;
    this.playlistFromServer = [];
    this.playlist = [];

    this.http.get<ITrack[]>(`http://localhost:8000/api/playlisttracks/${this.selectedPlaylist}`)
      .subscribe(result => {
        this.playlistFromServer = result;

        for (let i = 0; i < this.playlistFromServer.length; i++) {

          var newTrack = new Track(
            this.playlistFromServer[i].trackId,
            this.playlistFromServer[i].trackName,
            this.playlistFromServer[i].albumId,
            this.albums.find(x => x.albumId === this.playlistFromServer[i].albumId)?.albumTitle as string,
            this.playlistFromServer[i].genreId,
            this.genres.find(x => x.genreId === this.playlistFromServer[i].genreId)?.genreName as string,
            this.playlistFromServer[i].milliseconds
          );
          this.playlist.push(newTrack)
        }
        for (let i = 0; i < this.playlist.length; i++) {
          this.totalPlaytime = this.playlist[i].milliSeconds + this.totalPlaytime;
        }
        this.numberOfTracks = this.playlist.length;
      });
  }

  getTracksOfGenre() {
    //this.selectedNewTrack = 1;
    this.http.get<ITrack[]>(`http://localhost:8000/api/tracks?genreId=${this.selectedGenre}`)
      .subscribe(result => {
        this.tracksOfGenre = result;
      });

  }

  addNewTrackToPlaylist() {
    const body = { "playlistId": +this.selectedPlaylist, "trackId": +this.selectedNewTrack };
    this.http.post(`http://localhost:8000/api/track`, body).subscribe(data => {
      console.log(data)
      this.getTracksOfPlaylist();
      this.isVisible = false;
      this.selectedGenre = 0;
      this.selectedNewTrack = 0;

    },
      error => {
        alert(error.error)
      }
    )
  }
  myLog(title: string, content: any = undefined) {
    console.log('-----------------------------------------');
    console.log(`LOG: ${title}: ${content}`);
  }
  showTime(milliSeconds: number): string {
    const date = new Date(milliSeconds);
    return formatDate(date, 'mm:ss', 'en-US')
  }
  showTimeWithHour(milliSeconds: number): string {
    return Math.floor(milliSeconds/(1000*60*60)) + ":" + Math.floor(milliSeconds/(1000*60))%60 + ":" + Math.floor(milliSeconds/1000)%60;
  }
  delete(trackID: Number) {
    this.playlist.forEach(x => x.trackId === trackID)
    this.playlist.slice(0);
    this.playlist.forEach((element, index) => {
      if (element.trackId == trackID){
        this.playlist.splice(index, 1);
        const millis = this.playlist.find(x => x.trackId);
        if(millis !== undefined){
          this.totalPlaytime - millis.milliSeconds
        }
        
      } 
    });
    this.totalPlaytime =0;
    for (let i = 0; i < this.playlist.length; i++) {
      this.totalPlaytime = this.playlist[i].milliSeconds + this.totalPlaytime;
    }
    this.numberOfTracks = this.playlist.length;
    this.http.delete(`http://localhost:8000/api/track?playlistid=${this.selectedPlaylist}&trackid=${trackID}`).subscribe(x => console.log(x))
  }
  
  isDisabled(): boolean {
    if (this.selectedGenre > 0) {
      return false;
    } else {
      return true;
    }
  }
}
