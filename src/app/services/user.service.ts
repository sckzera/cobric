import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";  

@Injectable({ providedIn: "root" })

export class UserService {
  constructor() {}

  private dataSource = new BehaviorSubject("{ERRO}");
  serviceData = this.dataSource.asObservable();
  private dataSource2 = new BehaviorSubject("{ERRO}");
  serviceData2 = this.dataSource2.asObservable();
  private dataSource3 = new BehaviorSubject("{ERRO}");
  serviceData3 = this.dataSource3.asObservable();

  changeData(data: any, data2: any) {
    this.dataSource.next(data);
    this.dataSource2.next(data2);
  }
  changeData2(data: any) {
    this.dataSource3.next(data);
  }
}