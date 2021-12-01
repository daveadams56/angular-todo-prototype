import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-key-icon',
  templateUrl: './key-icon.component.html',
})
export class KeyIconComponent {
  @Input() size: string = '24px';
}
