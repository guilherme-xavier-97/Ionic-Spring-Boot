import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CidadeDTO } from 'src/models/CidadeDTO';
import { EstadoDTO } from 'src/models/EstadoDTO';
import { CidadeService } from 'src/services/domain/CidadeService';
import { ClienteService } from 'src/services/domain/ClienteService';
import { EstadoService } from 'src/services/domain/EstadoService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  cidades: CidadeDTO[];
  estados: EstadoDTO[];

  constructor(
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public router: Router,
    public nav: NavController,
    public alertController: AlertController
    ) {
    /*Essas são as validações que eu defini lá no back end. O primeiro campo fica vazio pq é o usuario
    que vai preencher e o segundo é a validação em si*/
    this.formGroup = this.formBuilder.group({
      nome: ['teste', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['t@teste.com', [Validators.required, Validators.email]],
      tipo : ['1', [Validators.required]],
      cpfOucnpj : ['35593241813', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['rua a', [Validators.required]],
      numero : ['11', [Validators.required]],
      complemento : ['apto 12', []],
      bairro : ['Vila B', []],
      cep : ['7639827', [Validators.required]],
      telefone1 : ['452345', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]
    });
   }

   //Método pra quando a página for aberta
   ngOnInit() {
     /*Aqui eu busco o estado no meu back end e seto a coleção de estados que criei no front
     com o id dele. Assim meu front consegue puxar o nome automaticamente e chama o método
     updateCidades() que faz o nome da cidade mudar também, de acordo com o estado vindo do back end
     */
     this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
     },
     error => {}
     );

   }

  updateCidades() {
    /* Esse método pega os dados do estado, seta na cidade e atribui nulo pra que o valor que
    estivesse antes seja apagado. Ex: o Estado era SP e a cidade Campinas, se eu troco o estado pra
    MG, "campinas" vai ser apagado, pq o estado mudou. */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
       this.formGroup.controls.cidadeId.setValue(null);
    },

    error => {}
    );
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value).subscribe(
      response => {
      this.showInsertOk();
    },
    error => {},
    );

  }

 async showInsertOk() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Cadastro realizado com sucesso.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('');
          }
        }
      ]
    });

    await alert.present();
  }

}
