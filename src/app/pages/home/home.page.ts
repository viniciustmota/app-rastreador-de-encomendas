import { Component } from '@angular/core';
import { CorreioService } from '../../services/correio.service';
import { ToastController } from '@ionic/angular';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  selectedStore: string = 'aliexpress';


  statusRequisicao : boolean = false;

  correio : any = {};
  public codigo: string = '';
  codigoRastreamento: any = {};
  paisOrigem: any = {};
  paisDestino: any = {};
  nomeTransportadora: any = {};
  status: any = {};
  dataEntrega: any = {};
  prazoTotal: any = {};
  detailList: any = {};

  listTitle: any = {};

  constructor(private correioService: CorreioService, private toastCtrl : ToastController) {
  }


  localizarObjeto(evento: string) {
    if(evento.length<3){
      return;
    }

  this.correioService.localizarObjeto(evento, this.selectedStore)
    .then(response => {
      this.correio = response

      if(this.correio.code === 404)
      {
       this.enviarToast(this.correio.message);
      }

      console.log(this.correio)
      console.log(this.correio.current_status);


      this.codigoRastreamento = this.correio.mailNo || this.correio.sls_tracking_number || "Código de Rastreamento inexistente";
      this.paisOrigem = this.correio.originCountry || 'N/A'
      this.paisDestino = this.correio.destCountry || 'N/A'
      this.nomeTransportadora = this.correio.destCpInfo?.cpName || this.correio.delivery_type || 'N/A';
      this.status = this.correio.statusDesc || this.correio.current_status || 'N/A';
      this.dataEntrega = this.correio.latestTrace?.timeStr || 'Data não disponível';
      this.prazoTotal = this.correio.daysNumber || "Total de dias indisponível"
      this.detailList = this.correio.detailList || this.correio.tracking_list || []



      this.statusRequisicao = true;

    })
    .catch(error => {
      this.enviarToast('Objeto não encontrado');
      this.statusRequisicao = false;
    });
  }

  async enviarToast(mensagem : string){
    const toast = await this.toastCtrl.create({
      color: 'dark',
      message: mensagem,
      duration: 2000
    });

    toast.present();
  }


  formatarData(timestamp: number): string {
  const date = new Date(timestamp * 1000); // timestamp em segundos → milissegundos
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  const hora = String(date.getHours()).padStart(2, '0');
  const minuto = String(date.getMinutes()).padStart(2, '0');
  const segundo = String(date.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
}


}

// Códigos para Teste

// CNBR00073663096   ----> Exemplo Api

// NM845231329BR     ----> Alan

// BR2550108034452   ----> Andrey
