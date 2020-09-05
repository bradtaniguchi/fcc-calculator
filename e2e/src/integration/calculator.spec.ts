import {
  CalculatorPageObject,
  CalculatorButtons
} from '../fixtures/calculator.po';

describe('calculator', () => {
  const calculatorPageObject = new CalculatorPageObject();
  before(() => {
    cy.visit('');
  });
  afterEach(() => {
    cy.reload();
  });
  describe('element exist', () => {
    // make sure every single one exists
    it('main buttons', () => {
      calculatorPageObject.mainButtons.forEach(
        (mainButton) => expect(cy.get(`#${mainButton}`)).exist
      );
    });
    it('action buttons', () => {
      calculatorPageObject.actionButtons.forEach(
        (id) => expect(cy.get(`#${id}`)).exist
      );
    });
  });
  it('clear does nothing initially', () => {
    calculatorPageObject
      .getDisplay()
      .should('be.visible')
      .should('have.text', ' 0 ');
    calculatorPageObject
      .getButton(CalculatorButtons.equals)
      .should('be.visible')
      .click();
    calculatorPageObject
      .getDisplay()
      .should('be.visible')
      .should('have.text', ' 0 ');
  });
  it('1+1 equals 2', () => {
    calculatorPageObject
      .getDisplay()
      .should('be.visible')
      .should('have.text', ' 0 ');

    calculatorPageObject
      .getButton(CalculatorButtons.one)
      .should('be.visible')
      .click();
    calculatorPageObject.getDisplay().should('have.text', ' 1 ');

    calculatorPageObject
      .getButton(CalculatorButtons.add)
      .should('be.visible')
      .click();
    calculatorPageObject.getDisplay().should('have.text', ' 1+ ');

    calculatorPageObject
      .getButton(CalculatorButtons.one)
      .should('be.visible')
      .click();
    calculatorPageObject.getDisplay().should('have.text', ' 1+1 ');

    calculatorPageObject
      .getButton(CalculatorButtons.equals)
      .should('be.visible')
      .click();
    calculatorPageObject.getDisplay().should('have.text', ' 2 ');
  });
  it('clear clears entered values (2/2)', () => {
    calculatorPageObject
      .getDisplay()
      .should('be.visible')
      .should('have.text', ' 0 ');

    calculatorPageObject
      .getButton(CalculatorButtons.two)
      .should('be.visible')
      .click();
    calculatorPageObject.getDisplay().should('have.text', ' 2 ');

    calculatorPageObject
      .getButton(CalculatorButtons.divide)
      .should('be.visible')
      .click();
    calculatorPageObject.getDisplay().should('have.text', ' 2/ ');

    calculatorPageObject
      .getButton(CalculatorButtons.two)
      .should('be.visible')
      .click();
    calculatorPageObject.getDisplay().should('have.text', ' 2/2 ');

    calculatorPageObject
      .getButton(CalculatorButtons.clear)
      .should('be.visible')
      .click();
    calculatorPageObject.getDisplay().should('have.text', ' 0 ');
  });
  it('accepts keyboard inputs', () => {
    calculatorPageObject
      .getDisplay()
      .should('be.visible')
      .should('have.text', ' 0 ');

    cy.get('body').type('2*4=');
    calculatorPageObject.getDisplay().should('have.text', ' 8 ');
    cy.get('body').type('c');
    calculatorPageObject.getDisplay().should('have.text', ' 0 ');
  });
  it('only last non minus operator is considered', () => {
    calculatorPageObject
      .getDisplay()
      .should('be.visible')
      .should('have.text', ' 0 ');

    cy.get('body').type('2-+2=');
    calculatorPageObject.getDisplay().should('have.text', ' 4 ');
    cy.get('body').type('c');
    calculatorPageObject.getDisplay().should('have.text', ' 0 ');
  });
  it('dividing by zero is recoverable');
  it('uses previous result after = ');
  it('has decimal places of precision');
});
