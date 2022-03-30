import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CidadeDTO } from 'src/models/CidadeDTO';
import { EstadoDTO } from 'src/models/EstadoDTO';
import { CidadeService } from 'src/services/domain/CidadeService';
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
    ) {
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
    console.log('enviou');
  }

}
