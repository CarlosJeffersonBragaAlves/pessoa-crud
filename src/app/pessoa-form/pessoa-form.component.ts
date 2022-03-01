import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  pessoaForm!: FormGroup;

  constructor(private fb: FormBuilder,) {

  }

  ngOnInit() {
    this.form();


  }


  form(){
    this.pessoaForm = this.fb.group({
      id: [''],
      nome: [''],
      cpf: [''],
      rg: [''],
      dataNacimento: [{value:'' , disabled: true}],
      email: [''],
      sexo: [''],
      estadoCivil: [''],
      endereco: this.fb.group({
        id:[0],
        cidade: [{value: '',disabled: true}],
        logradouro:[''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cep: [''],
      }),

      contatos: [[]]

    })
  }
}
