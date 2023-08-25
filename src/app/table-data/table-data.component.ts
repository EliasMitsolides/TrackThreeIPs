import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
  //, changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDataComponent implements OnInit{

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listCount = 0;
    this.pingTime = 0;
  }

  listCount:number = 0;
  pingTime:number = 0;

  @Input() columns: any[] = [];
  @Input() data: any[] = [];


  addPingToData() {
    this.listCount += 1;

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

      var resultOfThreePings = this.performThreePings();
  }

  performThreePings(){
    const serverSideURL = 'http://127.0.0.1:5000/ping3';
  
    // this.http.get(serverSideURL).subscribe(
    //   (response: any) => {
    //     console.log(response)
    //   }
    // )
  }
}
