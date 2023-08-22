import { newSpecPage } from '@stencil/core/testing';
import { TstCarousel } from '../tst-carousel';

describe('tst-carousel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TstCarousel],
      html: `<tst-carousel></tst-carousel>`,
    });
    expect(page.root).toEqualHtml(`
      <tst-carousel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tst-carousel>
    `);
  });
});
