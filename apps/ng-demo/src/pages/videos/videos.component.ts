import { Component, OnInit } from '@angular/core';
import { VideosListStore } from './videos-list/services/videos-list.store';
import { VideosHeaderComponent } from './videos-list/videos-header/videos-header.component';
import { ScrollTrackerDirective } from '../../components/scoll-tracker/scroll-tracker.directive';
import { NgFor, AsyncPipe } from '@angular/common';
import { VideoCardComponent } from './videos-list/video-card/video-card.component';

@Component({
  selector: 'app-videos',

  template: `
    <app-videos-header></app-videos-header>
    <div scrollTracker (scrollingFinished)="onScrollingFinished()">
      <ng-container *ngFor="let videos of videosList$ | async">
        <app-video-card [video]="videos"></app-video-card>
      </ng-container>
    </div>
  `,
  imports: [
    VideosHeaderComponent,
    ScrollTrackerDirective,
    NgFor,
    VideoCardComponent,
    AsyncPipe,
  ],
})
export default class VideosComponent implements OnInit {
  page = '0';
  videosList$ = this.VideosListStore.VideosList$;

  constructor(private VideosListStore: VideosListStore) {}

  ngOnInit(): void {
    this.VideosListStore.getVideoslist({
      page: this.page,
      signature: '4072170',
    });
    console.log(this.videosList$);
  }

  onScrollingFinished() {
    this.page = (Number(this.page) + 1).toString();
    this.VideosListStore.getVideoslist({
      page: this.page,
      signature: '4072170',
    });
  }
}
