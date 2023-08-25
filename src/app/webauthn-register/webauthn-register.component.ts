import { Component, OnInit } from '@angular/core';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import { PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON } from '@simplewebauthn/typescript-types';
import { DataService } from '../data.service';
@Component({
  selector: 'app-webauthn-register',
  templateUrl: './webauthn-register.component.html',
  styleUrls: ['./webauthn-register.component.css']
})
export class WebAuthnRegisterComponent implements OnInit {
  formData = {
    username: "",
    displayName: "", // Initialize with null
  };
  registrationResult :any;
  authenticationResult :any;
  errorMessage:any;
  constructor(private dataService: DataService)
  {

  }
  ngOnInit()
  {

  }
   //#region  register
   async startWebAuthnRegistration(registrationOptions: any) {
    try {
     

      // Send publicKeyCredential to the server for registration
      await this.sendRegistrationData(registrationOptions);
    } catch (error) {
      console.error('Error during WebAuthn registration:', error);
    }
  }

 async submitRegister()
  {
   var crdentialOptions = this.getCredentialOptionsAPI();
   crdentialOptions.subscribe(async (x: any)=>{
    var option =x;
    const registrationResponse=  await startRegistration( option)
    this.sendRegistrationData(registrationResponse);
   })

  }



 async sendRegistrationData(registrationResponse:any)
  {
      var response = registrationResponse
      this.sendRegistrationDataAPI(response).subscribe(x=>{
      if(x.status=="error")
      {
        this.errorMessage = x.errorMessage
        return
      }
        this.registrationResult = x;
      })
  }
  getCredentialOptionsAPI()
  {
    // let username =""
    // let displayName ="";
    let username = this.formData.username;
    let displayName= this.formData.displayName;

    // possible values: none, direct, indirect
    let attestation_type = "none";
    // possible values: <empty>, platform, cross-platform
    let authenticator_attachment = "";

    // possible values: preferred, required, discouraged
    let user_verification = "preferred";

    // possible values: discouraged, preferred, required
    let residentKey = "discouraged";
    var data = new FormData();
    data.append('username', username);
    data.append('displayName', displayName);
    data.append('attType', attestation_type);
    data.append('authType', authenticator_attachment);
    data.append('userVerification', user_verification);
    data.append('residentKey', residentKey);
    return this.dataService.getCrdentialOptionData(data)
  }
  sendRegistrationDataAPI(registrationResponse:any)
  {
    return this.dataService.postRegisteredata(registrationResponse);
   
    
  }
   //#endregion

   async signIn()
  {
   var crdentialOptions = this.getAttestationOptionAPI();
   crdentialOptions.subscribe(async (x: any)=>{
    var option =x;
    if(x.status=="error")
    {
      this.errorMessage = x.errorMessage
      return
    }
    const verificationData=  await startAuthentication(option);
    this.sendVerficationData(verificationData);
   })

  }

  async sendVerficationData(verificationData:any)
  {
     var result =verificationData
     this.sendVerificationDataAPI(result).subscribe(x=>{
      if(x.status=="error")
      {
        this.errorMessage = x.errorMessage
        return
      }
      this.authenticationResult = x;
     })
  }

    getAttestationOptionAPI()
   {
    let username = this.formData.username;
    var data = new FormData();
    data.append('username', username);
    return this.dataService.getAttestationOptionData(data);
   }
   sendVerificationDataAPI(verificationData:any)
   {
    return this.dataService.postVerificationdata(verificationData);
   }
   //#region Authentication
   //#endregion
  
}
