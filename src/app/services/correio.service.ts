import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorreioService {


  constructor() {}

private headers = {
    'x-rapidapi-key': '905ef4e130msh3cce1a6824a15e4p15d101jsn4b046e5917b5',
    'x-rapidapi-host': 'correios-rastreamento-de-encomendas.p.rapidapi.com'
  };

  async localizarObjeto(codigoObjeto : string, lojaSelecionada: string) {
    let url = `https://correios-rastreamento-de-encomendas.p.rapidapi.com/${lojaSelecionada}?tracking_code=${codigoObjeto}&language=pt-BR&confidence_level=high`;


    const options = {
      method: 'GET',
      headers: this.headers
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


// NM845231329BR
