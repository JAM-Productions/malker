describe("Init View", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/malker");
    });

    it('Component "Header" check', () => {
        cy.get('div[id="header"]').should("exist");
    });

    it('Component "Footer" check', () => {
        cy.get('footer[id="footer"]').should("exist");
    });

    it("Screen components check", () => {
        cy.get('h1[id="header"]').should("exist");
        cy.get('p[id="subheader"]').should("exist");

        cy.get('input[id="title"]').should("exist");
        cy.get('input[id="author"]').should("exist");
        cy.get('input[id="date"]').should("exist");
        cy.get('input[id="location"]').should("exist");
        cy.get('textarea[id="description"]').should("exist");

        cy.get('button[id="Clear"]').should("exist");
        cy.get('button[id="Create"]').should("exist");
    });
});

describe("Functionality Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/malker");
    });

    it('Fill in the fields and delete them with the "Clear" button', () => {
        cy.get('input[id="title"]').clear();
        cy.get('input[id="author"]').clear();
        cy.get('input[id="date"]').clear();
        cy.get('input[id="location"]').clear();
        cy.get('textarea[id="description"]').clear();

        cy.get('input[id="title"]').type("Test Plan Title");
        cy.get('input[id="author"]').type("Test Author");
        cy.get('input[id="date"]').type("2024-02-11");
        cy.get('input[id="location"]').type("Test Location");
        cy.get('textarea[id="description"]').type("Test Description");

        cy.get('button[id="Clear"]').click();

        cy.get('input[id="title"]').should("have.value", "");
        cy.get('input[id="author"]').should("have.value", "");
        cy.get('input[id="date"]').should("have.value", "");
        cy.get('input[id="location"]').should("have.value", "");
        cy.get('textarea[id="description"]').should("have.value", "");
    });

    it("Fill in the fields and create a plan", () => {
        cy.get('input[id="title"]').clear();
        cy.get('input[id="author"]').clear();
        cy.get('input[id="date"]').clear();
        cy.get('input[id="location"]').clear();
        cy.get('textarea[id="description"]').clear();

        cy.get('input[id="title"]').type("Test Plan Title");
        cy.get('input[id="author"]').type("Test Author");
        cy.get('input[id="date"]').type("2024-02-11");
        cy.get('input[id="location"]').type("Test Location");
        cy.get('textarea[id="description"]').type("Test Description");

        cy.get('input[id="title"]').should("have.value", "Test Plan Title");
        cy.get('input[id="author"]').should("have.value", "Test Author");
        cy.get('input[id="date"]').should("have.value", "2024-02-11");
        cy.get('input[id="location"]').should("have.value", "Test Location");
        cy.get('textarea[id="description"]').should("have.value", "Test Description");

        cy.get('button[id="Create"]').click();

        cy.url().should("include", "/malker#/plan/");

        cy.url().then((url) => {
            const planId = url.split("/").pop();
            expect(planId).to.not.be.empty;
            expect(String(planId)).to.be.a("string");
        });
    });

    it("Create an empty plan", () => {
        cy.get('input[id="title"]').clear();
        cy.get('input[id="author"]').clear();
        cy.get('input[id="date"]').clear();
        cy.get('input[id="location"]').clear();
        cy.get('textarea[id="description"]').clear();

        cy.get('button[id="Create"]').click();

        cy.url().should("eq", "http://localhost:5173/malker");
    });
});
