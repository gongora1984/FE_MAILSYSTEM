import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-collasable-container',
  templateUrl: './collasable-container.component.html',
  styleUrls: ['./collasable-container.component.scss']
})
export class CollasableContainerComponent implements OnInit {

  @Input() header?: string;

  @Input() data?: string;

  @Input() isGray?: boolean = false;

  @Input() stopPropagation?: boolean = false;

  @Input() content?: TemplateRef<any> | any;

  @Input() isCheckable?: boolean = false;

  @Input() active: boolean = false;

  @Input() isExpanded: boolean = true;

  @Input() onlyExpansionPanel?: boolean = false;

  @Output() public onOpenExpansionPanel = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onOpenPanel() {
    this.onOpenExpansionPanel.emit(true);
  }

  onClosePanel() {
    this.onOpenExpansionPanel.emit(false);
  }
}
