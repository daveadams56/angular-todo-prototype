import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-icon',
  templateUrl: './todo-icon.component.html'
})
export class TodoIconComponent {

  @Input() size: string = "24px";
  @Input() completed?: boolean = false;

}
