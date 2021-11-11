import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-icon',
  templateUrl: './action-icon.component.html'
})
export class ActionIconComponent {

  @Input() size: string = "24px";

}
