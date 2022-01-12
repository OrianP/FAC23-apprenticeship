// it("can run a test", () => {
//     assert.equal(1, 1);
//   });

// it("can navigate pages", () => {
//   cy.visit("https://example.cypress.io/");
//   cy.contains('within').click();
//   cy.url().should("include", "/commands/querying");
// });

it("can check title", () => {
  cy.visit("/");
})
