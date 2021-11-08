import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos-icon',
  templateUrl: './todos-icon.component.html',
  styleUrls: ['./todos-icon.component.scss']
})
export class TodosIconComponent implements OnInit {

  @Input() size: string = "24px";

  constructor() { }

  ngOnInit(): void {
  }

}
