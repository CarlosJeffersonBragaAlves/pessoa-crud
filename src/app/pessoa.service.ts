import { Pessoa } from './pessoa-form/model/pessoa';
import { DialogMenssagemModel } from './shared/dialog-mensagem/model/dialog-menssagem-model';
import { DialogMensagemComponent } from './shared/dialog-mensagem/dialog-mensagem.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {

  pessoas: Pessoa[] = []


  constructor(private dialog: MatDialog) {}

  addPessoa(pessoa: Pessoa){
    this.pessoas.push(pessoa);
    console.log(this.pessoas)
  }


  dialogMessagem(dialog: DialogMenssagemModel) {
    const dialogRef = this.dialog.open(DialogMensagemComponent, {
      data: dialog,
    });

    return dialogRef.afterClosed();
  }
}
