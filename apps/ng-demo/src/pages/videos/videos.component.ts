import { Component, OnInit } from '@angular/core';
import { VideosListStore } from './videos-list/services/videos-list.store';
import { VideosHeaderComponent } from './videos-list/videos-header/videos-header.component';
import { ScrollTrackerDirective } from '../../components/scoll-tracker/scroll-tracker.directive';
import { AsyncPipe } from '@angular/common';
import { VideoCardComponent } from './videos-list/video-card/video-card.component';

@Component({
  selector: 'app-videos',

  template: `
    <app-videos-header></app-videos-header>
    <div scrollTracker (scrollingFinished)="onScrollingFinished()">
      @for (videos of videosList$ | async; track videos) {
        <app-video-card [video]="videos"></app-video-card>
      }
    </div>
    `,
  imports: [
    VideosHeaderComponent,
    ScrollTrackerDirective,
    VideoCardComponent,
    AsyncPipe
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
