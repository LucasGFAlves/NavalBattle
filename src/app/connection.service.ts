import { Injectable } from "@angular/core"
import { BehaviorSubject, interval } from "rxjs"
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";
import { environment } from '../environments/environment';
import { GameControl } from './game-control';

@Injectable({
  providedIn: "root"
})
export class ConnectionService {
  public connected$ = new BehaviorSubject<boolean>(false);
  public connState: boolean;
  private source = interval(1000);
  public callbackGameControl: (gameControl: GameControl) => void = (gameControl: GameControl) => {};
  
  constructor(private _http: HttpClient) {
    this.source.subscribe(() => {
      this._http.get(environment.apiUrl + "/gameControl/", { observe: 'response' })
      .pipe(first())
      .subscribe(resp => {
        if (resp.status === 200) {
          this.callbackGameControl(resp.body as GameControl);
        }
      }), err => this.connected(false);
    });
  }
  
  connected(data: boolean) {
    this.connState = data;
    this.connected$.next(this.connState);
  }
  
  public connect()
  {
    return this._http.get(environment.apiUrl + "/connect", { observe: 'response' });
  }
  
  public shoot(row: number, col: number)
  {
    return this._http.get(environment.apiUrl + "/shoot/" + row + "/" + col, { observe: 'response' });
  }

  public getTables(position: number)
  {
    return this._http.get(environment.apiUrl + "/getTables/" + position, { observe: 'response' });
  }
}