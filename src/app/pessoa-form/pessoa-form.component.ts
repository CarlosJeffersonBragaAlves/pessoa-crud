import { PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  pessoaForm!: FormGroup;
  contatoForm!: FormGroup

  constructor(private fb: FormBuilder,private ps: PessoaService) {

  }

  ngOnInit() {
    this.form();
    this.formContato()

    this.pessoaForm.get('contatos')?.valueChanges.subscribe(data =>{
      console.table(data)
    })

  }


  form(){
    this.pessoaForm = this.fb.group({
      nome: [''],
      cpf: [''],
      rg: [''],
      dataNacimento: [{value:'' , disabled: true}],
      email: [''],
      sexo: [''],
      estadoCivil: [''],
      endereco: this.fb.group({
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

  formContato(){
    this.contatoForm = this.fb.group({
      fone: ['',[Validators.required]],
      desc: ['',[Validators.required]]
    })
  }

  add(){
    this.ps.addPessoa(this.pessoaForm.value)
  }
}
