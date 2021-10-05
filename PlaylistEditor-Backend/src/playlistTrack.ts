export default class Genre{
  
   // "PlaylistId","TrackId"
   // "1","3402"

    public playlistId: Number = 0;
    public trackId: Number = 0;

    constructor(line:string){
        const item = line.split('"').join('').split(";");
        console.log(item)
        this.playlistId = +parseInt(item[0]);
        this.trackId = +parseInt(item[1]);
    }
}