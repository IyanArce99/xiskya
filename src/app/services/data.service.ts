import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../modelos/User';
import { Observable } from 'rxjs';
import { Content } from '../modelos/Content';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  static events: CalendarEvent[] = [];
  static dateSelected: string;

  constructor(private _firestore: AngularFirestore) { }

  static addEvent(event: CalendarEvent) : void {
    this.events.push(event);
  }

  static getEvents(): CalendarEvent[] {
    return this.events;
  }

  //Metodos usuario

  //Agregar usuario
  crearUsuario(user:User): Promise <any>{
    return this._firestore.collection('personas').add(user);
  }

  //Ver usuarios usando snapshotchanges asi cambia en tiempo real
  getUsuarios(): Observable <any> {
    return this._firestore.collection('personas').snapshotChanges();
  }

  //Ver contenido especifico
  getUsuarioPorId(id:string):Observable<any>{
    return this._firestore.collection('personas').doc(id).get();
  }

  //Borrar usuario
  borrarUsuario(id:string): Promise<any>{
    return this._firestore.collection('personas').doc(id).delete();
  }

  //Editar usuario
  editarUsuario(id:string, user:User): Promise<any>{
    return this._firestore.collection('personas').doc(id).update(user);
  }

  //Metodos contenido

  //Agregar contenido
  crearContenido(contenido:Content): Promise <any>{
    return this._firestore.collection('contenido').add(contenido);
  }

  //Ver contenido usando snapshotchanges asi cambia en tiempo real
  getContenido(): Observable <any> {
    return this._firestore.collection('contenido').snapshotChanges();
  }

  //Ver contenido especifico
  getContenidoPorId(id:string):Observable<any>{
    return this._firestore.collection('contenido').doc(id).get();
  }

  //Borrar contenido
  borrarContenido(id:string): Promise<any>{
    return this._firestore.collection('contenido').doc(id).delete();
  }
}
