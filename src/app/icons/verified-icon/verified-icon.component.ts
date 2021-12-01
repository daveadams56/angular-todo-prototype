import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-verified-icon',
  templateUrl: './verified-icon.component.html',
})
export class VerifiedIconComponent {
  @Input() size: string = '24px';
}
