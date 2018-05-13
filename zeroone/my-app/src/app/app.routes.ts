import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { TodoComponent } from './todo/todo.component'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'todo',
        component: TodoComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);