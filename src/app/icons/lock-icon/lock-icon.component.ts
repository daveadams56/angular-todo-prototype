import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lock-icon',
  templateUrl: './lock-icon.component.html',
  styleUrls: ['./lock-icon.component.scss']
})
export class LockIconComponent implements OnInit {

  @Input() size: string = "24px";

  constructor() { }

  ngOnInit(): void {
  }

}
