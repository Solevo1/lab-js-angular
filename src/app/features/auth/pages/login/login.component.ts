import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public constructor(
    private readonly httpService: HttpService,
    private readonly router: Router,
  ) {
    
  }
  public ngOnInit(): void {
    this.initForm();
  }
  public submit() {
    this.httpService.post('/api/auth/login',this.loginForm.value).subscribe((value) => {
      this.router.navigate(['/profile'])
    });
  }
  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required]),
    })
  }
}
