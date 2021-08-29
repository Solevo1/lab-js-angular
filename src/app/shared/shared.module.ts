import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

const PUBLIC_COMPONENTS = [NavbarComponent];

@NgModule({
  declarations: [
    ...PUBLIC_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ...PUBLIC_COMPONENTS,
  ],
})
export class SharedModule { }
