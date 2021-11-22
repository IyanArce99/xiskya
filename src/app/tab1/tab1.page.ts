import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  persons: any[] = [
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo',
      surname: 'Kope',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 1998
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo1',
      surname: 'Kope1',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 1999
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo2',
      surname: 'Kope2',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2000
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo3',
      surname: 'Kope3',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2001
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo4',
      surname: 'Kope4',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2002
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo5',
      surname: 'Kope5',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2003
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo6',
      surname: 'Kope6',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2004
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo7',
      surname: 'Kope7',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2005
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo8',
      surname: 'Kope8',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2006
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo9',
      surname: 'Kope9',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2007
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo10',
      surname: 'Kope10',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2008
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo11',
      surname: 'Kope11',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 2009
    },
    {
      img: 'https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png',
      name: 'Alejo12',
      surname: 'Kope12',
      city: 'Buenos Aires',
      dateBirth: '20/11/1998',
      numberCongregation: 20010
    }
  ];

  personsToShow: any[] = [];

  filterValue: string = '';
  constructor() {}

  ngOnInit(): void {
    this.personsToShow = Object.assign([], this.persons);
  }

  filter(e) {
    this.personsToShow = Object.assign([], this.persons);

    this.personsToShow = this.personsToShow.filter(person => {
      let nameComplete = person.name.toLowerCase() + ' ' + person.surname.toLowerCase();

      return nameComplete.indexOf(e.target.value.toLowerCase()) >= 0;
    });
  }
}
