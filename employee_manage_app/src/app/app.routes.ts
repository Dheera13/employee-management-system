import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Header } from './pages/header/header';
import { Dashboard } from './pages/dashboard/dashboard';
import { Department } from './pages/department/department';
import { Designation } from './pages/designation/designation';
import { EmployeeList } from './pages/employee-list/employee-list';
import { Employeeform } from './pages/employeeform/employeeform';
import { AiAssistantComponent } from './pages/ai-assistant/ai-assistant';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'',
        component:Header,
        children:[
            {
                path:'dashboard',
                component:Dashboard
            },
            {
                path:'employee-list',
                component:EmployeeList
            },
            {
                path:'new_employee/:id',
                component:Employeeform
            },
            {
                path:'department',
                component:Department
            },
            {
                path:'designation',
                component:Designation
            },
            {
                 path: 'ai-assistant', 
                 component: AiAssistantComponent 
            }

        ]
    }
];
