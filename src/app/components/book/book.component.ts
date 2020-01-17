import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onLogout() {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    this.router.navigateByUrl('/login');
  }

}
