import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forgerock-icon',
  templateUrl: './forgerock-icon.component.html',
})
export class ForgerockIconComponent {
  @Input() size: string = '24px';
}
