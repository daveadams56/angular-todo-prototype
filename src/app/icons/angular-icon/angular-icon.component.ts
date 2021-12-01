import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-angular-icon',
  templateUrl: './angular-icon.component.html',
})
export class AngularIconComponent {
  @Input() size: string = '24px';
}
