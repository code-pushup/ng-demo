import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../../models/articles';
import { DateagoPipe } from '../../pipes/dateago.pipe';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
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

@NgModule({
  declarations: [ArticleCardComponent, DateagoPipe],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [ArticleCardComponent],
})
export class ArticleCardModule {}
