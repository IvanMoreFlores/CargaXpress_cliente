import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-chofer',
  templateUrl: './register-chofer.page.html',
  styleUrls: ['./register-chofer.page.scss'],
})
export class RegisterChoferPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register_chofer() {
    this.router.navigateByUrl('/welcome-chofer');
  }

}
