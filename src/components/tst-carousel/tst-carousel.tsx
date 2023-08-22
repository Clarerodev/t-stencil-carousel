import { Component, ComponentWillLoad, State, h } from '@stencil/core';
import { ProcedureService } from '../../services/procedure.service';

@Component({
  tag: 'tst-carousel',
  styleUrl: 'tst-carousel.css',
  shadow: true,
})
export class TstCarousel implements ComponentWillLoad {

  @State() actualPage = 0;
  private procedureList: Procedure[] = [];
  private pagination = {
    elements: [],
    maxActiveNumber: 6
  };

  componentWillLoad(): void | Promise<void> {
    return this.getMostConsultedProcedures();
  }

  private getMostConsultedProcedures() {
    return ProcedureService.getMostConsultedProcedures()
      .then(res => res.json())
      .then(({ data }) => {
        this.procedureList = data;
        this.splitData({ data, dataLength: this.procedureList.length });
        console.log(this.pagination);
      });
  }

  private splitData({ data, actualPosition = 0, dataLength = 0 }) {
    const newActualPosition = (actualPosition + this.pagination.maxActiveNumber);
    let newData = [...data];
    if (newActualPosition < dataLength) {
      this.pagination.elements.push(newData.splice(actualPosition, newActualPosition));
      this.splitData({ data, actualPosition: newActualPosition, dataLength });
    } else {
      this.pagination.elements.push(newData.splice(actualPosition, dataLength));
    }
  }

  private getCardDetail(item: Procedure) {
    return (
      <div class="procedure__card">
        <div class="procedure__card-ico">
          <img src={item.iconoCategoria ?? ''}
            height="35"
            width="35" />
        </div>
        <div class="procedure__card-title">
          <a href='#detail'>{item.nombre}</a>
        </div>
      </div>
    )
  }

  private getCarouserSection(item: Procedure[], index: number) {
    return (
      <div class={{
        'carousel-section': true,
        'active': this.actualPage == index
      }}>
        <div class="carousel-row">
          {
            item.map(itemCard => (
              this.getCardDetail(itemCard)
            ))
          }
        </div>
      </div>
    )
  }

  private prevSection() {
    this.actualPage = (this.actualPage === 0)
      ? this.pagination.elements.length - 1
      : this.actualPage - 1;
  }

  private nextSection() {
    this.actualPage = (this.actualPage === this.pagination.elements.length - 1)
      ? 0
      : this.actualPage + 1;
  }

  render() {
    return (
      <div class="procedures-container">
        <div class="opt-prev">
          <button onClick={this.prevSection.bind(this)}>Antes</button>
        </div>
        {
          this.pagination.elements.map((item, index) => (
            this.getCarouserSection(item, index)
          ))
        }
        <div class="opt-next">
          <button onClick={this.nextSection.bind(this)}>Despues</button>
        </div>
      </div>
    )
  }
}
