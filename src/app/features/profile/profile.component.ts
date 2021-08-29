import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: any;
  public profileForm: FormGroup;
  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.httpService.get('/api/users/me').subscribe(val => {
      console.log(Object(val))
      const {email, username, age, message} = Object(val);
      if (message) { this.router.navigate(['']) }
      this.profileForm.setValue({username:username || null, email: email || null,age: age || null})
    })
    this.profileForm = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
      age: new FormControl(null,[Validators.required]),
    })
  }
  public setUser(value:any) {
    this.user = value;
  }
  public submit() {
    this.httpService.patch('/api/users/me',this.profileForm.value).subscribe((value) => {
      alert('Updated')
    });
  }
}
