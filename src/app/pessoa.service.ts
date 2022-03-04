import { Pessoa } from './pessoa-form/model/pessoa';
import { DialogMenssagemModel } from './shared/dialog-mensagem/model/dialog-menssagem-model';
import { DialogMensagemComponent } from './shared/dialog-mensagem/dialog-mensagem.component';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {



  private pessoas: Pessoa[] = [

  ]

  private mediaQueryDisplay: MediaQueryList[] = [
    this.media.matchMedia('(max-width: 1400px)'),
    this.media.matchMedia('(max-width: 1300px)'),
    this.media.matchMedia('(max-width: 1199px)'),
    this.media.matchMedia('(max-width: 1180px)'),
    this.media.matchMedia('(max-width: 767px)'),
    this.media.matchMedia('(max-width: 620px)'),
  ];


  constructor(private dialog: MatDialog, private media: MediaMatcher, private _snackBar: MatSnackBar) {}


  get mediaQuery(){
    return this.mediaQueryDisplay
  }

  addPessoa(pessoa: Pessoa){
    this.pessoas.push(pessoa);
    console.log(this.pessoas)
  }

  deletePessoa(index: number){
    this.pessoas.splice(index, 1);
  }

  editPessoa(index: number,pessoa:Pessoa){
    this.pessoas[index] = pessoa
  }

  get getPessoas(){
    return this.pessoas
  }

  dialogMessagem(dialog: DialogMenssagemModel) {
    const dialogRef = this.dialog.open(DialogMensagemComponent, {
      data: dialog,
    });

    return dialogRef.afterClosed();
  }

  snackMessagem(messagem: string, duracao: number){
    this._snackBar.open(messagem, 'Fechar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: duracao
    });
  }
}
