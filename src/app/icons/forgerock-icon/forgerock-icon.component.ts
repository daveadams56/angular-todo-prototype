import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgerock-icon',
  templateUrl: './forgerock-icon.component.html',
  styleUrls: ['./forgerock-icon.component.scss']
})
export class ForgerockIconComponent implements OnInit {

  @Input() size: string = "24px";

  constructor() { }

  ngOnInit(): void {
  }

}
