import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-icon',
  templateUrl: './alert-icon.component.html',
  styleUrls: ['./alert-icon.component.scss']
})
export class AlertIconComponent implements OnInit {

  @Input() size: string = '24px'

  constructor() { }

  ngOnInit(): void {
  }

}
