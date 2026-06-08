import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj: any = {
    email: '',
    contactNbr: ''
  };
  http = inject(HttpClient);
  router = inject(Router);

  onSubmit() {
    // this.http.post('https://employeeapi2026-fvgxc5cxf7f9d6ep.centralus-01.azurewebsites.net/api/Auth/login', this.loginObj).subscribe({
    this.http.post('http://localhost:5162/api/Auth/login', this.loginObj).subscribe({

      next: (result: any) => {
        console.log(result);
         const user = result?.data ?? result;
        localStorage.setItem('token', result.token);
        localStorage.setItem('empLoginUser', JSON.stringify(user));
        if(user.role === 'Employee') {
          debugger;
          this.router.navigate(['new_employee/'+user.userId]);
        }
        else {
          this.router.navigate(['dashboard']);
        }
      },
      error: (error: any) => {
        console.log(error);
        alert('Login failed. Please check your credentials and try again.');
      }
    });

  }
}
