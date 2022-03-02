import { Endereco } from './../model/endereco';
import { ViaCep } from './../model/via-cep';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface tipo{
  value: string;
  viewValue: string
}

@Component({
  selector: 'app-pessoa-endereco',
  templateUrl: './pessoa-endereco.component.html',
  styleUrls: ['./pessoa-endereco.component.scss']
})
export class PessoaEnderecoComponent implements OnInit {

  @Input() pessoaForm!: FormGroup;

  tipos: tipo[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(private http : HttpClient) { }

  ngOnInit() {


  }

  getByCep(cep: string){
    const apiURL : string = `https://viacep.com.br/ws/${cep}/json/`;

    this.http.get<ViaCep>(apiURL).subscribe((data: ViaCep) => {
      console.log(data)
      const endereco: Endereco = {
        bairro: this.getEndereço.bairro.length > 0 ? this.getEndereço.bairro : data.bairro,
        cep: this.getEndereço.cep,
        cidade: `${data.localidade}-${data.uf.toUpperCase()}`,
        complemento: this.getEndereço.complemento.length > 0 ? this.getEndereço.complemento : data.bairro,
        logradouro: this.getEndereço.logradouro.length > 0 ? this.getEndereço.logradouro : data.logradouro,
        numero: this.getEndereço.numero
      }

      this.pessoaForm.get('endereco')?.setValue(endereco)


    });

  }

  checkCep(){
    const cep: string = this.pessoaForm.get("endereco.cep")?.value
    if(cep.length == 8){
      this.getByCep(cep)
    }
  }

  get getEndereço(): Endereco{
    return this.pessoaForm.get("endereco")?.value
  }

}
