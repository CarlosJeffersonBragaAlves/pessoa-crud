import { ActivatedRoute, Router, Routes } from '@angular/router';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { map, Subscriber } from 'rxjs';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  pessoaForm!: FormGroup;
  contatoForm!: FormGroup
  labelButton: boolean = false;
  indexEdit: number = 0
  isEdit: boolean = false


  constructor(private fb: FormBuilder,private ps: PessoaService,private router: Router) {
  }

  ngOnInit() {
    this.form();
    this.formContato()

    this.pessoaForm.get('contatos')?.valueChanges.subscribe(data =>{
      console.table(data)
    })

    this.ps.getEdit.subscribe(data => {
      if(data){
        this.indexEdit = +data
        this.isEdit = true
        this.pessoaForm.patchValue(this.ps.getPessoas[this.indexEdit])
      }
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
    this.ps.addPessoa(this.pessoaForm.getRawValue())
    this.router.navigateByUrl('/list')
  }

  edit(){
    this.ps.editPessoa(this.indexEdit,this.pessoaForm.getRawValue())
    this.isEdit = false
    this.router.navigateByUrl('/list')
  }

}
