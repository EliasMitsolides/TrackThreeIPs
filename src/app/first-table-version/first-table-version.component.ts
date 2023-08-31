import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-first-table-version',
  templateUrl: './first-table-version.component.html',
  styleUrls: ['./first-table-version.component.css']
})
export class FirstTableVersionComponent {
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    //this.freqvariable = $("#FrequencyInput")
    

    this.listCount = 0;
    this.pingTime = 0;
    console.log("ngOnInit function: "); // + this.listCount
    let rowwww = this.moreRow.bind(this)
    //setInterval(this.moreRow, 1000) this didn't work without binding to retain thiiiiis listCount
    setInterval(rowwww, 1000) //this works!!!
  }
  
  title = 'TrackThreeIPs';
  listCount:number = 0;
  pingTime:number = 0;

  googleTimedOut:boolean = false;
  routerTimedOut:boolean = false;
  serverTimedOut:boolean = false;

  pingFlag:boolean = true;

  responseGoogle:number = 0;
  responseRouter:number = 0;
  responseServer:number = 0;

  //listCount: number = 0;
  keepGoing = true;

  toggle(){
    this.pingFlag = !this.pingFlag;
  }
  

  increaseRowCount(seconds: number){
    setInterval(()=> {
      this.listCount += 1;
      return this.listCount;
    }, seconds * 1000)
  }


  moreRow(){
    //var frequencyTable = document.getElementById("FrequencyTable");
    // var frequencyTable = (<HTMLInputElement>document.getElementById("FrequencyTable")).;
    // console.log(document.getElementById("FrequencyTable"))
    // console.log(<HTMLInputElement>document.getElementById("FrequencyTable"))
    // var row = frequencyTable.insertRow(-1);
    // console.log(typeof frequencyTable)
    if (this.pingFlag == false){
      return;
    }
    const frequencyTable = <HTMLTableElement>document.querySelector("#FrequencyTable");
    if (frequencyTable){
      var newRow = frequencyTable.insertRow(-1);
      newRow.className = "RowOfTable d-flex";
      var dateTimeTab = newRow.insertCell(0);
      dateTimeTab.className = "flex-grow-1";
      //var firstCellInNewRow = newRow.insertCell(0);
      var GoogleFrequency = newRow.insertCell(1);
      GoogleFrequency.className = "flex-grow-1";
      var RouterFrequency = newRow.insertCell(2);
      RouterFrequency.className = "flex-grow-1";
      var ServerFrequency = newRow.insertCell(3);
      ServerFrequency.className = "flex-grow-1";

      this.listCount += 1;

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

      var resultOfGooglePing = this.pingThreeIPS();
      console.log(resultOfGooglePing);
      console.log(this.pingTime);

      let dateFormat = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`

      //firstCellInNewRow.innerHTML = this.listCount.toString();
      // GoogleFrequency.innerHTML = dateFormat + " " + resultOfGooglePing; // + Math.random() as unknown as string
      const googleWhatToPrint = !this.googleTimedOut ? this.responseGoogle.toFixed(4) : "No Response";
      const routerWhatToPrint = !this.routerTimedOut ? this.responseRouter.toFixed(4) : "No Response";
      const serverWhatToPrint = !this.serverTimedOut ? this.responseServer.toFixed(4) : "No Response";
      //GoogleFrequency.innerHTML = dateFormat + " " + !this.googleTimedOut ? this.responseGoogle.toString() : "No Response";
      dateTimeTab.innerHTML = "" + dateFormat;
      GoogleFrequency.innerHTML = "" + googleWhatToPrint;
      RouterFrequency.innerHTML = "" + routerWhatToPrint;
      ServerFrequency.innerHTML = "" + serverWhatToPrint;
      
      document.getElementById("FrequencyTable")!.style.display = 'none';
      document.getElementById("FrequencyTable")!.style.display = 'block';

    }
  }

  pingFunction() {
    const serverSideURL = 'http://127.0.0.1:5000/ping3';

    return fetch(serverSideURL).then(response => response.json())
  } 

  pingThreeIPS() {
    //const startTime = Date.now();
    //let responseToReturn: number;

    const serverSideURL = 'http://127.0.0.1:5000/ping3';

    // this.pingFunction().then(returnTimes => {
    //   console.log(returnTimes);
    //   this.pingTime = returnTimes.response_time;
    //   responseToReturn = returnTimes.response_time;
    //   return returnTimes.response_time;
    // })
    
  
    this.http.get(serverSideURL).subscribe(
      // if this.pingFunction had (any) for it's parameter, the below line would use the response as it's any/parameter
      // this.pingFunction
      //this '=>' is what starts the callback function
      (response: any) => {
        console.log(response)
        //this is a callback function (an async), everything within the curlies remembers the context of the function at the point
        //  where this arrow was defined (called by the interpreter)
        // we used Flask's "jsonify()" in the back end and made a "response_time" key
        if (response.response_google || response.response_router || response.response_server){
          //const endTime = Date.now();
          
          this.responseGoogle = response.response_google;
          this.googleTimedOut = response.response_google == null || response.response_google === 'undefined';

          this.responseRouter = response.response_router;
          this.routerTimedOut = response.response_router == null || response.response_router === 'undefined';

          this.responseServer = response.response_server;
          this.serverTimedOut = response.response_server == null || response.response_server === 'undefined';
          //console.log(`Ping time: ${pingTime}ms`);
          //responseToReturn = response.response_time;
          //this.pingTime = response.response_time;
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
