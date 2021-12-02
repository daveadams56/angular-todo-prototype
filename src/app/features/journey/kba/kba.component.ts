/*
 * angular-todo-prototype
 *
 * kba.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KbaCreateCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-kba',
  templateUrl: './kba.component.html',
})
export class KbaComponent {
  @Input() callback?: KbaCreateCallback;
  @Input() name?: string;
  @Output() setQuestion = new EventEmitter<string>();
  @Output() setAnswer = new EventEmitter<string>();

  questionSet(event: any): void {
    this.setQuestion.emit(event.target.value);
  }

  answerSet(event: any): void {
    this.setAnswer.emit(event.target.value);
  }
}
