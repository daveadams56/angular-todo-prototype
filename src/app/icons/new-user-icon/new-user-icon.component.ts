import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-user-icon',
  templateUrl: './new-user-icon.component.html'
})
export class NewUserIconComponent {

  @Input() size: string = "24px";

}
