import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PasswordCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  @Input() callback?: PasswordCallback
  @Input() name?: string
  @Output() updatedCallback = new EventEmitter<string>();

  isVisible: boolean = false;
  // TODO make this reactive to policy requirements
  isRequired: boolean = false;
  stringAttributeName: string = "text"

  constructor() { }

  ngOnInit(): void {
  }

  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.value);
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

}
