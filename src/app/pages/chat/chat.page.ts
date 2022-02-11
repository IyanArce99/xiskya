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
    this.me = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";
    this.you = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";
  }

}
