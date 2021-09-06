import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./features/friends/friends.module').then(m => m.FriendsModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./features/games/games.module').then(m => m.GamesModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
