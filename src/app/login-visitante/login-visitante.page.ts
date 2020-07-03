import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login-visitante',
  templateUrl: './login-visitante.page.html',
  styleUrls: ['./login-visitante.page.scss'],
})
export class LoginVisitantePage implements OnInit {
@ViewChild(IonSlides) slides: IonSlides;

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
}
