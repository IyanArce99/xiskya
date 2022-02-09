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
}