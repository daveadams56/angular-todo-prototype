import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-icon',
  templateUrl: './account-icon.component.html',
})
export class AccountIconComponent {
  @Input() size: string = '24px';
}
