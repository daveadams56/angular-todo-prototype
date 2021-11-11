import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forgerock-icon',
  templateUrl: './forgerock-icon.component.html',
  styleUrls: ['./forgerock-icon.component.scss']
})
export class ForgerockIconComponent {

  @Input() size: string = "24px";

}
