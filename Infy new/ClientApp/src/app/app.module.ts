import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MavMenuComponent } from './mav-menu/mav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RegisterAsComponent } from './register-as/register-as.component';
import { TrainerComponent } from './trainer/trainer.component';
import { ParentComponent } from './parent/parent.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { FooterComponent } from './footer/footer.component';
import { AddNewCourseComponent } from './add-new-course/add-new-course.component';
import { CardsComponent } from './cards/cards.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AfterRegisterComponent } from './after-register/after-register.component';
import { AdminComponent } from './admin/admin.component';
import { NavComponent } from './nav/nav.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { LearnerComponent } from './learner/learner.component';
import { ProfileComponent } from './profile/profile.component';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { FaqComponent } from './faq/faq.component';
import { LsidebarComponent } from './lsidebar/lsidebar.component';
import { TsidebarComponent } from './tsidebar/tsidebar.component';
import { TprofileComponent } from './tprofile/tprofile.component';
import { TcoursesComponent } from './tcourses/tcourses.component';
import { PlaylistComponent } from './playlist/playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    HomeComponent,
    MavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    RegisterAsComponent,
    TrainerComponent,
    ParentComponent,
    SidebarComponent,
    TrainerPageComponent,
    FooterComponent,
    AddNewCourseComponent,
    CardsComponent,
    ImageSliderComponent,
    ViewMoreComponent,
    UserDetailComponent,
    AfterRegisterComponent,
    AdminComponent,
    NavComponent,
    SignOutComponent,
    LearnerComponent,
    ProfileComponent,
    MycoursesComponent,
    FaqComponent,
    LsidebarComponent,
    TsidebarComponent,
    TprofileComponent,
    TcoursesComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule, NgbModule, NgImageSliderModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'RegisterAs', component: RegisterAsComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'Trainer', component: TrainerComponent },
      { path: 'Parent', component: ParentComponent },
      { path: 'Feedback', component: FeedbackComponent },
      { path: 'Trainer-page', component: TrainerPageComponent },
      { path: 'AddNewCourse', component: AddNewCourseComponent },
      { path: 'ViewMore', component: ViewMoreComponent },
      { path: 'user-detail', component: UserDetailComponent },
      { path: 'after-register', component: AfterRegisterComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'sign-out', component: SignOutComponent },
      { path: 'Learner', component: LearnerComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'mycourses', component: MycoursesComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'tprofile', component: TprofileComponent },
      { path: 'tcourses', component: TcoursesComponent },
      { path: 'playlist', component: PlaylistComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
