import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-icon',
  templateUrl: './key-icon.component.html',
  styleUrls: ['./key-icon.component.scss']
})
export class KeyIconComponent implements OnInit {

  @Input() size: string = "24px";

  constructor() { }

  ngOnInit(): void {
  }

}
