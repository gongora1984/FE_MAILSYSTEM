import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {CompanyService} from "../../../../services/company.service";
import {CompanyDto} from "../../../../models/company/company-dto";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Output()
  openRequest: EventEmitter<boolean> = new EventEmitter<boolean>();
  sidebarExpanded: boolean = false;

  _expanded: boolean = false;

  searchText: string = '';

  companyInfo: CompanyDto = {};
  constructor(private _router: Router,
              private _companyService: CompanyService) {


  }

  ngOnInit(): void {
    //load company information here
    this.companyInfo = {
      id: '',
      companyName: ''
    };
  }
  @Input() get expanded(): boolean {
    return this._expanded;
  }

  set expanded(value: boolean) {
    this._expanded = value;
    this.sidebarExpanded = value;
  }


  // redirect() {
  //   this._router
  //     .navigateByUrl('/', {skipLocationChange: true})
  //     .then(() => this._router.navigate(['/loan/' + this.searchText]));
  // }

}
