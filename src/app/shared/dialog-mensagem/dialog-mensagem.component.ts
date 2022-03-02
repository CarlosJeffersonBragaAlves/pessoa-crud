import { DialogMenssagemModel } from './model/dialog-menssagem-model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-mensagem',
  templateUrl: './dialog-mensagem.component.html',
  styleUrls: ['./dialog-mensagem.component.scss']
})
export class DialogMensagemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogMenssagemModel,
              public dialogRef: MatDialogRef<DialogMensagemComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
