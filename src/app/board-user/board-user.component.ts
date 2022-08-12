import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from '../_model/Commande';
import { Offer } from '../_model/Offer';
import { CommandeService } from '../_services/commande.service';
import { OfferService } from '../_services/offer.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  show:boolean=false;
  offers? :any = [Offer];

  constructor(private userService: UserService,
    private offerService: OfferService,
    private commandeService: CommandeService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
        this.show=true;
        this.fetchlistoffername();
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.show=false;
        this.router.navigate(['/login'])
        
      }
    );
  }
  fetchlistoffername() {
    return this.offerService.getOffers().subscribe((res: {}) => {
      this.offers = res;
    });
  }
  addCommande() {
    return this.commandeService.addCommande(Commande).subscribe((res: {}) => {
      this.offers = res;
    });
  }
}
