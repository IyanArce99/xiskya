import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}
  public notices: any;

  ngOnInit() {
    this.separateNotices();
  }

  separateNotices() {
    this.notices = [
      {
        id: 1,
        title: 'Noticia primera primera',
        short_desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, aut?...'
      },
      {
        id: 1,
        title: 'Noticia primera primera',
        short_desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, aut?...'
      },
      {
        id: 1,
        title: 'Noticia primera primera',
        short_desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, aut?...'
      },
      {
        id: 1,
        title: 'Noticia primera primera',
        short_desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, aut?...'
      },
      {
        id: 1,
        title: 'Noticia primera primera',
        short_desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, aut?...'
      },
    ];
  }

}
