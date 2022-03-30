import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    /*Essas são as validações que eu defini lá no back end. O primeiro campo fica vazio pq é o usuario
    que vai preencher e o segundo é a validação em si*/
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      tipo : ['', [Validators.required]],
      cpfOuCnpj : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['', [Validators.required]],
      logradouro : ['', [Validators.required]],
      numero : ['', [Validators.required]],
      complemento : ['', []],
      bairro : ['', []],
      cep : ['', [Validators.required]],
      telefone1 : ['', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]
    });
   }

  signupUser() {
    console.log('enviou');
  }

}
