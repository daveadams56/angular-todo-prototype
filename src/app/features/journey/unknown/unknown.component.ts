import { Component, Input } from '@angular/core';
import { FRCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html'
})
export class UnknownComponent {

  @Input() callback?: FRCallback
}
