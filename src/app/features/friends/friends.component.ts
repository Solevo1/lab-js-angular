import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  public searchForm: FormGroup;
  public searchResult:any = [];
  public friendRequests:any = [];
  public friends:any = [];
  constructor(
    private readonly httpService: HttpService,
    private readonly router: Router
  ) {
    this.httpService.get('/api/users/me').subscribe((value) => {
      const user = Object(value);
      if(user.message==="Not authorized") {
        this.router.navigate(['']);
      } else {
        this.friendRequests = user.requests;
        this.friends = user.friends;
      }
    });
    this.httpService.get('/api/users/search').subscribe(value => {
      this.searchResult = Object(value);
    })
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm (){ 
    this.searchForm = new FormGroup({
      username: new FormControl(null),
    })
  }

  public searchUsers(){
    if(this.searchForm.value) {
      this.httpService.post('/api/users/search/filter',this.searchForm.value).subscribe((value) => {
        this.searchResult = Object(value);
      });
    } else {
      this.httpService.get('/api/users/search').subscribe((value) => {
        this.searchResult = Object(value);
      });
    }
  }

  public addFriend(event: Event, index:number) {
    this.httpService.post('/api/users/friends/request',this.searchResult[index]).subscribe((value) => {
      alert('Request sent!')
    });
    Object(event.target).parentNode.remove();
  }
  
  public acceptFriend(event: Event, index:number) {
    this.httpService.post('/api/users/friends/accept',this.friendRequests[index]).subscribe((value) => {
      alert('Request accepted!')
    });
    Object(event.target).parentNode.parentNode.remove();
  }

  public rejectFriend(event: Event, index:number) {
    this.httpService.post('/api/users/friends/reject',this.friendRequests[index]).subscribe((value) => {
      alert('Request accepted!')
    });
    Object(event.target).parentNode.parentNode.remove();
  }

  public removeFriend(event: Event, index:number) {
    this.httpService.post('/api/users/friends/remove',this.friends[index]).subscribe((value) => {
      alert('Friend removed!')
    });
    Object(event.target).parentNode.remove();
  }
}
