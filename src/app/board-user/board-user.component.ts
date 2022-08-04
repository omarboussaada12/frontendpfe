import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  show:boolean=false;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
        this.show=true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show=false;
        this.router.navigate(['/login'])
        
      }
    );
  }
}
