import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-icon',
  templateUrl: './home-icon.component.html'
})
export class HomeIconComponent {

  @Input() size: string = "24px";

}
