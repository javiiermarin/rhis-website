import {Component, OnInit} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {SharedModule} from "primeng/api";
import {CalendarModule} from "primeng/calendar";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {PlanillaService} from "../../../service/planilla.service";
import {PagoPlanillaResponse} from "../../../api/pagoPlanillaResponse";
import {CurrencyPipe} from "@angular/common";
import {PagoPlanillaRequest} from "../../../api/pagoPlanillaRequest";
import {FormsModule} from "@angular/forms";
import {switchMap} from "rxjs";
import {format} from "date-fns";

@Component({
  selector: 'app-planilla',
  standalone: true,
    imports: [
        ToolbarModule,
        SharedModule,
        CalendarModule,
        TableModule,
        RippleModule,
        CurrencyPipe,
        FormsModule
    ],
  templateUrl: './planilla.component.html',
  styleUrl: './planilla.component.scss'
})
export class PlanillaComponent implements OnInit{

    fechaInicio: string;
    fechaFinal: string;
    planillaRequest: PagoPlanillaRequest = new PagoPlanillaRequest();
    lstPagoPlanilla: PagoPlanillaResponse [] = [];

  constructor(private pagoPlanillaService: PlanillaService) {

  }

  ngOnInit() {
    this.pagoPlanillaService.obtenerPlanilla().subscribe(data => this.lstPagoPlanilla = data);

  }

  generarPlanilla(planillaRequest: PagoPlanillaRequest) {
      this.fechaInicio = format(new Date(this.planillaRequest.fechaInicio), 'yyyy-MM-dd');
      this.fechaFinal = format(new Date(this.planillaRequest.fechaFinal), 'yyyy-MM-dd');

      this.planillaRequest.fechaInicio = this.fechaInicio;
      this.planillaRequest.fechaFinal = this.fechaFinal;

      this.planillaRequest = planillaRequest;
      this.pagoPlanillaService.generarPlanilla(this.planillaRequest).pipe(switchMap(() => {
          return this.pagoPlanillaService.obtenerPlanilla();
      })).subscribe(data => this.lstPagoPlanilla = data);
  }

}
