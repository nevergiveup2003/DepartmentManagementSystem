import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { authService } from '../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  authService = inject(authService);
  profileForm!: FormGroup;
  fb = inject(FormBuilder);
  ngOnInit() {
    this.profileForm = this.fb.group({
      email: [],
      phone: [],
      name: [],
      profileImage: [],
      password: [],
      salary:[]
    });
    this.authService.getProfile().subscribe((result : any) => {
      console.log(result);
      this.profileForm.patchValue(result);
      this.imageSrc = result.profileImage;
    });
  }
  imageSrc!:string;
  fileUpload(event: Event) {
    var target: any = event.target;
    if(target.files && target.files[0]){
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload =  ()=>{
        this.imageSrc = reader.result as string;
        this.profileForm.patchValue({
          profileImage:this.imageSrc
        })
        console.log(this.imageSrc)
      }
      reader.readAsDataURL(file)
    }
  }
  onUpdate() {
    this.authService
      .updateProfile(this.profileForm.value)
      .subscribe((result) => {
        alert('cap nhat thanh cong');
      });
  }
}
