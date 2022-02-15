export class Message {
    imagePath:string;
    name:string; 
    text:string;

    constructor(imagePath:string, name:string, text: string){
        this.imagePath = imagePath;
        this.name = name;
        this.text = text;
    }
}