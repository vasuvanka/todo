import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/core/services/github.service';
import { IP } from 'src/app/models/ip';

@Component({
  selector: 'app-my-ip',
  templateUrl: './my-ip.component.html',
  styleUrls: ['./my-ip.component.scss'],
})
export class MyIpComponent implements OnInit {
  myIp: IP = new IP();
  constructor(private githubService: GithubService) {}

  async ngOnInit() {
    const response = await this.githubService.getPublicIp();
    const data = await response.json();
    this.myIp = IP.fromJson(data);
    console.log(JSON.stringify(this.myIp));
  }
}
