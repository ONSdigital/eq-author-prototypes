export function createQuestionnaire(name) {
  cy.get("#btn-create-questionnaire").click();
  cy.get("#title").type(name);
  cy.get("#description").type("description");
  cy.get("#theme").select("default");
  cy.get("#legalBasis").select("StatisticsOfTradeAct");
  cy.get("label[for='navigation']").click();
  cy
    .get("button")
    .contains("Create")
    .click();
}

export function addAnswerType(answerType) {
  cy.get("#add-answer-button").click();
  cy.contains(answerType).click();
}

export function assertHash(prevHash, currentHash, equality) {
  const basicQuestionnaireRegex = /questionnaire\/(\d+)\/design\/(\d+)\/(\d+)/;

  const prevRegexCapture = prevHash.match(basicQuestionnaireRegex);
  const currentRegexCapture = currentHash.match(basicQuestionnaireRegex);

  if (equality.questionnaireId) {
    expect(prevRegexCapture[1], "questionnaireId").to.equal(
      currentRegexCapture[1]
    );
  } else {
    expect(prevRegexCapture[1], "questionnaireId").not.to.equal(
      currentRegexCapture[1]
    );
  }

  if (equality.sectionId) {
    expect(prevRegexCapture[2], "sectionId").to.equal(currentRegexCapture[2]);
  } else {
    expect(prevRegexCapture[2], "sectionId").not.to.equal(
      currentRegexCapture[2]
    );
  }

  if (equality.pageId) {
    expect(prevRegexCapture[3], "pageId").to.equal(currentRegexCapture[3]);
  } else {
    expect(prevRegexCapture[3], "pageId").not.to.equal(currentRegexCapture[3]);
  }
}