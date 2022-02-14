describe('burger-constructor test', function () {
  beforeEach('shoud open main page', function () {
    cy.visit('http://localhost:3000/');
  });
  it('checking that we on the main page', function () {
    cy.contains('Добавьте ингредиенты');
  });
  it('should find ingredient and open modal', function () {
    cy.get('[data-test-id="burger-ingredient"]').eq(1).click();
    cy.get('[data-test-id="modal"]').contains('Флюоресцентная булка R2-D3');
    cy.get('[data-test-id="close-button"]').click();
    cy.get('[data-test-id="burger-ingredient"]').eq(3).click();
    cy.get('[data-test-id="modal"]').contains(22);
    cy.get('[data-test-id="close-button"]').click();
  });

  it('making a order', function () {
    //adding ingredients
    cy.get('[data-test-id="burger-ingredient"]').eq(1).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(4).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(5).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(8).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(8).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(12).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(14).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(11).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(10).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(9).trigger('dragstart');
    cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    //deleting ingredient
    cy.get('.constructor-element__action').eq(1).click();
    //changing order
    cy.get('.constructor-element').eq(2).trigger('dragstart');
    cy.get('.constructor-element').eq(7).trigger('drop');
    cy.get('.constructor-element').eq(5).trigger('dragstart');
    cy.get('.constructor-element').eq(2).trigger('drop');
    //making order
    cy.get('button').eq(2).click();
    //logginIn
    cy.get('.input__placeholder').eq(0).type('qazwsx@gmail.com');
    cy.get('.input__placeholder').eq(1).type('123456');
    cy.get('button').eq(2).click().wait(1000);
    //making order
    //waiting for a order number
    cy.get('button')
      .eq(2)
      .click()
      .wait(15000)
      .get('[data-test-id="modal"]')
      .contains(
        'Метеоритный альфа-сахаридный антарианский минеральный астероидный фалленианский био-марсианский флюоресцентный бургер'
      )
      .get('[data-test-id="close-button"]')
      .click();
  });
});
