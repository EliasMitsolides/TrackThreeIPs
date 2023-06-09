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
    //setInterval(rowwww, 1000) this works!!!
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
      var firstCellInNewRow = newRow.insertCell(0);
      var secondCellInNewRow = newRow.insertCell(1);

      this.listCount += 1;

      firstCellInNewRow.innerHTML = this.listCount.toString();
      secondCellInNewRow.innerHTML = Math.random() as unknown as string;
    }
  }

  
}
