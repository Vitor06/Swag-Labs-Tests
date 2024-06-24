
import '../support/commands.js'
const variables = {
    userName:'standard_user',
    password :'secret_sauce',
    namePurchase:'test',
    latNamePurchase:'test',
    postalCode:'9999999999'


}

describe('Swag Labs Tests', () => {

    it('Visiting the website', () => {
        cy.visit('https://www.saucedemo.com');
    });

    it('Login', () => {
        cy.get('#user-name').type(variables.userName)
        cy.get('#password').type(variables.password)
        cy.get('#login-button').click()

    })
    it('Add products to the cart', () => {
        //clean the cart for next test
        cy.window().then((win) => {
            let cartContents  = win.localStorage.getItem('cart-contents');
            cartContents = [];
            win.localStorage.setItem('cart-contents', JSON.stringify(cartContents));
        });
        cy.reload()

        //Cacthe all buttons with name 'Add to cart'
        cy.searchButton('Add to cart').
        then(($buttonList) => {
            cy.wrap($buttonList).
            each(($button)=>{
               cy.wrap($button).click();
            })
        })

    });

    it('Remove Item from cart', () => {
        //Cacthe all buttons with name 'Remove'
        cy.searchButton('Remove').
        then(($buttonList) => {
            cy.wrap($buttonList).
            each(($button)=>{
               cy.wrap($button).click();
            })
        })
    })

    it('Filter Select', () => {
        cy.get('.product_sort_container')
        .as('options')
        .find('option')
        .then(($options) => {
            //Select all options
            $options.each((index, $option) => {
                cy.get('@options').select(index);
            });

        })
    });

    it('Confirm the purchase', () => {
        // Add a product to make the purchase
        cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()
        cy.get('.shopping_cart_link').click()
        cy.contains('button','Checkout').click()
        cy.get('#first-name').type(variables.namePurchase)
        cy.get('#last-name').type(variables.latNamePurchase)
        cy.get('#postal-code').type(variables.postalCode)
        cy.get('input[type="submit"]').click();
        cy.contains('button','Finish').click();
        cy.contains('button','Back Home').click();


    });

})
