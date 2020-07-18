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

  changeData(data: any, data2: any) {
    this.dataSource.next(data);
    this.dataSource2.next(data2);
  }
}