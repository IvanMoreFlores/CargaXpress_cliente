import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register(id: Number) {
    this.router.navigate(['/register', id]);
  }

}
