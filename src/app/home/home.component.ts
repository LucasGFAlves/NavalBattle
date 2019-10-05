import { Component, Input, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() position: number;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.connectionService.connect().subscribe(
      resp => this.position = resp.body as number
    );
  }

}
