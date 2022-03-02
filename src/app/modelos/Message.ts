export class Message {
    id?:string;
    imagePath:string;
    name:string; 
    text:string;
    fecha:Date;

    constructor(imagePath:string, name:string, text: string, fecha:Date){
        this.imagePath = imagePath;
        this.name = name;
        this.text = text;
        this.fecha = fecha;
    }
}