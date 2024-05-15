import { Component } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AwsComponent } from '../aws/aws.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterLinkWithHref, HomeComponent, AwsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
}
