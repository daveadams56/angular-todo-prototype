import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-icon',
  templateUrl: './angular-icon.component.html',
  styleUrls: ['./angular-icon.component.scss']
})
export class AngularIconComponent implements OnInit {

  @Input() size: string = "24px";

  constructor() { }

  ngOnInit(): void {
  }

}
