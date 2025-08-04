import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule}from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { authService } from './services/auth';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  authService = inject(authService)
  logout(){
this.authService.logout();
  }
}
