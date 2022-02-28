import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import { PessoaFormComponent } from './pessoas/pessoa-form/pessoa-form.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    PessoasComponent,
    PessoaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
