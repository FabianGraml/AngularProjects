export default class Track{
  
    //","","","","","","","Bytes","UnitPrice"
    //","","","","","","","11170334","0.99"
    public trackId: Number = 0;
    public trackName: string = '';
    public albumId: Number = 0;
    public mediaTypeId: Number = 0;
    public genreId: Number = 0;
    public composer: string = '';
    public milliSeconds: Number = 0;

    
    constructor(line:string){
        const newLine = line.replace(/(, )/g, '; ')
        const item = newLine.split('"').join('').split(",");
        this.trackId = +item[0];
        this.trackName = item[1],
        this.albumId = +item[2];
        this.mediaTypeId = +item[3];
        this.genreId = +item[4];
        this.composer = item[5];
        this.milliSeconds = +item[6];
     
    }
}