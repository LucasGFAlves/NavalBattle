import { Injectable } from "@angular/core";

@Injectable()
export class GameControl {
    public isStarted: boolean = false;
    public isFinished: boolean = false;
    public currentPlayer: number = 0;
    public ships: string[][][] = [[], []];
    public hits: boolean[][][] = [[], []];
    public hitsCount: number[] = [0, 0];
    public lastCurrentPlayer: number = null;
    public lastRow: number = null;
    public lastCol: number = null;
    public readonly totalHits: number = 18;
}
