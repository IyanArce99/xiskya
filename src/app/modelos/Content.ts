export class Content {
    id?:string;
    title:string;
    subtitle:string; 
    imagePath:string;
    content:string;
    type: number;

    constructor(title:string, subtitle:string, imagePath:string, content:string, type: number){
        this.title=title;
        this.subtitle= subtitle;
        this.imagePath = imagePath;
        this.content = content;
        this.type = type;
    }
}