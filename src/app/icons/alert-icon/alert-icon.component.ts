import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-icon',
  templateUrl: './alert-icon.component.html',
  styleUrls: ['./alert-icon.component.scss']
})
export class AlertIconComponent {

  @Input() size: string = '24px'

}
