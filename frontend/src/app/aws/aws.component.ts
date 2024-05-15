import { Component, Input } from '@angular/core';
import { FeaturetteComponent } from '../featurette/featurette.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpserviceService } from '../commonservices/httpservice.service';
import { pageDetails } from '../data/pageDetails';
@Component({
  selector: 'app-aws',
  standalone: true,
  imports: [FeaturetteComponent,FooterComponent,NavbarComponent],
  templateUrl: './aws.component.html',
  styleUrl: './aws.component.css'
})
export class AwsComponent {
  data: pageDetails | null = null;
  constructor(private httpservice: HttpserviceService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.data = this.httpservice.getData("aws");
  }

}
