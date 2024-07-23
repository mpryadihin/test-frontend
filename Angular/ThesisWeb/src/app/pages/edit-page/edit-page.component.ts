import {
  Component,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ThesisResource } from '../../data/interfaces/thesisResource.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ThesisService } from '../../data/services/thesis.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor } from '@angular/common';
import { OtherAuthorsCardComponent } from '../../common-ui/other-authors-card/other-authors-card.component';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [OtherAuthorsCardComponent, ReactiveFormsModule, NgFor],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  thesis!: ThesisResource;

  form: FormGroup;

  otherAuthorsArray: FormArray;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private thesisService: ThesisService,
    private fb: FormBuilder
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

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  updateForm() {
    this.form.patchValue({
      mainAuthor: {
        lastName: this.thesis.mainAuthor.lastName,
        firstName: this.thesis.mainAuthor.firstName,
        middleName: this.thesis.mainAuthor.middleName,
        workplace: this.thesis.mainAuthor.workplace,
      },
      contactEmail: this.thesis.contactEmail,
      topic: this.thesis.topic,
      content: this.thesis.content,
    });

    this.otherAuthorsArray.clear();

    if (this.thesis.otherAuthors && this.thesis.otherAuthors.length > 0) {
      this.thesis.otherAuthors.forEach((author) => {
        this.otherAuthorsArray.push(
          this.fb.group({
            lastName: [author.lastName, Validators.required],
            firstName: [author.firstName, Validators.required],
            middleName: [author.middleName, Validators.required],
            workplace: [author.workplace, Validators.required],
          })
        );
      });
    }
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.thesisService.getThesisById(id).subscribe((data: ThesisResource) => {
      this.thesis = data;

      this.updateForm();
    });
  }

  addAuthor() {
    const authorForm = this.fb.group({
      lastName: [''],
      firstName: [''],
      middleName: [''],
      workplace: ['none'],
    });

    this.otherAuthorsArray.push(authorForm);
  }

  removeAuthor(index: number) {
    this.otherAuthorsArray.removeAt(index);
  }

  onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.thesisService.updateThesis(id, this.form.value).subscribe(() => {
      this.router.navigate(['thesis', id]);
    });
  }
  cancel() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['thesis', id]);
  }
}
