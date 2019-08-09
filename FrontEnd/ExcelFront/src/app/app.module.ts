import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AppRoutingModule, Allroutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    Allroutes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
    
  ],
  providers: [BsModalService,ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
