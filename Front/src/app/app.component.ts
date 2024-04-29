import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  tokenStatus: string = '';
  captcha: string | undefined;
  isCaptchaValid = false;
  isDownloadInProgress = false;
  progress = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.checkToken();
  }
  
  checkToken() {
    const token = localStorage.getItem('token');
    this.tokenStatus = token ? 'Token présent.' : 'Aucun token. Veuillez générer un token.';
  }

  resolved(captchaResponse: string | null) {
    this.captcha = captchaResponse ?? ""; 
    this.isCaptchaValid = !captchaResponse;
  }

  generateToken() {
    if (!this.isCaptchaValid) {
      this.tokenStatus = 'Veuillez résoudre le CAPTCHA avant de générer le token.';
      return;
    }

    if (this.captcha) {
      this.apiService.generateToken(this.captcha).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.tokenStatus = 'Token généré et stocké avec succès.';
          this.startDownloadProgress();
        },
        error: (err) => {
          console.error('Erreur lors de la génération du token:', err);
          this.tokenStatus = 'Erreur lors de la génération du token.';
        }
      });
    } else {
      console.error('Tentative de génération de token avec un CAPTCHA non résolu.');
    }
  }

  startDownloadProgress() {
    this.isDownloadInProgress = true;
    this.progress = 0;
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(interval);
        this.isDownloadInProgress = false;
        this.downloadImage();
      }
    }, 1000); // Augmente la progression toutes les 1 secondes
  }

  downloadImage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.downloadImage().subscribe(blob => {
        this.downloadBlob(blob, 'downloaded_image.jpg');
      });
    } else {
      this.tokenStatus = "Aucun token trouvé. Veuillez d'abord générer un token.";
    }
  }

  downloadBlob(blob: Blob, filename: string) {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
