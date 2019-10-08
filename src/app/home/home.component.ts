import { Component, Input, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { GameControl } from '../game-control';
import { TablesDto } from '../tables-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() position: number;

  constructor(private connectionService: ConnectionService, private gameControl: GameControl) { }

  ngOnInit() {
    this.connectionService.connect().subscribe(
      resp => {
        this.position = resp.body as number;
        
        this.connectionService.getTables(this.position).subscribe(
          resp => {
            let data:TablesDto = resp.body as TablesDto;
            this.gameControl.ships = data.ships;
            this.gameControl.hits = data.hits;
          }
        )
      }
    );

    this.connectionService.callbackGameControl = (gameControlServer: GameControl) => {
      this.gameControl.isStarted = gameControlServer.isStarted;
      this.gameControl.currentPlayer = gameControlServer.currentPlayer;
      if (gameControlServer.lastRow != null)
      {
        this.gameControl.hits[gameControlServer.lastCurrentPlayer][gameControlServer.lastRow][gameControlServer.lastCol] = true;
      }
      this.gameControl.hitsCount[0] = gameControlServer.hitsCount[0];
      this.gameControl.hitsCount[1] = gameControlServer.hitsCount[1];
      if (!this.gameControl.isFinished && this.gameControl.hitsCount[this.position] == this.gameControl.totalHits)
      {
        alert("Você perdeu!!!");
      }
      this.gameControl.isFinished = gameControlServer.isFinished;
    }
  }

}
