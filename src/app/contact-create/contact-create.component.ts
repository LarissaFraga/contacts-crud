import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact, ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent {

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  })

  constructor(private contactsService: ContactsService, private router: Router) { }

  getIdContact() {
    return this.contactsService.listContacts().subscribe(contacts => {
      let id = contacts[contacts.length - 1].id + 1
      return id
    })
  }

  createContactObject() {
    let contact: Contact = {
      id: +this.getIdContact(),
      name: this.contactForm.get('name')?.value || '',
      phone: this.contactForm.get('phone')?.value || ''
    }
    return contact
  }

  createContact() {
    this.contactsService.createContact(this.createContactObject()).subscribe(contact => {
      this.router.navigate(['/contacts'])
    })
  }

}
