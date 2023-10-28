import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDataComponent } from './user-data/user-data.component';
import { authGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
let appRoutes: Routes;
appRoutes = [
    { path: 'login', component: LoginComponent },
    {
      path: 'userList',
      canActivate: [authGuard],
      component: UserListComponent,
    },
    {
      path: 'userForm',
      canActivate: [authGuard],
      component: UserFormComponent,
    },
    {
      path: 'user/:id',
      canActivate: [authGuard],
      component: UserDataComponent,
    },
    {
      path: 'editUser/:id',
      canActivate: [authGuard],
      component: UserFormComponent,
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
