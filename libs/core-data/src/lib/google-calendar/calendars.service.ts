import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CalendarEvent, emptyCalendarEvent } from './calendar-event';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalendarsService {

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get('/api/me/calendars').pipe(
      map((x: any) => x.items)
    )
  }

  create(model) {
    return this.httpClient.post('/api/me/calendars', model).pipe(
      map((x: any) => ({...x, id: x.resourceName}))
    );
  }

  getUrlForId(id) {
    return `/api/me/calendars/${id}`;
  }

  update(model) {
    return this.httpClient.put(this.getUrlForId(model.id), model).pipe(
      map((x: any) => ({...x, id: x.resourceName}))
    )
  }

  delete(modelId) {
    return this.httpClient.delete(this.getUrlForId(modelId))
  }
}
