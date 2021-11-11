import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KbaCreateCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-kba',
  templateUrl: './kba.component.html'
})
export class KbaComponent {

  @Input() callback?: KbaCreateCallback
  @Input() name?: string
  @Output() setQuestion = new EventEmitter<string>();
  @Output() setAnswer = new EventEmitter<string>();

  questionSet(event: any): void {
    this.setQuestion.emit(event.target.value);
  }

  answerSet(event: any): void {
    this.setAnswer.emit(event.target.value);
  }
}
