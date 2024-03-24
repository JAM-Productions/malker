describe("template spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/malker#/plan/0NESbOlfKwSlKO529meU");
    });

    it('Component "Header" check', () => {
        cy.get('div[id="header"]').should("exist");
    });

    it('Component "Footer" check', () => {
        cy.get('footer[id="footer"]').should("exist");
    });

    it("Screen components check when not joined", () => {
        cy.get('div[id="back-button"]').should("exist");
        cy.get('div[id="dropdown-plan"]').should("exist");

        cy.get("h1[id=plan-title]").should("exist");
        cy.get("h1#plan-title").should("not.have.text", "");

        cy.get("button[id=dropdown-button]").should("exist");
        cy.get("#dropdown-icon").should("have.class", "rotate-180");

        cy.get("span[id=plan-date]").should("exist");
        cy.get("span#plan-date").should("not.have.text", "");

        cy.get("span[id=plan-location]").should("exist");
        cy.get("span#plan-location").should("not.have.text", "");

        cy.get("div[id=plan-actions]").should("exist");

        cy.get("p[id=plan-description]").should("exist");
        cy.get("p#plan-description").should("not.have.text", "");

        cy.get('input[id="name"]').should("exist");
        cy.get('button[id="Join"]').should("exist");

        //cy.get('input[id="name"]').type("Cypress Test");
        //cy.get('button[id="Join"]').click();

        //cy.get('div[id="user-card"]').should("exist");
        //cy.get('p[id="user-card-name"]').should("exist");
        ///cy.get('p[id="user-card-tag"]').should("exist");

        //cy.get('button[id="Leave"]').should("exist");
        //cy.get('button[id="Leave"]').click();

        //cy.get('input[id="name"]').should("exist");
        //cy.get('button[id="Join"]').should("exist");
    });
});

describe("Functionality Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/malker#/plan/0NESbOlfKwSlKO529meU");
    });

    it("Dropdown button click", () => {
        cy.get("button[id=dropdown-button]").click();
        cy.get("#dropdown-icon").should("have.class", "rotate-0");
    });

    it("Join plan", () => {
        //cy.get('input[id="name"]').type("Cypress Test");
        //cy.get('button[id="Join"]').click();
        //cy.get('div[id="user-card"]').should("exist");
    });
});
