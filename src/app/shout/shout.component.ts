///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Inject, OnInit} from '@angular/core';
import {ShoutService} from '../shout.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-shout',
  templateUrl: './shout.component.html',
  styleUrls: ['./shout.component.css']
})
export class ShoutComponent implements OnInit {
  message;
  nickname: string;

  constructor(private shoutService: ShoutService,
              private authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.shoutService.reconnect();
    this.authService.getUser().subscribe(
      (data) => {
        if (data !== null) {
          this.nickname = data.local.username.toString();
          this.shoutService.sendNickname(this.nickname);
          console.log(this.nickname);
        }
      });
  }
  // Take nickname before rendering other component
  sendMessage() {
    this.shoutService.sendMessage(this.message);
    this.message = '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: { name: this.nickname }
    });
    dialogRef.afterClosed().subscribe( result => {
      this.nickname = result;
      localStorage.setItem('nickname', this.nickname);
      this.shoutService.sendNickname(this.nickname);
      console.log('Dialog was closed', result);
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
