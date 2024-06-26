import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductAddComponent } from './pages/admin/product-add/product-add.component';
import { ProductEditComponent } from './pages/admin/product-edit/product-edit.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
    {
        path: '', 
        component: LayoutClientComponent,
        children: [
            {
                path: '', 
                component: HomePageComponent
            },
            {
                path: 'home', 
                redirectTo: '/'
            },
            {
                path: 'details/:id',
                component: ProductDetailsComponent,
            },
        ]
    },
    {
        path: 'admin', 
        component: LayoutAdminComponent,
        children: [
            {
                path: '', 
                component: DashboardComponent
            },
            {
                path: 'product-add', 
                component: ProductAddComponent
            },
            {
                path: 'product-edit/:id', 
                component: ProductEditComponent
            },
        ]
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
        path: '**', 
        component: NotFoundPageComponent
    },

];
