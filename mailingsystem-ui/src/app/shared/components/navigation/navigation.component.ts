import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent implements OnInit {

  @Output()
  sidebarExpanded: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar(expanded: any) {
    this.sidebarExpanded = expanded;
  }

}
