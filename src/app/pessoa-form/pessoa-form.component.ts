import { ActivatedRoute, Router, Routes } from '@angular/router';
import { PessoaService } from './../pessoa.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  indexEdit: string = ''
  index: number = 0;
  isEdit: boolean = false


  constructor(private fb: FormBuilder,private ps: PessoaService,private router: Router) {
    const nav = router.getCurrentNavigation();
    this.indexEdit = nav?.extras.state?.['indexPessoa']
  }

  ngOnInit() {
    this.form();
    this.formContato()

    this.pessoaForm.get('contatos')?.valueChanges.subscribe(data =>{
      console.table(data)
    })

    if(this.indexEdit?.length > 0){
      this.index = +this.indexEdit;
      this.isEdit = true
      this.pessoaForm.patchValue(this.ps.getPessoas[this.index])
    }





  }


  form(){
    this.pessoaForm = this.fb.group({
      nome: ['',[Validators.required]],
      cpf: ['',[Validators.required, this.cpf_cnpj_Validator]],
      rg: ['',[Validators.required]],
      dataNacimento: [{value:''},[Validators.required]],
      email: [''],
      sexo: ['',[Validators.required]],
      estadoCivil: ['',[Validators.required]],
      endereco: this.fb.group({
        cidade: [{value: '',disabled: true}],
        logradouro:['',[Validators.required]],
        numero: ['',[Validators.required]],
        complemento: ['',[Validators.required]],
        bairro: ['',[Validators.required]],
        cep: ['',[Validators.required]],
      }),

      contatos: [[]]

    })
  }

  formContato(){
    this.contatoForm = this.fb.group({
      fone: ['',[Validators.required,Validators.minLength(10)]],
      desc: ['',[Validators.required]]
    })
  }

  add(){
    this.ps.addPessoa(this.pessoaForm.getRawValue())
    this.resetForm()
    this.router.navigateByUrl('/list')
  }

  edit(){
    this.ps.editPessoa(this.index,this.pessoaForm.getRawValue())
    this.isEdit = false
    this.resetForm()
    this.router.navigateByUrl('/list')
  }

  resetForm(){
    this.pessoaForm.reset({
      nome: '',
      cpf: '',
      rg: '',
      dataNacimento: '',
      email: '',
      sexo: '',
      estadoCivil: '',
      endereco: {
        cidade: '',
        logradouro:'',
        numero: '',
        complemento: '',
        bairro: '',
        cep: '',
      },

      contatos: []
    })
  }

   cpf_cnpj_Validator(control: AbstractControl): {[key: string]: boolean} | null {

    let blackListCpf: string[] = [
         '00000000000', '11111111111','22222222222',
        '33333333333','44444444444','55555555555',
        '66666666666','77777777777','88888888888',
        '99999999999','12345678909','01234567890',
    ];
    // blackListCpf.forEach(list => {

    // })
    if (blackListCpf.find(list => list === control.value)) {
      return {'cnpjinvalid': true};
    }



    if (control.value) {


    if (control.value.length == 11) {
      let sequencia : number[] =  [10,9,8,7,6,5,4,3,2];
      let cnpj : number[] = [];
      let valor : number = 0
      let verificador : number[] = [];
      let verificadorGerado : number[] = [];
      control.value.split("").forEach((data: number) => {
        cnpj.push(+data)
      });
      verificador.push(cnpj.pop()!);
      verificador.push(cnpj.pop()!);
      verificador = verificador.reverse();
      cnpj.forEach((value,i) =>{
        valor = valor + (cnpj[i]*sequencia[i]);
      })
      valor = valor % 11;
      valor = 11 - valor;
      valor = valor >= 10 ? 0 : valor;
      verificadorGerado.push(valor);
      cnpj.push(valor);
      sequencia.splice(0,0,sequencia[0] + 1)
      valor = 0;
      cnpj.forEach((value,i) =>{
        valor = valor + (cnpj[i]*sequencia[i]);
      })
      valor = valor  % 11;
      valor = 11 - valor;
      valor = valor >= 10 ? 0 : valor;
      verificadorGerado.push(valor);
      if (verificadorGerado[0] == verificador[0] && verificadorGerado[1] == verificador[1]) {
        return null;
      }else{
        return {'cnpjinvalid': true};
      }
    }
  }
    return null;
}


}
