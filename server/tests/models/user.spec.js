describe('User Model', () => {
  describe('Validations', () => {
    it('has valid factory', async () => {
      expect(await isValid(factory.build('User'))).to.be.true;
    });

    context('firstName', () => {
      it('is invalid when null', async () => {
        expect(await isValid(factory.build('User', { firstName: null }))).to.be.false;
      });

      it('is invalid when length less than 2 characters', async () => {
        expect(await isValid(factory.build('User', { firstName: '' }))).to.be.false;
      });

      it('is invalid when length greater than 35 characters', async () => {
        expect(await isValid(factory.build('User', { firstName: 'a'.repeat(36) }))).to.be.false;
      });
    });

    context('lastName', () => {
      it('is invalid when null', async () => {
        expect(await isValid(factory.build('User', { lastName: null }))).to.be.false;
      });

      it('is invalid when length less than 2 characters', async () => {
        expect(await isValid(factory.build('User', { lastName: '' }))).to.be.false;
      });

      it('is invalid when length greater than 35 characters', async () => {
        expect(await isValid(factory.build('User', { lastName: 'a'.repeat(36) }))).to.be.false;
      });
    });

    context('email', () => {
      it('is invalid when null', async () => {
        expect(await isValid(factory.build('User', { email: null }))).to.be.false;
      });

      it('is invalid when length greater than 254 characters', async () => {
        expect(await isValid(factory.build('User', { email: `${'a'.repeat(255)}foo@bar.com` }))).to.be.false;
      });

      it('must be a valid email', async () => {
        expect(await isValid(factory.build('User', { email: 'foo@bar,com' }))).to.be.false;
      });
    });
  });

  describe('Instance Methods', () => {
    let user1;
    let expense1; // eslint-disable-line no-unused-vars
    let expense2; // eslint-disable-line no-unused-vars

    before(async () => {
      await truncateTables();
      user1 = await factory.create('User');
      expense1 = await factory.create('Expense', { cost: '100', userId: user1.id });
      expense2 = await factory.create('Expense', { cost: '200', userId: user1.id });
    });

    context('#getTotalExpenses', () => {
      it('returns correct total expenses', async () => {
        expect(await user1.getTotalExpenses()).to.be.eq('300.00');
      });
    });
  });
});
