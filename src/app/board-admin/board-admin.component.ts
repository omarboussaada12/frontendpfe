import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  username:String ="";
  currentUser: any;
  show:boolean=false;

  constructor(private userService: UserService,
    private token: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
 
    this.currentUser = this.token.getUser();
    if(this.currentUser.username ==="")
    {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
       this.show=true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show=false;
        this.router.navigate(['/home'])
      }
    );
    }else{
      this.router.navigate(['/home'])
    }
  }
}
