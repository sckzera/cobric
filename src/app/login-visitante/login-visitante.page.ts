import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonCheckbox, IonRadio, IonToggle } from '@ionic/angular';

@Component({
  selector: 'app-login-visitante',
  templateUrl: './login-visitante.page.html',
  styleUrls: ['./login-visitante.page.scss'],
})
export class LoginVisitantePage implements OnInit {
@ViewChild(IonSlides) slides: IonSlides;
@ViewChild(IonToggle) toggle: IonToggle;

  constructor() { }

  ngOnInit() {
  }
  
  segmentChanged(event: any){
  
  if(event.detail.value ==="register"){
    this.slides.slideNext();
  }
  else
  {
   this.slides.slidePrev();
  }
}

  
  checkboxRadio() {
    console.log(this.toggle.checked)
    var elemento3 = document.getElementById("classTelefone");
    var elemento = document.getElementById("classRA");
    var elemento2 = document.getElementById("labelnao");
    var elemento4 = document.getElementById("labelsim");
    if(this.toggle.checked === true){
      elemento3.hidden=true;
      elemento.hidden=false;
      elemento4.style.color = "green" ;
      elemento2.style.color = "White" ;
    } else if(this.toggle.checked === false){
      elemento3.hidden=false;
      elemento.hidden=true;
      elemento4.style.color = "white" ;
      elemento2.style.color = "green" ;
    }
    
  }


}
