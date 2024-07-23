import { Component, ComponentRef, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { OtherAuthorsCardComponent } from '../../common-ui/other-authors-card/other-authors-card.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThesisService } from '../../data/services/thesis.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [OtherAuthorsCardComponent, ReactiveFormsModule],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss',
})
export class AddPageComponent {
@ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  form : FormGroup ;

  otherAuthorsArray : FormArray;

  thesisService = inject(ThesisService);

  constructor(
    private fb : FormBuilder, 
    private router : Router
  ) {
    this.form = this.fb.group({
      mainAuthor: this.fb.group({
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        middleName: ['', Validators.required],
        workplace: ['', Validators.required],
      }),
      contactEmail: ['', [Validators.required, Validators.email]],
      otherAuthors: this.fb.array([]),
      topic: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.otherAuthorsArray = this.form.get('otherAuthors') as FormArray;
  }
  
  addAuthor() {
    const componentRef = this.container.createComponent(OtherAuthorsCardComponent);
   
    const authorForm = this.fb.group({
      lastName: [''],
      firstName: [''],
      middleName: [''],
      workplace: ['none']
    });

    componentRef.instance.authorForm = authorForm; 

    this.otherAuthorsArray.push(authorForm);
   
    componentRef.instance.removeEvent.subscribe(() =>
      this.removeAuthor(componentRef)
    );
  }

  removeAuthor(componentRef: ComponentRef<OtherAuthorsCardComponent>) {
    const index = this.container.indexOf(componentRef.hostView);
    if (index !== -1) {
      this.otherAuthorsArray.removeAt(index);
      this.container.remove(index);
    }
  }

  onSubmit(){
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    this.thesisService.addThesis(this.form.value).subscribe({
      next: () =>  this.router.navigate([''])
    })
  }

  
}
