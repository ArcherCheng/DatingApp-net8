import { Component, inject, output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  toastr = inject(ToastrService);
  cancelRegister = output<boolean>();
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: (next) => { console.log(next); },
      error: (error) => { this.toastr.error(error.error) },
      complete: () => { this.toastr.info("request hsa completed") }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
