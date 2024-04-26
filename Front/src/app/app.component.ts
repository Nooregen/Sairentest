import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  // Ajoute une propriété pour le status du token
  tokenStatus: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.checkToken();
  }
  
  checkToken() {
    const token = localStorage.getItem('token');
    this.tokenStatus = token ? 'Token présent.' : 'Aucun token. Veuillez générer un token.';
  }

  generateToken() {
    this.apiService.generateToken().subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.tokenStatus = 'Token généré et stocké avec succès.';
      },
      error: (err) => {
        console.error('Erreur lors de la génération du token:', err);
        this.tokenStatus = 'Erreur lors de la génération du token.';
      }
    });
  }

  downloadImage(event: Event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Aucun token trouvé. Veuillez dabord générer un token.');
      return;
    }

    this.apiService.downloadImage().subscribe({
      next: (blob) => {
        this.downloadBlob(blob, 'downloaded_image.jpg');
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement de l’image:', err);
      }
    });
  }

  downloadBlob(blob: Blob, filename: string) {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  }
}
