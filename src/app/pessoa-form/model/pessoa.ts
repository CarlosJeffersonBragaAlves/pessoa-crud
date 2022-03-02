import { Contato } from './contato';
import { Endereco } from './endereco';
import { Data } from "@angular/router";

export interface Pessoa {
  nome: string;
  cpf: string;
  rg: string;
  dataNacimento: Data;
  email: string;
  sexo: string;
  estadoCivil: string;
  endereco: Endereco;
  contatos: Contato[];
}
