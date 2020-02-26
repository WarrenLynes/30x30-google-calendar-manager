import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from '@calendar/material';
import { CalendarEventFormComponent } from './calendar-event-form/calendar-event-form.component';
import { ListComponent } from './list/list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    NgbModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [
    LoadingComponent,
    CalendarEventFormComponent,
    ListComponent,
    CalendarComponent
  ],
  exports: [
    LoadingComponent,
    CalendarEventFormComponent,
    ListComponent,
    CalendarComponent
  ],
  entryComponents: [CalendarEventFormComponent]
})
export class UiModule {}
