import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
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
