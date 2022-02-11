export class User {
    id?:string;
    email:string;
    name:string; 
    surname:string;
    numberCongress:number;
    location: string;
    birthday: Date;
    imagePath: string;
    range: number;

    constructor(email:string, name:string, surname:string, numberCongress:number, location: string, birthday: Date, imagePath: string, range: number){
        this.email=email;
        this.name= name;
        this.surname = surname;
        this.numberCongress = numberCongress;
        this.location = location;
        this.birthday= birthday;
        this.imagePath = imagePath;
        this.range = range;
    }
}