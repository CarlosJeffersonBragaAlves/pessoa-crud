import { PessoaService } from './../../pessoa.service';
import { Contato } from './../model/contato';
import { FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-pessoa-contato',
  templateUrl: './pessoa-contato.component.html',
  styleUrls: ['./pessoa-contato.component.scss'],
})
export class PessoaContatoComponent implements OnInit {
  @Input() contatoForm!: FormGroup;
  @Input() PessoaForm!: FormGroup;
  @Input() indexEditPessoa!: string;

  mask: string = '(00) 0000-00009';
  itsValid: boolean = true;
  isEdit: boolean = false;
  indexEdit: number = 0;
  labelButtonAdd: boolean = false;
  contatos: Contato[] = [];
  descricoes: {
    label: string;
    color?: 'blue' | 'green' | 'deeppink' | 'blueviolet' | 'coral' | 'gold';
  }[] = [];

  constructor(private ps: PessoaService,private media: MediaMatcher) {}

  ngOnInit() {
    this.descricoes = [
      { label: 'PRINCIPAL', color: 'green' },
      { label: 'PESSOAL', color: 'blue' },
      { label: 'TRABALHO', color: 'blueviolet' },
      { label: 'CELULAR', color: 'deeppink' },
      { label: 'CASA', color: 'gold' },
      { label: 'OUTROS', color: 'coral' },
    ];

    console.log('pessoas edit index',this.indexEditPessoa)

    if(this.indexEditPessoa?.length > 0){
      this.contatos = this.ps.getPessoas[+this.indexEditPessoa].contatos.slice();
    }

      this.labelButtonAdd = this.ps.mediaQuery[2].matches

    this.ps.mediaQuery[2].addEventListener('change', data => {
      this.labelButtonAdd = this.ps.mediaQuery[2].matches
    })

    this.contatoForm.get('fone')?.valueChanges.subscribe((value) => {
      if (value.length > 10) {
        this.mask = '(00) 0 0000-0000';
      } else {
        this.mask = '(00) 0000-00009';
      }
    });

    this.contatoForm.valueChanges?.subscribe(() => {
      this.itsValid = !(
        this.contatoForm.get('desc')?.valid &&
        this.contatoForm.get('fone')?.value.length > 9
      );
    });
  }

  getDescColor(contato: Contato) {
    return this.descricoes.find((d) => d.label == contato.desc)?.color;
  }

  add() {
    this.contatos.push(this.contatoForm.value);
    this.PessoaForm.get('contatos')?.setValue(this.contatos);
    this.resetForm();
  }

  update(index: number) {
    this.contatoForm.setValue(this.contatos[index]);
    this.isEdit = true;
    this.indexEdit = index;
  }

  edit() {
    this.contatos[this.indexEdit] = this.contatoForm.value;
    this.resetForm();
    this.isEdit = false;
    this.indexEdit = 0;
    this.PessoaForm.get('contatos')?.setValue(this.contatos);
  }

  delete(index: number) {
    const msg: string = `${this.contatos[index].desc} - ${this.maskPhone(
      this.contatos[index].fone
    )}`;

    this.ps
      .dialogMessagem({
        menssagem: `Tem certeza que deseja deletar o contato ${msg}?`,
        titulo: 'Deletar Contato',
      })
      .subscribe((data) => {
        if (data) {
          this.contatos.splice(index, 1);
          this.PessoaForm.get('contatos')?.setValue(this.contatos);
          console.log(this.contatos, index);
        }
      });
  }

  resetForm() {
    this.contatoForm.setValue({
      fone: '',
      desc: 'PESSOAL',
    });
  }

  maskPhone(fone: string) {
    let mask = '';
    if (fone.length == 11) {
      for (var i = 0; i < fone.length; i++) {
        if (i == 0) {
          mask += '(';
        } else if (i == 2) {
          mask += ') ';
        } else if (i == 3) {
          mask += ' ';
        } else if (i == 7) {
          mask += '-';
        }
        mask += fone.charAt(i);
      }
    } else if (fone.length == 10) {
      for (var i = 0; i < fone.length; i++) {
        if (i == 0) {
          mask += '(';
        } else if (i == 2) {
          mask += ') ';
        } else if (i == 6) {
          mask += '-';
        }
        mask += fone.charAt(i);
      }
    }
    return mask;
  }
}
