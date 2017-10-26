import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { SearchService } from './search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  character;
  imageUrl;
  searchSubject = new Subject(); //add this property


  constructor(
    private http: Http,
    private searchService: SearchService
  ) { }

  findCharacter(id) {
    this.searchSubject.next(id); // add this line
  }

  ngOnInit() {
    this.searchSubject
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(id => {
        this.searchService.createAPIObservable(id)
          .subscribe(response => {
            //console.log(response.json());
            //console.log(response.json().image);

            this.imageUrl = response.json().image;
            this.character = response.json();
          });
      })
  }
}
