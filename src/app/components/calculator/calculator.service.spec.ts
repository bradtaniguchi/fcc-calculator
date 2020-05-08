import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  const service = new CalculatorService();
  beforeEach(() => {
    // always clears between tests to "reset"
    // the internal state.
    service.clear();
  });
  test.todo('enter number adds number');
  test.todo('times adds *');
  test.todo('divide adds /');
  test.todo('add adds +');
  test.todo('subtract adds-');
  describe('equals', () => {
    test.todo('evaluates display value');
    test.todo('evaluates 0 to 0');
    test.todo('evaluates empty string to empty string');
    test.todo('only last duplicate operator is used, but not cleared');
  });
  describe('enterDecimal', () => {
    test.todo('enterDecimal adds decimal');
    test.todo('enterDecimal does not add decimal');
  });
  describe('removeLeadingZeroes', () => {
    const testRemoveLeadingZeroes = ({
      value,
      expected
    }: {
      value: string;
      expected: string;
    }) => expect((service as any).removeLeadingZeroes(value)).toEqual(expected);

    test('returns empty string if given empty string', () =>
      testRemoveLeadingZeroes({
        value: '',
        expected: ''
      }));
    test('removes duplicate leading zeroes', () =>
      testRemoveLeadingZeroes({
        value: '00',
        expected: '0'
      }));
    test('allows 1 leading zero', () =>
      testRemoveLeadingZeroes({
        value: '0',
        expected: '0'
      }));
    test('allows normal entry without zero', () =>
      testRemoveLeadingZeroes({
        value: '10+9',
        expected: '10+9'
      }));
    test('removes leading zero before normal number', () =>
      testRemoveLeadingZeroes({
        value: '01',
        expected: '1'
      }));
    test('leaves leading zero if operator is next', () =>
      testRemoveLeadingZeroes({
        value: '0+',
        expected: '0+'
      }));
  });
});
