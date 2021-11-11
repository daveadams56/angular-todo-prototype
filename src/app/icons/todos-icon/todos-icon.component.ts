import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todos-icon',
  templateUrl: './todos-icon.component.html',
  styleUrls: ['./todos-icon.component.scss']
})
export class TodosIconComponent {

  @Input() size: string = "24px";

}
