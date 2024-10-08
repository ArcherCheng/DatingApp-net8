import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, TitleCasePipe, RouterLinkActive, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  router = inject(Router);
  toastr = inject(ToastrService);
  model: any = {
    userName: 'Lisa',
    password: 'Pa$$w0rd'
  };
  
  login() {
    //console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: (next) => {
        //location.reload();
        //console.log("login success", next);
        this.router.navigateByUrl('/members');
      },
      error: (error) => { this.toastr.error(error.error) },
      complete: () => { this.toastr.info("request hsa completed") }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
