//Search All button with name 'name'
Cypress.Commands.add('searchButton', (name) => {
    let buttonList = [];
    cy.get('button').each($button => {
        cy.wrap($button).invoke('text').then(text => {
            if (text.trim() === name) {
                buttonList.push($button);
            }
        });
    }).then(() => {
        return buttonList;
    });
});
