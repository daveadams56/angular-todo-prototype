import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-verified-icon',
  templateUrl: './verified-icon.component.html',
  styleUrls: ['./verified-icon.component.scss']
})
export class VerifiedIconComponent {

  @Input() size: string = '24px'

}
