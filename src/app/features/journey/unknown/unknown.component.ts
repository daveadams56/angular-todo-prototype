import { Component, Input, OnInit } from '@angular/core';
import { FRCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.scss']
})
export class UnknownComponent implements OnInit {

  @Input() callback?: FRCallback

  constructor() { }

  ngOnInit(): void {
  }

}
