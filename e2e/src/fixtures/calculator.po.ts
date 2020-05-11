export enum CalculatorButtons {
  'zero' = 'zero',
  'one' = 'one',
  'two' = 'two',
  'three' = 'three',
  'four' = 'four',
  'five' = 'five',
  'six' = 'six',
  'seven' = 'seven',
  'eight' = 'eight',
  'nine' = 'nine',
  'decimal' = 'decimal',
  'clear' = 'clear',

  'add' = 'add',
  'subtract' = 'subtract',
  'multiply' = 'multiply',
  'divide' = 'divide',
  'equals' = 'equals'
}
export class CalculatorPageObject {
  public readonly mainButtons = [
    CalculatorButtons.zero,
    CalculatorButtons.one,
    CalculatorButtons.two,
    CalculatorButtons.three,
    CalculatorButtons.four,
    CalculatorButtons.five,
    CalculatorButtons.six,
    CalculatorButtons.seven,
    CalculatorButtons.eight,
    CalculatorButtons.nine,
    // decimals and clear
    CalculatorButtons.decimal,
    CalculatorButtons.clear
  ];
  public readonly actionButtons = [
    CalculatorButtons.add,
    CalculatorButtons.subtract,
    CalculatorButtons.multiply,
    CalculatorButtons.divide,
    CalculatorButtons.equals
  ];

  public getButton(button: CalculatorButtons) {
    return cy.get(`#${button}`);
  }

  public getDisplay() {
    return cy.get('#display');
  }
}
