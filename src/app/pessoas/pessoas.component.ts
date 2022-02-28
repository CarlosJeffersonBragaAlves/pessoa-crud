import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  pesquisar: string = ''

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  filtrar(){
    console.log(this.pesquisar)
  }

  openDialog() {
    const dialogRef = this.dialog.open(PessoaFormComponent,{
      height: '83vh',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
