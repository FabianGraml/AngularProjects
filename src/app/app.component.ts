import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import PlaylistTrack from 'PlaylistEditor-Backend/src/playlistTrack';

interface IPlaylist {
  playlistId: number;
  playlistName: string;
}
interface ITrack {
  trackId: Number;
  trackName: string;
  albumId: Number;
  mediaTypeId: Number;
  genreId: Number;
  composer: string;
  milliSeconds: Number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-template';

  selectedPlaylist: Number = 0;
  playlists: IPlaylist[] = [];
  playlisttracks: ITrack[] = [];
  numberOfTracks: Number = 0;
  totalPlaytime: Number = 0;

  constructor(private http: HttpClient) {  
    this.http
    .get<IPlaylist[]>('http://localhost:8000/api/playlists')
    .subscribe((result) => (this.playlists = result)); 
  }

  playlistTracks: ITrack[] = []; 
  updatePlaylistTracks() {
    this.http.get<ITrack[]>(`http://localhost:8000/api/playlisttracks/${this.selectedPlaylist}`)
      .subscribe(result => this.playlistTracks = result);
     
    this.myLog('playlistTracks successfully updated:', this.playlistTracks); 
  }

  
  myLog(title: string, content: any = undefined) {
    console.log('-----------------------------------------'); 
    console.log(`LOG: ${title}: ${content}`);  
  }
  
}
