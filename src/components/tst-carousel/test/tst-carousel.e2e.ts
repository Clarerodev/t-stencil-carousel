import { newE2EPage } from '@stencil/core/testing';

describe('tst-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tst-carousel></tst-carousel>');

    const element = await page.find('tst-carousel');
    expect(element).toHaveClass('hydrated');
  });
});
