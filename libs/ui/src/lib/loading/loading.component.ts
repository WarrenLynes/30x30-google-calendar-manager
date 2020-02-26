import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'calendar-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnChanges {

  _loading = false;
  @Input() loading: boolean;

  constructor(
    private cdRdf: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.loading && changes.loading.currentValue) {
      this._loading = this.loading;
      this.cdRdf.detectChanges();
    }
  }

}
