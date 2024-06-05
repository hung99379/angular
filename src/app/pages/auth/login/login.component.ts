import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {  User } from '../../../interfaces/Auth';
import { UserService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
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
    console.log(this.userForm.valid);
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userService.login(this.userForm.value).subscribe({next: (data) =>{
        console.log('Register successfully!', data);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('role', data.user.role);
        if (data.user.role === 'admin') {
          this.router.navigate(['/']); 
        } else {
        this.router.navigate(['/'])
        }
        alert("Đăng nhập thành công!")
      },
      error: (err) => {
        console.error("Login failed", err);
        if (err.status === 400) {
          if (err.error === 'Cannot find user') {
            this.loginError = 'Email không tồn tại';
          } else if (err.error === 'Incorrect password') {
            this.loginError = 'Mật khẩu không đúng';
          } else {
            this.loginError = 'Email hoặc mật khẩu không đúng';
          }
        } else {
          this.loginError = 'Đăng nhập thất bại. Vui lòng thử lại sau.';
        }
      }
      });
    }
  }
}
