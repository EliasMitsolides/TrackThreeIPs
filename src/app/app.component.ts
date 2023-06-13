import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit() {
    this.listCount = 0;
    console.log("ngOnInit function: "); // + this.listCount
    let rowwww = this.moreRow.bind(this)
    //setInterval(this.moreRow, 1000) this didn't work without binding to retain thiiiiis listCount
    setInterval(rowwww, 1000) //this works!!!
  }
  title = 'TrackThreeIPs';
  listCount:number = 0;
  //listCount: number = 0;
  keepGoing = true;
  

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
    const frequencyTable = <HTMLTableElement>document.querySelector("#FrequencyTable");
    if (frequencyTable){
      var newRow = frequencyTable.insertRow(-1);
      newRow.className = "RowOfTable";
      //var firstCellInNewRow = newRow.insertCell(0);
      var GoogleFrequency = newRow.insertCell(0);

      this.listCount += 1;

      var date = new Date();

      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();

      var hour = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

      let dateFormat = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`

      //firstCellInNewRow.innerHTML = this.listCount.toString();
      GoogleFrequency.innerHTML = dateFormat; // + Math.random() as unknown as string
    }
  }

  
}
