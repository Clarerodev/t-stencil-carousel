import { Component, ComponentWillLoad, h } from '@stencil/core';
import { ProcedureService } from '../../services/procedure.service';

@Component({
  tag: 'tst-carousel',
  styleUrl: 'tst-carousel.css',
  shadow: true,
})
export class TstCarousel implements ComponentWillLoad {

  procedureList: Procedure[] = [];

  componentWillLoad(): void | Promise<void> {
   return this.getMostConsultedProcedures();
  }

  private getMostConsultedProcedures() {
   return ProcedureService.getMostConsultedProcedures()
    .then(res => res.json())
      .then(({ data }) => {
        this.procedureList = data;
    });
  }

  render() {
    return (
      <div class="procedures-container">
        {
          this.procedureList.map(item => (
            <div>{item.nombre}</div>
          ))
        }
      </div>
    )
  }
}
