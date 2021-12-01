import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todos-icon',
  templateUrl: './todos-icon.component.html',
})
export class TodosIconComponent {
  @Input() size: string = '24px';
}
