describe("form test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("test", () => {
    cy.get(":nth-child(1) > .form-control")
      .type("aytekin ozis")
      .should("have.value", "aytekin ozis");
    cy.get(":nth-child(2) > .form-control").type("example@example.com");
    cy.get(":nth-child(3) > .form-control").type("asdASD123!");
    cy.get(".form-check-input").check().should("be.checked");
    cy.get(".btn").click();
  });
});
