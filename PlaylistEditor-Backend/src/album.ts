export default class Album{
  
    public albumId: Number = 0;
    public albumTitle: string = '';
    public artistId: Number = 0;

    constructor(line:string){
        const item = line.split('"').join('').split(",");
        console.log(item)
        this.albumId = +parseInt(item[0]);
        this.albumTitle = item[1].replace('\r', ''),
        this.artistId = +parseInt(item[2])
    }
}