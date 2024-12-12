import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideosComponent } from './videos.component';
import { VideosHeaderComponent } from './videos-list/videos-header/videos-header.component';
import { VideoCardComponent } from './videos-list/video-card/video-card.component';
import { ScrollTrackerDirective } from '../../components/scoll-tracker/scroll-tracker.directive';

@NgModule({
  declarations: [
    VideosComponent,
    VideosHeaderComponent,
    VideoCardComponent,
    ScrollTrackerDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: VideosComponent,
      },
    ]),
  ],
})
export class VideosModule {}
