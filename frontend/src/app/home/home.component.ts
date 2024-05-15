import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { FeaturetteComponent } from '../featurette/featurette.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,CarouselComponent,FeaturetteComponent,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
