import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[];
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.pageTitle = this.currentAction === 'new' ? 'Cadastro' : `Edição: ${this.category.name}`;
  }
  
  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
    this.submittingForm = false;
  }

  private createCategory() {
    const newCategory = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(newCategory).subscribe(
      category => this.actionsFormSuccess(category),
      error => this.actionsFormError(error)
    )
  }

  private updateCategory() {
    const updatedCategory = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(updatedCategory).subscribe(
      category => this.actionsFormSuccess(category),
      error => this.actionsFormError(error)
    )
  }
  
  actionsFormSuccess(category: Category): void {
    toastr.success('Sucesso');
    this.router.navigateByUrl('categories', { skipLocationChange: true }).then(
      () => this.router.navigate(['categories', category.id, 'edit']),
    )
  }
  
  private actionsFormError(error: any) {
    toastr.error(`${JSON.stringify(error)}`,'Erro');
    this.submittingForm = false;
    this.serverErrorMessages = [`Falha na requisição ao servidor: ${error.statusText}`];
  }

  private setCurrentAction() {
    console.log(this.route.snapshot.url);
    this.currentAction = this.route.snapshot.url[0].path;
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name:[null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    console.log(this.currentAction);
    if (this.currentAction !== 'new') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe((category) => {
        this.category = category;
        this.categoryForm.patchValue(this.category)
      },
      (error) => alert('Erro no servidor'))
    }
  }
 
}
