import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-welcome-chofer',
  templateUrl: './welcome-chofer.page.html',
  styleUrls: ['./welcome-chofer.page.scss'],
})
export class WelcomeChoferPage implements OnInit {

  constructor(private router: Router,
    private menu: MenuController) {
    this.menu.enable(false, 'custom');
  }

  ngOnInit() {
  }

  home() {
    this.router.navigateByUrl('/tabs02');
  }

}
