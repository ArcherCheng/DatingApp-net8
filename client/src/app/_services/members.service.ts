import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  constructor() { }

  getMembers() {
    return this.http.get(this.baseUrl + 'users');
  }

  getMember(username: string) {
    return this.http.get(this.baseUrl + 'users/' + username);
  }
}
