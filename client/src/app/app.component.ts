import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  http = inject(HttpClient);
  title = 'Dating App';
  users: any;

  // constructor(private http: HttpClient) {
  // }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: (reponse) => {this.users=reponse;},
      error: (error) => {console.log(error) },
      complete: () => { console.log("request hsa completed") }
    });
  }
}
