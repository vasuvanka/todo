import { Injectable } from '@angular/core';
const IPURL = 'https://ipapi.co/json';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor() {}

  getPublicIp(): Promise<Response> {
    return fetch(IPURL);
  }
}
