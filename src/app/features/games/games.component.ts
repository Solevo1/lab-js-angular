import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public games:any;
  public searchForm: FormGroup;
  constructor(
    private readonly httpService: HttpService
  ) {
    this.httpService.get('/api/games').subscribe((value) => {
      this.games = Object(value);
      console.log(value)
    });
  }
  public addGame(event:Event, index:number) {
    this.httpService.post('/api/games/post',this.games[index]).subscribe((value) => {
      alert('Game added!');
    });
    Object(event.target).parentNode.remove();
  }
  ngOnInit() {
    this.searchForm = new FormGroup({
      name: new FormControl(null),
    })
  }

  public searchGames() {
    this.httpService.post('/api/games/search',this.searchForm.value).subscribe((value) => {
      this.games = Object(value);
      console.log(value)
    });
  }

}
