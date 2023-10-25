import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  copyright: string = '';
  ngOnInit(): void {
    this.copyright = 'HNH MAIL SYSTEM© ' + new Date().getFullYear() + ' All Rights Reserved.';
  }

}
