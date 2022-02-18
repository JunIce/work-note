test("test toBe", () => {
  expect(2 + 2).toBe(4);
});

test("test equal", () => {
  expect(2 * 2).toEqual(4)
})

test("test Truthiness", () => {
  const n = null;
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeTruthy()
})

