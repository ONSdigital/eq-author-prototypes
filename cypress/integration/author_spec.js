describe("eq-author", () => {
  it("Should redirect to the sign-in page", () => {
    cy.visit("/");
    cy.url().should("include", "sign-in");
  });

  it("Should allow user to log in as guest", () => {
    cy.contains("Sign in as Guest").click();
    cy.get("h1").should("contain", "Your Questionnaires");
  });

  it("can create a questionnaire", () => {
    cy.get("#btn-create-questionnaire").click();

    cy.get("#title").type("title");
    cy.get("#description").type("description");
    cy.get("#theme").select("default");
    cy.get("#legalBasis").select("StatisticsOfTradeAct");
    cy.get("label[for='navigation']").click();
    cy
      .get("button")
      .contains("Create")
      .click();

    cy.hash().should("match", /questionnaire\/\d+\/design\/\d+\/\d+/);
  });

  it("can create a new page", () => {
    cy.get("#btn-add-page").click();

    cy.hash().should("match", /questionnaire\/\d+\/design\/\d+\/\d+/);
    cy
      .get("#questionnaire-nav [aria-label='Delete page']")
      .should("have.length", 2);
  });

  it("can delete a page", () => {
    cy.get("#questionnaire-nav").within(() => {
      cy
        .get("[aria-label='Delete page']")
        .first()
        .click();

      cy.get("[aria-label='Delete page']").should("have.length", 1);
    });
  });

  it("can create a new section", () => {
    cy.get("#questionnaire-nav").within(() => {
      cy
        .get("button")
        .contains("Create new section")
        .click();

      cy.hash().should("match", /questionnaire\/\d+\/design\/\d+\/\d+/);
      cy.get("[aria-label='Delete section']").should("have.length", 2);
    });
  });

  it("can delete a section", () => {
    cy.get("#questionnaire-nav").within(() => {
      cy
        .get("[aria-label='Delete section']")
        .first()
        .click();

      cy.get("[aria-label='Delete section']").should("have.length", 1);
    });
  });

  it("can edit section title", () => {
    cy.get("#section-editor").within(() => {
      cy
        .get("[aria-label='title']")
        .click()
        .type("s")
        .click();

      cy.get("[aria-label='description']").click();
    });

    cy.get("#questionnaire-nav").contains("s");
  });

  it("can edit page title", () => {
    cy.get("#question-page-editor").within(() => {
      cy
        .get("[aria-label='Question']")
        .click()
        .type("p")
        .click();

      cy.get("[aria-label='Question guidance']").click();
    });

    cy.get("#questionnaire-nav").contains("p");
  });

  it("should create a new page when deleting only page in section", () => {
    cy.hash().then(prevHash => {
      cy.get("#questionnaire-nav [aria-label='Delete page']").click();
      cy.hash().should("not.equal", prevHash);
    });
  });

  it("should create a new section when deleting only section", () => {
    cy.hash().then(prevHash => {
      cy.get("#questionnaire-nav [aria-label='Delete section']").click();
      cy.hash().should("not.equal", prevHash);
    });
  });
});

export {};
