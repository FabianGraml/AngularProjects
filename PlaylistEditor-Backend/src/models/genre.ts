export default class Genre{
  
    //"GenreId","Name"
    //"1","Rock"

    public genreId: Number = 0;
    public genereName: string = '';

    constructor(line:string){
        const item = line.split('"').join('').split(",");
        this.genreId = +parseInt(item[0]);
        this.genereName = item[1].replace('\r', '')
    }
}