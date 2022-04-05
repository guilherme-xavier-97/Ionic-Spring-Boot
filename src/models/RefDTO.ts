/*Essa interface serve só pra referenciar outros objetos usando o id. Ex: Eu quero pegar só o id do cliente
não todos os dados que vem no objeto ClienteService, então eu chamo essa interface*/
export interface RefDTO {
  id: string;
}
