import { CalculatorService } from './calculator.service';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

describe('CalculatorService', () => {
  const service = new CalculatorService();
  beforeEach(() => {
    // always clears between tests to "reset"
    // the internal state.
    service.clear();
  });
  const testDisplayValue = ({
    done,
    startValue,
    beforeFn,
    expected
  }: {
    done: jest.DoneCallback;
    startValue: string;
    beforeFn: () => any;
    expected: string;
  }) => {
    // run the before code
    // tests the displayValue
    ((service as any)._displayValue$ as BehaviorSubject<string>).next(
      startValue
    );
    beforeFn();
    // now check
    service.displayValue$.pipe(take(1)).subscribe((finalValue) => {
      expect(finalValue).toEqual(expected);
      done();
    });
  };
  test('enter number adds number', (done) =>
    testDisplayValue({
      done,
      startValue: '1+',
      beforeFn: () => service.enterNumber(1),
      expected: '1+1'
    }));
  test('times adds *', (done) =>
    testDisplayValue({
      done,
      startValue: '10',
      beforeFn: () => service.times(),
      expected: '10*'
    }));
  test('divide adds /', (done) =>
    testDisplayValue({
      done,
      startValue: '3',
      beforeFn: () => service.divide(),
      expected: '3/'
    }));
  test('add adds +', (done) =>
    testDisplayValue({
      done,
      startValue: '32',
      beforeFn: () => service.add(),
      expected: '32+'
    }));
  test('subtract adds -', (done) =>
    testDisplayValue({
      done,
      startValue: '32',
      beforeFn: () => service.subtract(),
      expected: '32-'
    }));
  describe('removeDupOperators', () => {
    const testRemoveDupOperators = ({
      value,
      expected
    }: {
      value: string;
      expected: string;
    }) => expect((service as any).removeDupOperators(value)).toEqual(expected);
    test('does not change single operator', () =>
      testRemoveDupOperators({
        value: '1+1',
        expected: '1+1'
      }));
    test('does not change multiple single operators', () =>
      testRemoveDupOperators({
        value: '1+1+2',
        expected: '1+1+2'
      }));
    test('removes duplicate operators', () =>
      testRemoveDupOperators({
        value: '5+*7',
        expected: '5*7'
      }));
    test('removes multiple duplicate operators', () =>
      testRemoveDupOperators({
        value: '5+*7+*7+*7',
        expected: '5*7*7*7'
      }));
    test('removes multiple stacked duplicate operators', () =>
      testRemoveDupOperators({
        value: '5+++++*7',
        expected: '5*7'
      }));
    test('does not consider the last - operator to be a duplicate', () =>
      testRemoveDupOperators({
        value: '5+*-7',
        expected: '5*-7'
      }));
    test('does not consider the last - operator to be a duplicate among many', () =>
      testRemoveDupOperators({
        value: '5+*-7+*-7',
        expected: '5*-7*-7'
      }));
    test('does not consider multiple last - operators to be duplicates', () =>
      testRemoveDupOperators({
        value: '5+*---7',
        expected: '5--7'
      }));
    test('does consider multiple duplicate - operators to be duplicates', () =>
      testRemoveDupOperators({
        value: '5----7---7',
        expected: '5--7--7'
      }));
  });
  describe('equals', () => {
    test('evaluates display value', (done) =>
      testDisplayValue({
        done,
        startValue: '42 + 10',
        beforeFn: () => service.equals(),
        expected: '52'
      }));
    test('evaluates 0 to 0', (done) =>
      testDisplayValue({
        done,
        startValue: '0',
        beforeFn: () => service.equals(),
        expected: '0'
      }));
    test('evaluates empty string to empty string', (done) =>
      testDisplayValue({
        done,
        startValue: '',
        beforeFn: () => service.equals(),
        expected: ''
      }));
    test('only last duplicate non minus operator is used, but not cleared', (done) =>
      testDisplayValue({
        done,
        startValue: '10-+10',
        beforeFn: () => service.equals(),
        expected: '20'
      }));
    test('if there are duplicate operators, but with the last negative', (done) =>
      testDisplayValue({
        done,
        startValue: '10+-10',
        beforeFn: () => service.equals(),
        expected: '0'
      }));
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
