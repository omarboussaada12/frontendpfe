import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { CommandeService } from '../_services/commande.service';
import { Commande } from '../_model/Commande';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {
  content?: string;
  commandes? :any = [Commande];
  isadmin:boolean = false;
  currentUser: any;
  show:boolean=false;

  constructor(
    private userService: UserService,
    private token: TokenStorageService,
    private commandeService : CommandeService,
    private router: Router) { }

  ngOnInit(): void {
   
    const currentUser = this.token.getUser();
    this.userService.getModeratorBoard().subscribe(
      data => {
        this.content = data;
       this.show=true;
       if(currentUser.roles == 'ROLE_ADMIN')
       {
        this.isadmin=true;
        this.fetchcommandeA();
       }else
       {
       this.fetchcommandeU(currentUser.username);
       }
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show=false;
        this.router.navigate(['/home'])
      }
    );
   
    
  }
  fetchcommandeA() {
    return this.commandeService.getCommandesadmin().subscribe((res: {}) => {
      this.commandes = res;
    });
  }
  fetchcommandeU(username : String) {
    return this.commandeService.getCommandesuser(username).subscribe((res: {}) => {
      this.commandes = res;
    });
  }

}
