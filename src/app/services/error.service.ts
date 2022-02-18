import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor() { }

    error(code: string): string {
        switch (code) {
            case 'auth/user-not-found':
                return 'Correo no registrado'
            case 'auth/wrong-password':
                return 'Contraseña incorrecta'
            default:
                return 'Error desconocido';
        }
    }

    errorCalendar(code: string): string {
        switch (code) {
            case 'eventNow':
                return 'Evento antes de la fecha actual'
            case 'eventEnd':
                return 'El final del evento no puede ser antes del comienzo ni a la misma hora'
            case 'eventYear':
                return 'Los años del evento son distintos'
            case 'eventMonth':
                return 'Los meses del evento son distintos'
            case 'eventDay':
                return 'Los dias del evento son distintos'
            default:
                return 'Evento incorrecto';
        }
    }
}