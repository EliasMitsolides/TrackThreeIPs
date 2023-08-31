import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableDataComponent } from './table-data/table-data.component';
import { FirstTableVersionComponent } from './first-table-version/first-table-version.component';

const routes: Routes = [
  {path: 'ping', component: TableDataComponent},
  {path: 'first', component: FirstTableVersionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
