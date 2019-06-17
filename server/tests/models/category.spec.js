describe('Category Model', () => {
  describe('Validations', () => {
    it('has valid factory', async () => {
      expect(await isValid(factory.build('Category'))).to.be.true;
    });

    context('name', () => {
      it('is invalid when null', async () => {
        expect(await isValid(factory.build('Category', { name: null }))).to.be.false;
      });

      it('is invalid when length less than 2 characters', async () => {
        expect(await isValid(factory.build('Category', { name: '' }))).to.be.false;
      });

      it('is invalid when length greater than 35 characters', async () => {
        expect(await isValid(factory.build('Category', { name: 'a'.repeat(36) }))).to.be.false;
      });
    });
  });

  describe('Instance Methods', () => {
    let category1;
    let expense1; // eslint-disable-line no-unused-vars
    let expense2; // eslint-disable-line no-unused-vars

    before(async () => {
      await truncateTables();
      category1 = await factory.create('Category');
      expense1 = await factory.create('Expense', { cost: '100', categoryId: category1.id });
      expense2 = await factory.create('Expense', { cost: '200', categoryId: category1.id });
    });

    context('#getTotalExpenses', () => {
      it('returns correct total expenses', async () => {
        expect(await category1.getTotalExpenses()).to.be.eq('300.00');
      });
    });
  });
});
