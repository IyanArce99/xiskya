import { Message } from "./Message";

export class User {
    id?:string;
    email:string;
    password: string;
    name:string; 
    surname:string;
    numberCongress:number;
    location: string;
    birthday: Date;
    imagePath: string;
    range: number;
    messages: Message[];

    constructor(email:string, password:string, name:string, surname:string, numberCongress:number, location: string, birthday: Date, imagePath: string, range: number,
        messages: Message[]){
        this.email=email;
        this.password = password;
        this.name= name;
        this.surname = surname;
        this.numberCongress = numberCongress;
        this.location = location;
        this.birthday= birthday;
        this.imagePath = imagePath;
        this.range = range;
        this.messages = messages;
    }
}