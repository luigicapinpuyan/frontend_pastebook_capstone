import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SearchListComponent } from './pages/search-list/search-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddPostComponent } from './components/add-post/add-post.component';
import { FriendRequestComponent } from './modals/friend-request-modal/friend-request.component';
import { FriendRequestIndividualComponent } from './components/friend-request-individual/friend-request-individual.component';
import { PostIndividualComponent } from './components/post-individual/post-individual.component';
import { LikeModalComponent } from './modals/like-modal/like-modal.component';
import { CommentModalComponent } from './modals/comment-modal/comment-modal.component';
import { PostPageComponent } from './pages/post-page/post-page.component';

import { FriendListComponent } from './components/friend-list/friend-list.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AboutmeModalComponent } from './modals/aboutme-modal/aboutme-modal.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AddAlbumModalComponent } from './modals/add-album-modal/add-album-modal.component';
import { PhotoListComponent } from './pages/photo-list/photo-list.component';
import { TimeDifferencePipe } from './pipes/time-difference.pipe';
import { EditPostModalComponent } from './modals/edit-post-modal/edit-post-modal.component';



const  appRoutes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'search-list', component: SearchListComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'post-page', component: PostPageComponent},
  {path: 'eme', component: PostIndividualComponent},
  {path: 'album', component: PhotoListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    ProfileComponent,
    SettingsComponent,
    SearchListComponent,
    NavbarComponent,
    FooterComponent,
    NotificationsComponent,
    AddPostComponent,
    FriendRequestComponent,
    FriendRequestIndividualComponent,
    PostIndividualComponent,
    LikeModalComponent,
    CommentModalComponent,
    PostPageComponent,
    FriendListComponent,
    TimelineComponent,
    AboutmeModalComponent,
    AlbumListComponent,
    AddAlbumModalComponent,
    PhotoListComponent,
    TimeDifferencePipe,
    EditPostModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
