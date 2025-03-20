import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'products', loadChildren: () => import('./pages/products-management/products-management.module').then(m => m.ProductsManagementModule) },
      { path: 'users', loadChildren: () => import('./pages/users-management/users-management.module').then(m => m.UsersManagementModule) }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
