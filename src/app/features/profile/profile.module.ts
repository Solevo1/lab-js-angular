import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
