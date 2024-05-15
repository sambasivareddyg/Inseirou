import { Injectable,Input } from '@angular/core';
import { pageDetails } from '../data/pageDetails';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor() { }

  getData(id:string):pageDetails{
    const pd:pageDetails ={
    pageId:"aws",
    description:"Hello AWS"
    };
    return pd;
  }
}
