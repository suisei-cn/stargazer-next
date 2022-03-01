const getCheckbox = (i: number) => cy.get('.mantine-Checkbox-root').eq(i)

describe('Subscription page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/subscription')
  })

  it('Checkbox works', () => {
    getCheckbox(1).click()
    getCheckbox(2).click()

    getCheckbox(1).find('.mantine-Checkbox-input').should('be.checked')
    getCheckbox(2).find('.mantine-Checkbox-input').should('be.checked')
  })

  it('Select-all checkbox works', () => {
    getCheckbox(0).click()

    cy.get('.mantine-Checkbox-root').each(
      e => expect(e.find('.mantine-Checkbox-input')).to.be.checked
    )
  })
})
