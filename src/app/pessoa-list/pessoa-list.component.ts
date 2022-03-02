import { Pessoa } from './../pessoa-form/model/pessoa';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent implements OnInit {

  pessoas: Pessoa[] = []
  displayedColumns: string[] =
    ['position','Nome', 'CPF', 'Data de Nacimento', 'Email', 'Endereço', 'Contato', 'strar'];
  dataSource = new MatTableDataSource<Pessoa>(this.pessoas);

  constructor() { }

  ngOnInit(): void {
  }


}
