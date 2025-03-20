import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // ✅ Protegido
  { path: 'home', component: HomeComponent },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: 'home' } // Redireciona páginas inexistentes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// // Importando os componentes corretamente
// import { HomeComponent } from './modules/home/home.component';
// import { LoginComponent } from './modules/login/login.component';
// import { AdminComponent } from './modules/admin/admin.component';
// import { AuthGuard } from './guards/auth.guard';

// const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redireciona para a home ao acessar '/'
//   { path: 'home', component: HomeComponent }, // Define a rota para a HomeComponent
//   { path: 'login', component: LoginComponent },
//   { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
//   { path: '**', redirectTo: '' },
//   { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
//   { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
//   { path: 'carts', loadChildren: () => import('./modules/carts/carts.module').then(m => m.CartsModule) },
//   { path: 'sales', loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule) }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
