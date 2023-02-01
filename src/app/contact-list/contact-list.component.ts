import { Component, OnInit } from '@angular/core';
import { Contact, ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(private constactsService: ContactsService) { }

  contacts: Contact[] = [];

  ngOnInit(): void {
    this.constactsService.listContacts().subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  deleteContact(contact: Contact) {
    this.constactsService.deleteContact(contact.id).subscribe(() => {
      const index = this.contacts.indexOf(contact);
      this.contacts.splice(index, 1);
    })
  }

}
