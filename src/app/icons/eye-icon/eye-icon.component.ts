import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-eye-icon',
  templateUrl: './eye-icon.component.html',
  styleUrls: ['./eye-icon.component.scss']
})
export class EyeIconComponent implements OnInit {

  @Input() visible: boolean = true;
  @Input() size: string = "24px";

  constructor() { }

  ngOnInit(): void {
  }

}
