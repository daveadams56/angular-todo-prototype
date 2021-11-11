import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lock-icon',
  templateUrl: './lock-icon.component.html'
})
export class LockIconComponent {

  @Input() size: string = "24px";

}
