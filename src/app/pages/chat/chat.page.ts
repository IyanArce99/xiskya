import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public me: any;
  public you: any;
  constructor() { }

  ngOnInit() {
    this.me = "assets/profile/icon.jpg";
    this.you = "assets/profile/icon.jpg";
  }

}
