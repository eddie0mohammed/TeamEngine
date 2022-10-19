describe("Examine employees list content and functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#/view");
  });
  it("contains correct information", () => {
    cy.get("[data-cy=header]").should("contain", "View Employees");
  });

  it("checks if table headers are displayed correctly", () => {
    cy.get("[data-cy=firstName]").should("contain", "First Name");
    cy.get("[data-cy=surname]").should("contain", "Surname");
    cy.get("[data-cy=email]").should("contain", "Email");
    cy.get("[data-cy=dob]").should("contain", "DOB");
    cy.get("[data-cy=jobTitle]").should("contain", "Job Title");
    cy.get("[data-cy=status]").should("contain", "Status");
  });

  it("checks if all rows are displayed", () => {
    cy.get("[data-cy=tr]").should($tr => {
      expect($tr).to.have.length(100);
    });
  });

  it("checks if all buttons are displayed correctly", () => {
    cy.get("[data-cy=editButton]").should($editBtn => {
      expect($editBtn.first().text()).to.eq("Edit");
      expect($editBtn).to.have.length(100);
    });

    cy.get("[data-cy=deleteButton]").should($deleteBtn => {
      expect($deleteBtn.first().text()).to.eq("Delete");
      expect($deleteBtn).to.have.length(100);
    });
  });

  it("checks if searchInput field work properly", () => {
    cy.get("[data-cy=searchInput]").type("v");
    cy.get("[data-cy=searchInput]").should("have.value", "v");

    cy.get("[data-cy=td-surname]").should($td => {
      const contents = $td.text();
      expect(contents[0].toLowerCase()).to.match(/v/);
    });
  });

  it("checks if the delete functionality works properly", () => {
    cy.get("[data-cy=deleteButton]").should($deleteBtn => {
      $deleteBtn.first().click();
      expect($deleteBtn).to.have.length(99);
    });
  });

  it("checks if the edit functionality works properly", () => {
    cy.get("[data-cy=editButton]").first().click();
    cy.get("[data-cy=firstNameInput]")
      .type("{selectall}{backspace}")
      .type("testEditFirstName");
    cy.get("[data-cy=surnameInput]")
      .type("{selectall}{backspace}")
      .type("testEditSurname");
    cy.get("[data-cy=emailInput]")
      .type("{selectall}{backspace}")
      .type("testEditEmail@testEditEmail.com");
    cy.get("[data-cy=jobTitleInput]")
      .type("{selectall}{backspace}")
      .type("testEditJobTitle");
    cy.get("[data-cy=birthDateInput]").clear().type("2000-10-10");
    cy.get("[data-cy=statusInput]").select("TERMINATED");
    cy.get("[data-cy=saveButton]").click();

    cy.url().should("eq", "http://localhost:3000/#/");

    cy.get("[data-cy=viewEmployeesButton]").click();
    cy.url().should("eq", "http://localhost:3000/#/view");

    cy.get("[data-cy=tr]").should($tr => {
      const firstName = $tr.first().find("[data-cy=td-firstName]");
      const surname = $tr.first().find("[data-cy=td-surname]");
      const email = $tr.first().find("[data-cy=td-email]");
      const birthDate = $tr.first().find("[data-cy=td-birthDate]");
      const jobTitle = $tr.first().find("[data-cy=td-jobTitle]");
      const status = $tr.first().find("[data-cy=td-status]");

      expect(firstName.text()).to.eq("testEditFirstName");
      expect(surname.text()).to.eq("testEditSurname");
      expect(email.text()).to.eq("testEditEmail@testEditEmail.com");
      expect(jobTitle.text()).to.eq("testEditJobTitle");
      expect(birthDate.text()).to.eq("2000-10-10");
      expect(status.text()).to.eq("TERMINATED");
    });
  });
});
