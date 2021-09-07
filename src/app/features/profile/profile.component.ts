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
  ) { 
    this.httpService.get('/api/users/me').subscribe(val => {
      console.log(Object(val))
      this.user = Object(val)
      if (this.user.message) {
        this.router.navigate(['']);
      } else {
        this.profileForm.setValue({username:this.user.username, email: this.user.email,age: this.user.age})
      }
    })
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.profileForm = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
      age: new FormControl(null,[Validators.required]),
    })
  }

  public submit() {
    this.httpService.patch('/api/users/me',this.profileForm.value).subscribe((value) => {
      alert('Updated')
    });
  }
}
