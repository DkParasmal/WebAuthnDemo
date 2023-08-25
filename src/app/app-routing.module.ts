import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebAuthnRegisterComponent } from './webauthn-register/webauthn-register.component';

const routes: Routes = [
  // Default route
  { path: 'webauth', component: WebAuthnRegisterComponent },
  // Add more routes here
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
