import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  public searchForm: FormGroup;
  public searchResult:any;
  public friendRequests:any;
  public friends:any;
  constructor(
    private readonly httpService: HttpService
  ) {
    this.httpService.get('/api/users/me').subscribe((value) => {
      const user = Object(value);
      this.friendRequests = user.requests;
      this.friends = user.friends;
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

  public submit(){
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

  public addFriend(index:number) {
    this.httpService.post('/api/users/friends/request',this.searchResult[index]).subscribe((value) => {
      alert('Request sent!')
    });
  }
  
  public acceptFriend(index:number) {
    this.httpService.post('/api/users/friends/accept',this.friendRequests[index]).subscribe((value) => {
      alert('Request accepted!')
    });
    document.getElementById('list')?.childNodes[index].remove();
  }
}
