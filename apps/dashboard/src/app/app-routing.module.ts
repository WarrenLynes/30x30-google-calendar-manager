import { NgModule } from '@angular/core';
import { UiModule } from '@calendar/ui';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'spread', pathMatch: 'full' },
      { path: '404', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: '', canActivate: [AuthGuard], children: [
          { path: '', component: MainComponent}
        ]},
      { path: 'login', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ], { initialNavigation: 'enabled' })
  ]
})
export class AppRoutingModule {}
