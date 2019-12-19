import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries.sort((a, b) => b.id - a.id),
      error => console.log('Erro ao carregar entradas', error)
    );
  }

  deleteEntry(entry: Entry) {
    const result = confirm('Deseja realmente excluir este item?');
    if (result) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element.id != entry.id),
        (error) => alert(`Erro ao excluir ${entry.type}`)
      );
    }
  }

}
