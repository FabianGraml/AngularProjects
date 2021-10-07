export default class TrackDTO{
  
    public trackId: Number = 0;
    public trackName: string = '';
    public albumId: Number = 0;
    public albumName: string = '';
    public genreId: Number = 0;
    public genre: string = '';
    public milliSeconds: Number = 0;

    constructor(trackId:Number, trackName:string, albumId:Number, albumName:string, genreId:Number, genre:string, milliseconds:Number){
        this.trackId = trackId;
        this.trackName = trackName;
        this.albumId = albumId,
        this.albumName = albumName,
        this.genreId = genreId,
        this.genre = genre,
        this.milliSeconds=milliseconds;
    }
    
}