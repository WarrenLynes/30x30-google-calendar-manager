import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule } from '@ngrx/store';

import { CoreDataModule } from '@calendar/core-data';
import { reducers } from '.';
import { AuthEffects } from './auth/auth.effects';
import { CalendarEventsEffects } from './calendar-events/effects';
import { MaterialModule } from '@calendar/material';
import { CalendarsEffects } from './calendars/effects';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  }
};

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    MaterialModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([
      AuthEffects,
      CalendarEventsEffects,
      CalendarsEffects
    ]),
    StoreDevtoolsModule.instrument({ name: 'calendarEvents Store' })
  ],
  providers: [DataPersistence]
})
export class CoreStateModule {}
