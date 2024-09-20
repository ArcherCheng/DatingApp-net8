import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseUrl = 'https://localhost:5001/api/';
  http = inject(HttpClient);
  validationErrors: string[]=[];

  get400ValidationError() {
    this.http.get(this.baseUrl + 'buggy/register').subscribe({
      next: (reponse) => { console.log(reponse); },
      error: (error) => { 
        console.log(error);
        this.validationErrors = error;
      },
      complete: () => { console.log("request hsa completed") }
    })
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: (reponse) => { console.log(reponse); },
      error: (error) => { console.log(error); },
      complete: () => { console.log("request hsa completed") }
    });
  }
  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (reponse) => { console.log(reponse); },
      error: (error) => { console.log(error); },
      complete: () => { console.log("request hsa completed") }  
    })
  }
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: (reponse) => { console.log(reponse); },
      error: (error) => { console.log(error); },
      complete: () => { console.log("request hsa completed") }
    });
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: (reponse) => { console.log(reponse); },
      error: (error) => { this.validationErrors = error.errors },
      complete: () => { console.log("request hsa completed") }
    });
  }

}
