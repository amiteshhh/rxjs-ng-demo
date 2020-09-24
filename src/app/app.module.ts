import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoMaterialModule } from './material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './footer/footer.component';
import { BasicObservableComponent } from './basic-observable/basic-observable.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { ThrottleClickDirective } from './throttle-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BasicObservableComponent,
    TypeaheadComponent,
    ThrottleClickDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initApp,
    //   multi: true,
    //   deps: [HttpClient]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function initApp(http: HttpClient) {
  return async (): Promise<any> => {
    const url = environment.apiBaseUrl + '/users/1';
    const user = await http.get(url).pipe(delay(1000)).toPromise();
    return user;
  };
}
