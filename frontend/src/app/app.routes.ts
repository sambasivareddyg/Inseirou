import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AwsComponent } from './aws/aws.component';

export const routes: Routes = [
  { path:'home', component: HomeComponent},
  { path: 'aws', component: AwsComponent },
  { path: '**', component : HomeComponent },
  { path: '', component : HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
