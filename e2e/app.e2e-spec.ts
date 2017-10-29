import { DryoutPage } from './app.po';

describe('dryout App', () => {
  let page: DryoutPage;

  beforeEach(() => {
    page = new DryoutPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
