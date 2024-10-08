import { Component, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  memberService = inject(MembersService);
  //members: Member[] = [];

  ngOnInit(): void {
    this.loadMembers();
  } 

  loadMembers() { 
    this.memberService.getMembers();
  }

}
