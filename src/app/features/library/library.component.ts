import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public games:any;
  constructor(
    private readonly httpService: HttpService
  ) {
    this.httpService.get('/api/users/me').subscribe((value) => {
      this.games = Object(value).games;
      console.log(this.games)
    });
  }

  ngOnInit() {
  }

  public downloadGame(event: Event, index: number){}
  public shareGame(event: Event, index: number){}
}
