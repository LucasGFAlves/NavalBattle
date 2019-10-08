import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { GameControl } from '../game-control';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() tableId: number;
  @Input() playerId: number;
  @Input() row: number;
  @Input() col: number;

  constructor(private connectionService: ConnectionService, private gameControl: GameControl) { }

  ngOnInit() {
    
  }

  onShoot() {
    let content = this.gameControl.ships[this.tableId][this.row][this.col];
    if (content == "unk")
    {
      if (this.gameControl.isFinished)
      {
        alert("O jogo acabou.");
        return;
      }
      if (!this.gameControl.isStarted)
      {
        alert("O jogo ainda não começou.");
        return;
      }
      if (this.gameControl.currentPlayer != this.playerId)
      {
        alert("Aguarde sua vez!");
        return;
      }  
      this.gameControl.currentPlayer = 1 - this.playerId;
      this.connectionService.shoot(this.row, this.col).subscribe(
        resp => {
          this.gameControl.hits[this.tableId][this.row][this.col] = true;
          let shipPart = resp.body as string;
          this.gameControl.ships[this.tableId][this.row][this.col] = shipPart;
          if (shipPart != "agu")
          {
            this.gameControl.hitsCount[this.tableId]++;
            if (this.gameControl.hitsCount[this.tableId] == this.gameControl.totalHits)
            {
              this.gameControl.isStarted = false;
              alert("Você venceu!");
            }
          }
        }
      )
    }
  }

}
