import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { NgIf, NgFor, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/articles';
import { DateagoPipe } from '../../pipes/dateago.pipe';

@Component({
  selector: 'app-article-card',

  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  imports: [RouterLink, NgIf, NgFor, DatePipe, DateagoPipe],
})
export class ArticleCardComponent implements OnChanges {
  @Input() article!: Article;
  uriSection = '';
  constructor() {}

  ngOnChanges(): void {
    this.uriSection =
      this.article?.organization?.slug || this.article.user.username;
  }
}
