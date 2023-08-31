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

    let pingTick = this.addPingToDataField.bind(this)
    //setInterval(this.moreRow, 1000) this didn't work without binding to retain thiiiiis listCount
    setInterval(pingTick, 1000) //this works!!!
  }

  @Input() columns: any[] = ["Date & Time", "Google Frequency", "Router Frequency", "Server Frequency"];
  @Input() data: any[][] = [];

  pingFlag:boolean = true;

  listCount:number = 0;
  pingTime:number = 0;

  responseGoogle:number = 0;
  responseRouter:number = 0;
  responseServer:number = 0;

  googleTimedOut:boolean = false;
  routerTimedOut:boolean = false;
  serverTimedOut:boolean = false;

  listCap:number = 300;

  toggle(){
    this.pingFlag = !this.pingFlag;
  }

  addPingToDataField() {
    if (this.pingFlag == false){
      return;
    }

    this.listCount += 1;

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    let pingDateFormatted = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`

    var resultOfThreePings = this.performThreePings();

    const googleWhatToPrint = !this.googleTimedOut ? this.responseGoogle.toFixed(4) : "No Response";
    const routerWhatToPrint = !this.routerTimedOut ? this.responseRouter.toFixed(4) : "No Response";
    const serverWhatToPrint = !this.serverTimedOut ? this.responseServer.toFixed(4) : "No Response";

    //unshift adds to the beginning of the array, ngFor will print pings by recency
    this.data.unshift([pingDateFormatted ,googleWhatToPrint, routerWhatToPrint, serverWhatToPrint])
    
    if (this.data.length > this.listCap){
      console.log(this.data.length)
      console.log(this.data.pop())
      console.log(this.data.length)
    }
}

  performThreePings(){
    const serverSideURL = 'http://127.0.0.1:5000/ping3';
  
    this.http.get(serverSideURL).subscribe(
      (response: any) => {
        console.log(response)
        if (response.response_google || response.response_router || response.response_server){
          this.responseGoogle = response.response_google;
          this.googleTimedOut = response.response_google == null || response.response_google === 'undefined';

          this.responseRouter = response.response_router;
          this.routerTimedOut = response.response_router == null || response.response_router === 'undefined';

          this.responseServer = response.response_server;
          this.serverTimedOut = response.response_server == null || response.response_server === 'undefined';
        }
      },
      (error) => {
        //this is another callback function 
        console.error('Ping failed:', error);
        return ("Ping Failed")
      }
    );
    return "request submitted";
      
  }
}
