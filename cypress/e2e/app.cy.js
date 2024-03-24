let planId = "";

describe("Init View PlanForm", () => {
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

describe("Functionality Tests PlanForm", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/malker");
    });

    it('Fill in the fields and delete them with the "Clear" button', () => {
        cy.get('input[id="title"]').clear();
        cy.get('input[id="author"]').clear();
        cy.get('input[id="date"]').clear();
        cy.get('input[id="location"]').clear();
        cy.get('textarea[id="description"]').clear();

        cy.get('input[id="title"]').type("Cypress Test");
        cy.get('input[id="author"]').type("Cypress Test");
        cy.get('input[id="date"]').type("2024-02-11");
        cy.get('input[id="location"]').type("Cypress Test");
        cy.get('textarea[id="description"]').type("Cypress Test");

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

        cy.get('input[id="title"]').type("Cypress Test");
        cy.get('input[id="author"]').type("Cypress Test");
        cy.get('input[id="date"]').type("2024-02-11");
        cy.get('input[id="location"]').type("Cypress Test");
        cy.get('textarea[id="description"]').type("Cypress Test");

        cy.get('input[id="title"]').should("have.value", "Cypress Test");
        cy.get('input[id="author"]').should("have.value", "Cypress Test");
        cy.get('input[id="date"]').should("have.value", "2024-02-11");
        cy.get('input[id="location"]').should("have.value", "Cypress Test");
        cy.get('textarea[id="description"]').should("have.value", "Cypress Test");

        cy.get('button[id="Create"]').click();

        cy.url().should("include", "/malker#/plan/");

        cy.url().then((url) => {
            planId = url.split("/").pop();
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

describe("Init View PlanView", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/malker#/plan/" + planId);
    });

    it('Component "Header" check', () => {
        cy.get('div[id="header"]').should("exist");
    });

    it('Component "Footer" check', () => {
        cy.get('footer[id="footer"]').should("exist");
    });

    it("Screen components check", () => {
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
        //cy.get('p[id="user-card-tag"]').should("exist");

        //cy.get('button[id="Leave"]').should("exist");
        //cy.get('button[id="Leave"]').click();

        //cy.get('input[id="name"]').should("exist");
        //cy.get('button[id="Join"]').should("exist");
    });
});

describe("Functionality Tests PlanView", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/malker#/plan/" + planId);
    });

    it("Dropdown button click", () => {
        cy.get("button[id=dropdown-button]").click();
        cy.get("#dropdown-icon").should("have.class", "rotate-0");
    });

    it("Join plan without name", () => {
        cy.get('input[id="name"]').clear();
        cy.get('button[id="Join"]').click();
        cy.get('input[id="name"]').should("exist");
        cy.get('button[id="Join"]').should("exist");
    });

    it("Join plan and Leave plan", () => {
        //cy.get('input[id="name"]').type("Cypress Test");
        //cy.get('button[id="Join"]').click();
        //cy.get('div[id="user-card"]').should("exist");
        //cy.get('p[id="user-card-name"]').should("exist");
        //cy.get("p#user-card-name").should("not.have.text", "unknown name");
        //cy.get('p[id="user-card-tag"]').should("exist");
        //cy.get("p#user-card-tag").should("have.text", "You");
        //cy.get("button[id=Leave]").should("exist");
        //cy.get('button[id="Leave"]').click();
        //cy.get('input[id="name"]').should("exist");
        //cy.get('button[id="Join"]').should("exist");
    });
});
