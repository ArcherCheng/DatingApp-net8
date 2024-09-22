import { map } from 'rxjs';
import { Photo } from './../../_models/photo';
import { Member } from './../../_models/member';
import { MembersService } from './../../_services/members.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  private membersService = inject(MembersService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  member?: Member;
  images: GalleryItem[] = []
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.membersService.getMember(username).subscribe({
      next: (member: Member) => {
        this.member = member;
        this.member.photos.map(photo => {
          this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
        });
      }
    });
  }
}
