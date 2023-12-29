import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: ['custom-snackbar'], // Clase personalizada para estilos
      verticalPosition: 'top', // Posición arriba del todo
    };

    this.snackBar.open(message, action, config);
  }
}
