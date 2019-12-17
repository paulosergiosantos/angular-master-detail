import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[];
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked(): void {
    this.pageTitle = this.currentAction === 'new' ? 'Cadastro' : `Edição: ${this.entry.name}`;
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
    this.submittingForm = false;
  }

  private createEntry() {
    const newEntry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.create(newEntry).subscribe(
      entry => this.actionsFormSuccess(entry),
      error => this.actionsFormError(error)
    )
  }

  private updateEntry() {
    const updatedEntry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(updatedEntry).subscribe(
      entry => this.actionsFormSuccess(entry),
      error => this.actionsFormError(error)
    )
  }

  actionsFormSuccess(entry: Entry): void {
    toastr.success('Sucesso');
    this.router.navigateByUrl('entries', { skipLocationChange: true }).then(
      () => this.router.navigate(['entries', entry.id, 'edit']),
    )
  }

  private actionsFormError(error: any) {
    toastr.error(`${JSON.stringify(error)}`, 'Erro');
    this.submittingForm = false;
    this.serverErrorMessages = [`Falha na requisição ao servidor: ${error.statusText}`];
  }

  private setCurrentAction() {
    this.currentAction = this.route.snapshot.url[0].path;
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  private loadEntry() {
    if (this.currentAction !== 'new') {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
      ).subscribe((entry) => {
        this.entry = entry;
        this.entryForm.patchValue(this.entry)
      },
        (error) => alert('Erro no servidor'))
    }
  }

}
