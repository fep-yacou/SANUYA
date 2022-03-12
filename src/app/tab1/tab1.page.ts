import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnnonceServiceService } from '../Services/annonce-service.service';
import { CategorieServiceService } from '../categorie/categorie-service.service';
import { IonSlides, PopoverController } from '@ionic/angular';
import { ValiderAnnoncePage } from './ValiderAnnonce/valider-annonce/valider-annonce.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  listCategorie : any;
  photo = environment.URLPhoto;
  annonce : any;

  @ViewChild('picSlider',  {static: false}) viewer: IonSlides;
  constructor(
    private aService : AnnonceServiceService,
    private categorieService : CategorieServiceService,
    public popover: PopoverController
  ) { }
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400,
    autoplay:true,

  };
  ngOnInit() {
    this.getAnnonce();
  }

  getAnnonce(){
    this.aService.listeAnnonce().subscribe(res=>{
      this.annonce = res;
      console.log(this.annonce);
      
    })
  }

  getCategorie(){
    this.categorieService.listeCategorie().subscribe(res=>{
      this.listCategorie = res;
      console.log(this.listCategorie); 
    })
  }


  async obtenir(id: any){
    this.aService.setIdAnnonce(id);
    const popover = await this.popover.create({
      component: ValiderAnnoncePage,
      translucent: false
    });
    await popover.present();
    const{role} = await popover.onDidDismiss();
  }

}


