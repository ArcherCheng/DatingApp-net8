import { Component, inject } from '@angular/core';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {
  memverService = inject(MembersService);
  
  ngOninit(): void {
    if (this.memverService.members().length === 0) {
      this.loadMembers();
    }
  }

  loadMembers() {
    this.memverService.getMembers();
  }

}
