import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-arrow-icon',
  templateUrl: './left-arrow-icon.component.html',
  styleUrls: ['./left-arrow-icon.component.scss']
})
export class LeftArrowIconComponent implements OnInit {

  @Input() size: string = "24px";

  constructor() { }

  ngOnInit(): void {
  }

}
