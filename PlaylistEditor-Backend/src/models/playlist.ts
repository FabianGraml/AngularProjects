export default class Playlist{
    public playlistId: Number = 0;
    public playlistName: string = '';

    constructor(line:string){
        const item = line.split('"').join('').split(",");
        this.playlistId = +parseInt(item[0]);
        this.playlistName = item[1].replace('\r', '')
    }
}