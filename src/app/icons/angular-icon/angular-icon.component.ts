import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-angular-icon',
  templateUrl: './angular-icon.component.html',
  styleUrls: ['./angular-icon.component.scss']
})
export class AngularIconComponent {

  @Input() size: string = "24px";

}
