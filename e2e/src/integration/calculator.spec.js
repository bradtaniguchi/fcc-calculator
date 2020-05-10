describe("calculator", () => {
  describe("element exist", () => {
    it("equals");
    // copy of the button definitions
    // used to display in the calculator.
    const mainButtons = [
      {
        value: 7,
        word: "seven",
      },
      {
        value: 8,
        word: "eight",
      },
      {
        value: 9,
        word: "nine",
      },
      {
        value: 4,
        word: "four",
      },
      {
        value: 5,
        word: "five",
      },
      {
        value: 6,
        word: "six",
      },
      {
        value: 1,
        word: "one",
      },
      {
        value: 2,
        word: "two",
      },
      {
        value: 3,
        word: "three",
      },
      {
        value: "C",
        word: "clear",
      },
      {
        value: 0,
        word: "zero",
      },
      {
        value: ".",
        word: "decimal",
      },
    ];
    mainButtons.forEach((mainButton) => {
      // make sure every single one exists
      // TODO: test to make sure id is found on page
      it(mainButton.word);
    });
    it('add');
    it('subtract');
    it('multiply');
    it('divide');
    it('decimal');
    it('clear');
    it('display');
  });
  it('clear does nothing initially');
  it('clear clears entered values');
  it('equals adds the values');
  it('dividing by zero is recoverable');
  it('uses previous result after = ');
  it('has decimal places of precision');
});
