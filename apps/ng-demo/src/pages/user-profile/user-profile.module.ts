import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { RouterModule } from '@angular/router';
import { ArticleCardModule } from '../../components/article-card/article-card.component';

@NgModule({
  declarations: [UserProfileComponent, UserHeaderComponent],
  imports: [
    ArticleCardModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserProfileComponent,
      },
    ]),
  ],
})
export class UserProfileModule {}
