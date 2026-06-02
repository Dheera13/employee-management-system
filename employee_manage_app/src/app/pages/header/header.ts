import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Employeemodel } from '../../models/Employeemodel';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink, NgIf, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
   isCollapsed = false;
   router=inject(Router);
   loggedEmpData:Employeemodel=new Employeemodel();

    constructor(){
      const empDataString = localStorage.getItem('empLoginUser');
      if (empDataString != null) {
        this.loggedEmpData = JSON.parse(empDataString);
      }
    }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    localStorage.removeItem('empLoginUser');
    this.router.navigate(['/login']);

    // Clear user session or token
    // Redirect to login page
    console.log('User logged out');
    // Example: this.router.navigate(['/login']); 
  }
}
