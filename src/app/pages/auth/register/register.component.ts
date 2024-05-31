import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/Auth';
import { UserService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  user: User = {} as User;
  userForm: FormGroup = {} as FormGroup;
  loginError: string | null = null; 
  constructor(
    private userService: UserService,
    private router: Router,   
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['client']
    });
  }
  ngOnInit(): void {}
  
  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.errors?.['required']) {
      return 'Bắt buộc phải nhập';
    } else if (control?.errors?.['minlength']) {
      return 'Bắt buộc phải nhập lớn hơn 6';
    } else if (control?.errors?.['email']) {
      return 'Phải đúng định dạng email';
    }
    return '';
  }
  handleSubmit(){
    if (this.userForm.valid) {
      this.userService.register(this.userForm.value).subscribe({next: (data) =>{
        localStorage.setItem('token', data.token);
        alert("Đăng nhập thành công!")
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error("Register failed", err);
        if (err.status === 400) {
          if (err.error === 'Email already exists') {
            this.loginError = 'Email đã tồn tại';
          } else {
            this.loginError = 'Email đã có';
          }
        } else {
          this.loginError = 'Đăng nhập thất bại. Vui lòng thử lại sau.';
        }
      }
      })
    }
  }
}
