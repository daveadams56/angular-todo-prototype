import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user-icon',
  templateUrl: './new-user-icon.component.html',
  styleUrls: ['./new-user-icon.component.scss']
})
export class NewUserIconComponent implements OnInit {

  @Input() size: string = "24px";

  constructor() { }

  ngOnInit(): void {
  }

}
