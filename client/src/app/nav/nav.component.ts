import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  model: any = {
    userName: 'abor',
    password: 'password'
  };
  
  login() {
    //console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: (next) => {
        //location.reload();
        console.log("login success", next);
      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("request hsa completed") }
    })
  }

  logout() {
    this.accountService.logout();
  }

}
