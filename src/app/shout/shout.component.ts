///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Inject, OnInit} from '@angular/core';
import {ShoutService} from '../shout.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-shout',
  templateUrl: './shout.component.html',
  styleUrls: ['./shout.component.css']
})
export class ShoutComponent{
  message;
  nickname: string;

  constructor(private shoutService: ShoutService,
              public dialog: MatDialog) {}
  // Take nickname before rendering other component


  sendMessage() {
    this.shoutService.sendMessage(this.message);
    this.message = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: { name: this.nickname }
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log('Dialog was clossed');
      this.nickname = result;
    });
  };
}

@Component({
  selector: 'app-dialog-overview',
  template: `
    <div>
      <h1 mat-dialog-title>Welcome to DryOut</h1>
      <div mat-dialog-content>
        <p>Enter NickName:</p>
        <mat-form-field>
          <input matInput tabindex="1" [(ngModel)]="data.nickname" required minlength="4" #name="ngModel">
          <div *ngIf="name.invalid && (name.dirty || name.touched)"
               class="alert alert-danger">
  
            <div *ngIf="name.errors.required">
              Name is required.
            </div>
            <div *ngIf="name.errors.minlength">
              Name must be at least 4 characters long.
            </div>
          </div>
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="data.nickname" tabindex="2">Ok</button>
        <button mat-button (click)="onNoClick()" tabindex="1">No</button>
      </div>
      {{data.nickname}}
    </div>
  `,
})
export class DialogOverviewComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
