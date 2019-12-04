import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => console.log('Erro ao carregar categorias', error)
    );
  }

  deleteCategory(category: Category) {
    const result = confirm('Deseja realmente excluir este item?');
    if (result) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element.id != category.id),
        (error) => alert('Erro ao excluir categoria')
      );
    }
  }

}
