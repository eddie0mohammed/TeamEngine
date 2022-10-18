describe("Examine employees list content and functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#/view");
  });
  it("contains correct information", () => {
    cy.get("[data-cy=header]").should("contain", "View Employees");
  });

  // check table headers
  it("checks if table headers are displayed correctly", () => {
    cy.get("[data-cy=firstName]").should("contain", "First Name");
    cy.get("[data-cy=surname]").should("contain", "Surname");
    cy.get("[data-cy=email]").should("contain", "Email");
    cy.get("[data-cy=dob]").should("contain", "DOB");
    cy.get("[data-cy=jobTitle]").should("contain", "Job Title");
    cy.get("[data-cy=status]").should("contain", "Status");
  });

  // check if all rows are displayed
  it("checks if all rows are displayed", () => {
    cy.get("[data-cy=tr]").should($tr => {
      expect($tr).to.have.length(100);
    });
  });

  // check if all buttons are displayed
  it("checks if all buttons are displayed correctly", () => {
    cy.get("[data-cy=editButton]").should($editBtn => {
      expect($editBtn).to.have.length(100);
      expect($editBtn.first().text()).to.eq("Edit");
    });

    cy.get("[data-cy=deleteButton]").should($deleteBtn => {
      expect($deleteBtn).to.have.length(100);
      expect($deleteBtn.first().text()).to.eq("Delete");
    });
  });

  // check searchInput
  it("checks if searchInput field work properly", () => {
    cy.get("[data-cy=searchInput]").type("v");
    cy.get("[data-cy=searchInput]").should("have.value", "v");

    // check if each row of the table contains records with surname starting with 'Z'
    cy.get("[data-cy=td-surname]").should($td => {
      // should have found 2 elements
      expect($td).to.have.length(2);

      const contents = $td.text();
      expect(contents[0].toLowerCase()).to.match(/v/);
    });
  });

  // check if delete button works properly
  it("checks if the delete functionality works properly", () => {
    cy.get("[data-cy=deleteButton]").should($deleteBtn => {
      $deleteBtn.first().click();
      expect($deleteBtn).to.have.length(99);
    });
  });

  // check edit functionality
});
