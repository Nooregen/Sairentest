import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service'; // Assure-toi que le chemin d'importation est correct

@NgModule({
  declarations: [
    AppComponent, // Déclare le composant AppComponent
    // ... Tu peux lister d'autres composants ici si tu en as
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Importe HttpClientModule pour les requêtes HTTP
    RouterModule.forRoot([]), // Initialise RouterModule avec un tableau de routes vide pour le moment
    // ... Tu peux ajouter d'autres modules ici si nécessaire
  ],
  providers: [
    ApiService, // Ajoute ApiService aux providers si tu n'utilises pas providedIn: 'root' dans ton service
    // ... Tu peux ajouter d'autres services ici si nécessaire
  ],
  bootstrap: [AppComponent] // Définit AppComponent comme le composant de démarrage de l'application
})
export class AppModule { }
