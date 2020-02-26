import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from '@calendar/core-data';
import { addHours, startOfDay } from 'date-fns';

@Component({
  selector: 'calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.scss']
})
export class CalendarEventFormComponent implements OnInit, OnChanges {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CalendarEventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarEvent
  ) {}

  ngOnInit() {
    this.buildForm(this.data)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.data && changes.data.currentValue.id) {
      this.buildForm(this.data);
    }
  }

  buildForm(vals) {
    this.form = new FormGroup({
      summary: new FormControl(vals.summary),
      description: new FormControl(vals.description)
    })
  }

  onSubmit() {
    const final = {
      ...this.data,
      ...this.form.value,
      start: {dateTime: addHours(startOfDay(new Date()), 2)},
      end: {dateTime: addHours(new Date(), 2)},
    };

    Object.keys(final).forEach((x) => {
      if((!final[x] || final[x] === null || final[x] === '') && final[x] !== false) {
        delete final[x];
      }
    });

    this.dialogRef.close(final);
  }
}
