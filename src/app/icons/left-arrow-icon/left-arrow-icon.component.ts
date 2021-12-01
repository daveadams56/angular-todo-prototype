import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-left-arrow-icon',
  templateUrl: './left-arrow-icon.component.html',
})
export class LeftArrowIconComponent {
  @Input() size: string = '24px';
}
