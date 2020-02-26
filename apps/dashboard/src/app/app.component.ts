import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppFacade, AuthFacade, CalendarEventsFacade } from '@calendar/core-state';
import { Observable, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CalendarEventFormComponent } from '@calendar/ui';
import { CalendarEvent, emptyCalendarEvent } from '@calendar/core-data';

@Component({
  selector: 'calendar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authenticated$: Observable<boolean> = this.authFacade.authenticated$;
  loading$: Observable<boolean>;
  destroy$: Subject<boolean> = new Subject();

  links = [
    // {path: '', title: '', icon: ''},
  ];

  constructor(
    private authFacade: AuthFacade,
    private appFacade: AppFacade,
    private calendarsFacade: CalendarEventsFacade,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.appFacade.initialize();
    this.route.fragment.pipe(
      withLatestFrom(this.authFacade.authenticated$),
      filter(([x, xx]) => x && x.indexOf('access_token') > -1 && !xx),
    ).subscribe(([x]) => {
      const query = {
        access_token: null
      };

      x.split('&').forEach((c) => {
        if (c.indexOf('access_token') > -1) {
          query['access_token'] = c.split('=')[1]
        }
      });

      this.authFacade.authenticate(query);

      this.loading$ = this.appFacade.loading$;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onLogout() {
    this.authFacade.logout();
  }

  onAuthenticate() {
    window.location.replace('http://localhost:3333/api/login')
  }
}
