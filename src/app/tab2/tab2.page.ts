import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../annonce/service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listeCategorie: any
  annonce:any
  isSubmitted: boolean = false

  constructor(
    private service : ServiceService,
    private router: Router,
    public formBuilder:FormBuilder,)                
  {}
  // moAnn = newFormGroup

ngOnInit(): void {
  this.listerCategorie();
  this.annonce = this.formBuilder.group({
    description:['', [Validators.required, Validators.minLength(2)]],
    geolocalisation:['', [Validators.required, Validators.minLength(2)]],
    categorie: ['', Validators.required],
    Etat: ['', Validators.required]
  })
}
get errorControl() {
  return this.annonce.controls; 
}
submitForm(form:NgForm) {
  var obj: { [id: string]: any} = {};

    obj.id = this.annonce.value.categorie; 
    this.annonce.value.categorie = obj;
  console.log(this.annonce)
  this.isSubmitted = true;
  if(this.annonce.value){
    this.service.ajoutAnnonce(this.annonce.value).subscribe((res)=>{
      return this.router.navigateByUrl('/liste')
    })
  }
}
listerCategorie(){
  this.service.getAllcategorie().subscribe((data)=>{
    console.log(data);
    return this.listeCategorie=data;
  })
}
// modifieAnn(){
//   this.service.modifierAnnonce(this.router.snapshot.params['id'],this.moAnn.value).subscribe((result:any)=>{
//     return this.router.navigateByUrl("home")
//   })
// }
}
