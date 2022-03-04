import { Pessoa } from './pessoa-form/model/pessoa';
import { DialogMenssagemModel } from './shared/dialog-mensagem/model/dialog-menssagem-model';
import { DialogMensagemComponent } from './shared/dialog-mensagem/dialog-mensagem.component';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoaService implements OnDestroy {



  private pessoas: Pessoa[] = [
    {
      nome: 'Carlos Jefferson Braga alve',
      contatos: [{desc: 'PRINCIPAL', fone: '66984245600'}],
      cpf: '06174181103',
      dataNacimento: new Date(),
      email: 'carlos@xtx.com',
      estadoCivil: 'Solteiro',
      rg: '11111111111',
      sexo: 'Masculino',
      endereco:{
        bairro: 'Concordia',
        cep: '78870000',
        cidade: 'Paranatinga-MT',
        complemento: '',
        logradouro: 'Rua Julieta Madalena Rodrigues',
        numero: '55'
      }
    }
  ]

  private $edit = new BehaviorSubject<string>('');

  private mediaQueryDisplay: MediaQueryList[] = [
    this.media.matchMedia('(max-width: 1400px)'),
    this.media.matchMedia('(max-width: 1300px)'),
    this.media.matchMedia('(max-width: 1199px)'),
    this.media.matchMedia('(max-width: 1180px)'),
    this.media.matchMedia('(max-width: 767px)'),
    this.media.matchMedia('(max-width: 620px)'),
  ];


  constructor(private dialog: MatDialog, private media: MediaMatcher) {}


  ngOnDestroy(): void {
    this.$edit.unsubscribe();
  }

  get getEdit(){
    return this.$edit.asObservable()
  }

  setEdit(value: string){
    this.$edit.next(value)
  }

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
}
