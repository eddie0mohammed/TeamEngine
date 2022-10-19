describe("Examine the creation of employees", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#/create");
  });

  it("validates empty submitted fields properly", () => {
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=firstNameErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=surnameErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=emailErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=jobTitleErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=statusErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=birthDateErrorMessage]").should(
      "contain",
      "Date of Birth is required"
    );
  });

  it("validates too long submitted values properly", () => {
    cy.get("[data-cy=firstNameInput]").type(
      "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn"
    );
    cy.get("[data-cy=surnameInput]").type(
      "DoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoe"
    );
    cy.get("[data-cy=emailInput]").type(
      "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn.doe@example.com"
    );
    cy.get("[data-cy=jobTitleInput]").type(
      "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn.doe@example.com"
    );
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=firstNameErrorMessage]").should(
      "contain",
      "The maximum number of characters is 255"
    );
    cy.get("[data-cy=surnameErrorMessage]").should(
      "contain",
      "The maximum number of characters is 255"
    );
    cy.get("[data-cy=emailErrorMessage]").should(
      "contain",
      "The maximum number of characters is 255"
    );
    cy.get("[data-cy=jobTitleErrorMessage]").should(
      "contain",
      "The maximum number of characters is 255"
    );
  });

  it("validates invalid email address properly", () => {
    cy.get("[data-cy=emailInput]").type("john.doe.example.com");
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=emailErrorMessage]").should(
      "contain",
      "Invalid email address"
    );
  });

  it("validates the date input field properly", () => {
    cy.get("[data-cy=birthDateInput]").type("1990-01-01");
    cy.get("[data-cy=birthDateInput]").should("have.value", "1990-01-01");

    const todaysDate = new Date().toISOString().split("T")[0]; // date in format yyyy-mm-dd
    const updatedDateArr = todaysDate.split("-");
    updatedDateArr[0] = Number(updatedDateArr[0]) + 1; // update date to future date yyyy + 1
    const nextYearsDate = updatedDateArr.join("-");

    cy.get("[data-cy=birthDateInput]").type(nextYearsDate).blur();
    cy.get("[data-cy=birthDateErrorMessage]").should(
      "contain",
      `birthDate field must be at earlier than ${
        new Date().toISOString().split("T")[0]
      }`
    );
  });

  it("validates the select field properly", () => {
    cy.get("[data-cy=statusInput]")
      .select("ACTIVE")
      .invoke("val")
      .should("eq", "ACTIVE");

    cy.get("[data-cy=statusInput]")
      .select("LEAVE_OF_ABSENCE")
      .invoke("val")
      .should("eq", "LEAVE_OF_ABSENCE");

    cy.get("[data-cy=statusInput]")
      .select("TERMINATED")
      .invoke("val")
      .should("eq", "TERMINATED");
  });

  it("validates the fully filled form properly", () => {
    cy.get("[data-cy=firstNameInput]").type("testFirstNametest");
    cy.get("[data-cy=surnameInput]").type("testSurnametest");
    cy.get("[data-cy=emailInput]").type("test@test.com");
    cy.get("[data-cy=jobTitleInput]").type("tester");
    cy.get("[data-cy=birthDateInput]").type("1990-01-01");
    cy.get("[data-cy=statusInput]").select("ACTIVE");
    cy.get("[data-cy=saveButton]").click();

    cy.url().should("eq", "http://localhost:3000/#/");

    cy.get("[data-cy=viewEmployeesButton]").click();
    cy.url().should("eq", "http://localhost:3000/#/view");

    cy.get("[data-cy=tr]").should($el => {
      expect($el).to.have.length(101);
    });

    cy.get("[data-cy=tr]")
      .contains("testFirstNametest")
      .should($el => {
        expect($el).to.have.length(1);
      });

    cy.get("[data-cy=tr]")
      .contains("testSurnametest")
      .should($el => {
        expect($el).to.have.length(1);
      });
  });
});
