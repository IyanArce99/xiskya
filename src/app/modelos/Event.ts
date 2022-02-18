export class Events {
    id?:string;
    name:string;
    dateStart:Date; 
    dateEnd:Date;

    constructor(name:string, dateStart:Date, dateEnd:Date){
        this.name=name;
        this.dateStart= dateStart;
        this.dateEnd = dateEnd;
    }
}