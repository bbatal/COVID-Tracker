import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  opened: boolean = true;
  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(private router: Router,
              private countryService: ConfigService) { }

  ngOnInit() {
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
