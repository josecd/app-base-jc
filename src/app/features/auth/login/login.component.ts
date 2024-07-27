import { Component, inject, OnInit } from '@angular/core';
import { SwallService } from '../../../shared/services/swall.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  private readonly _swall = inject(SwallService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _user = inject(UserService);

  public loginForm: FormGroup;
  public submitStatus: boolean = false;
  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,}$/
          ),
        ],
      ],
    });
   }

   public async submit() {
    this.submitStatus = true;
    if (this.loginForm.invalid) return;
    this._swall.showLoading();
    this._authService.login(this.loginForm.value).subscribe({
      next: (value: any) => {
        this._swall.hideLoading();
        const dataset = {
          token:value.response.access_token,
          user:value.response.user,
        }
        this._user.setUserToken(dataset)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('err', err);
        this._swall.showMessage('Error', err.error['message'], 'error');
      },
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

}
