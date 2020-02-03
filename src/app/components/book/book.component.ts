import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private router: Router,
              private data: DataService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.data.loadUserData();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
