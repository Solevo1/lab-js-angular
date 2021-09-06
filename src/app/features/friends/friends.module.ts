import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { FriendsRoutingModule } from './friends-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [FriendsComponent]
})
export class FriendsModule { }
