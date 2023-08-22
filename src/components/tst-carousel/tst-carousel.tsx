import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tst-carousel',
  styleUrl: 'tst-carousel.css',
  shadow: true,
})
export class TstCarousel {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
