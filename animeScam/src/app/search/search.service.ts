import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  createAPIObservable(id) {
    var searchString;
    var outputArray = [];
    var str = id.toString();
    var searchArray = str.match(/.{1,4}/g);
    searchArray.forEach(string => {
      var output = 0;
      for (var i = 0; i < string.length; i++) {
        output += Number(string[i]);
      }
      outputArray.push((output % 10).toString());
    })
    //console.log(outputArray);
    //console.log(outputArray.join(""));
    searchString = outputArray.join("");
    console.log(searchString);
    return this.http.get('http://jikan.me/api/character/' + searchString);
  }
}
