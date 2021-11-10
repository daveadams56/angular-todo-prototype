import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-icon',
  templateUrl: './todo-icon.component.html',
  styleUrls: ['./todo-icon.component.scss']
})
export class TodoIconComponent implements OnInit {

  @Input() size: string = "24px";
  @Input() completed?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
