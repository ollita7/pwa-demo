import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public articles = [];
  public model = {
    source: ''
  };
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  search() {
    this.apiService
    .news(this.model.source)
    .subscribe(response => {
      this.articles = response.articles;
      console.log(response);
    });
  }

}
