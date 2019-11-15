// dummy test for now just to make Travis CI happy :)

test('app.js should return an instance of the application', async () => {
  const app = await require('./app')();
  expect(app).toBeDefined();
  expect(app.get).toBeInstanceOf(Function);
});
