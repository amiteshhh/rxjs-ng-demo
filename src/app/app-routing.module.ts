import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicObservableComponent } from './basic-observable/basic-observable.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';


const routes: Routes = [
  {
    path: 'observable', component: BasicObservableComponent
  },
  {
    path: 'typeahead', component: TypeaheadComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
