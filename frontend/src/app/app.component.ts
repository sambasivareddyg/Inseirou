import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent }  from './navbar/navbar.component';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AwsComponent } from './aws/aws.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet, RouterLink, RouterLinkActive,FormsModule,CommonModule,HomeComponent,FooterComponent,NavbarComponent,AwsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 title = "Inseirou"; 
 } 

