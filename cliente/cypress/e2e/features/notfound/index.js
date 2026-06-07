/// <reference types="cypress" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("el usuario navega a {string}", function (ruta) {
  cy.visit(ruta);
});

Then("debería ver el texto {string}", function (texto) {
  cy.contains(texto).should("exist");
});