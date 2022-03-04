import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa-form/model/pessoa';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Contato } from '../pessoa-form/model/contato';
import { MediaMatcher } from '@angular/cdk/layout';
import { query } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss'],
})
export class PessoaListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  mask: string = '(00) 0000-00009';
  pessoas: Pessoa[] = [];
  colums: string[] = [
    'position',
    'nome',
    'cpf',
    'nacimento',
    'email',
    'endereço',
    'strar',
  ];
  displayedColumns: string[] = this.colums.slice();

  dataSource = new MatTableDataSource<Pessoa>(this.pessoas);
  filterValue: string = '';
  labelButtonAdd: string = '';


  constructor(private ps: PessoaService,private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.atualizaTabela()

    if (this.ps.mediaQuery[0].matches) {
      this.removeColuna('nacimento');
    } else {
      this.displayedColumns = this.colums.slice();
    }

    if (this.ps.mediaQuery[1].matches) {
      this.removeColuna('email');
      this.removeColuna('nacimento');
    }

    if (this.ps.mediaQuery[3].matches) {
      this.removeColuna('endereço');
      this.removeColuna('email');
      this.removeColuna('nacimento');
    }

    if (this.ps.mediaQuery[4].matches) {
      this.labelButtonAdd = 'Adicionar';
      this.removeColuna('contato');
      this.removeColuna('email');
      this.removeColuna('nacimento');
      this.removeColuna('endereço');
    } else {
      this.labelButtonAdd = '';
    }

    if (this.ps.mediaQuery[5].matches) {
      this.removeColuna('cpf');
      this.removeColuna('email');
      this.removeColuna('nacimento');
      this.removeColuna('endereço');
    }

    this.ps.mediaQuery[0].addEventListener('change', (data) => {
      if (this.ps.mediaQuery[0].matches) {
        this.removeColuna('nacimento');
      } else {
        this.displayedColumns = this.colums.slice();
      }
    });

    this.ps.mediaQuery[1].addEventListener('change', (data) => {
      if (this.ps.mediaQuery[1].matches) {
        this.removeColuna('email');
      } else {
        this.displayedColumns = this.colums.slice();
        this.removeColuna('nacimento');
      }
    });

    this.ps.mediaQuery[3].addEventListener('change', (data) => {
      if (this.ps.mediaQuery[3].matches) {
        this.removeColuna('endereço');
      } else {
        this.displayedColumns = this.colums.slice();
        this.removeColuna('email');
        this.removeColuna('nacimento');
      }
    });

    // this.ps.mediaQuery[4].addEventListener('change', (data) => {
    //   if (this.ps.mediaQuery[4].matches) {
    //     this.labelButtonAdd = 'Adicionar';
    //     this.removeColuna('contato');
    //   } else {
    //     this.labelButtonAdd = '';
    //     this.displayedColumns = this.colums.slice();
    //     this.removeColuna('email');
    //     this.removeColuna('nacimento');
    //     this.removeColuna('endereço');
    //   }
    // });

    this.ps.mediaQuery[5].addEventListener('change', (data) => {
      if (this.ps.mediaQuery[5].matches) {
        this.removeColuna('cpf');
      } else {
        this.displayedColumns = this.colums.slice();
        this.removeColuna('email');
        this.removeColuna('nacimento');
        this.removeColuna('endereço');
        // this.removeColuna('contato');
      }
    });
  }

  removeColuna(nome: string) {
    let index = this.displayedColumns.findIndex((data) => data === nome);
    if (index != -1) {
      this.displayedColumns.splice(index, 1);
    }
  }

  contatoGet(contatos: Contato[]): string {
    if (contatos.length > 0) {
      const contato: Contato = contatos.find(
        (data) => data.desc === 'PRINCIPAL'
      )!;
      this.mask =
        contato.fone.length > 10 ? '(00) 0 0000-0000' : '(00) 0000-00009';
      return contato.fone;
    } else {
      this.mask = 'SSS S*';
      return 'Sem Contato';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletar(index: number){
    this.ps.dialogMessagem({
      menssagem: `Tem certeza que deseja deletar a Pessoa ${this.pessoas[index].nome.toUpperCase()}?`,
      titulo: 'Deletar Pessoa',
    })
    .subscribe((data) => {
      if (data) {
        this.ps.deletePessoa(index)
        this.atualizaTabela()
      }
    });



  }

  edit(i: number){
    //this.ps.setEdit(i.toString())
    this.router.navigateByUrl('/form',{
      state:{indexPessoa: i.toString()}
    })
  }


  atualizaTabela(){
    this.pessoas = this.ps.getPessoas
        this.dataSource.data = this.pessoas.slice()
  }

}
