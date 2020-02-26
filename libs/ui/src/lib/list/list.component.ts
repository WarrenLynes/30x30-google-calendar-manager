import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'calendar-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() items: any[];
  @Input() item: any;
  @Input() titleKey: string;
  @Input() subtitleKey: string;
  @Output() selectItem = new EventEmitter();

}
