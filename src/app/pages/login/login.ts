import { Component, inject } from '@angular/core';
import { authService } from '../../services/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(authService);
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  router = inject(Router);
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/');
    }
  }
  onLogin() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((result) => {
        console.log(result);
        this.authService.saveToken(result);
        if(result.role == 'Admin'){

          this.router.navigateByUrl('/');
        }else{
          this.router.navigateByUrl('/employeeDashboard')
        }
      });
  }
}
