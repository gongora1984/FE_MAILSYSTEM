import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-container',
  templateUrl: './simple-container.component.html',
  styleUrls: ['./simple-container.component.scss']
})
export class SimpleContainerComponent implements OnInit {

  @Input() header?: string;

  @Input() data?: string;

  @Input() isGray?: boolean = false;

  @Input() isCheckable?: boolean = false;

  @Input() active: boolean = false;

  @Input() pb0?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
