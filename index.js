const { getRandomQuotes } = require("./server-actions/get-random-quotes");
const { getRandomUsers } = require("./server-actions/get-random-users");
const { getRandomFacts } = require("./server-actions/get-random-facts");
const { getProjectFinancials } = require("./server-actions/get-project-financials");

const serverActions = [
  {
    name: "getRandomQuotes",
    description: "Get a random quote",
    run: getRandomQuotes,
  },
  {
    name: "getRandomUsers",
    description: "Get a list of random users",
    run: getRandomUsers,
  },
  {
    name: "getRandomFacts",
    description: "Get a random fact",
    run: getRandomFacts,
  },
  {
    name: "getProjectFinancials",
    description: "Get sample financial data for an onboarding project",
    run: getProjectFinancials,
  },
];

const widgets = [
  {
    location: ["project_tab"],
    name: "Quote of the day",
    description: "This is a widget for the projects tab",
    icon: "widgets/public/icon.svg",
    entrypoint: {
      html: "dist/index.html",
    },
    identifier: "project-tab",
  },
  {
    location: ["project_financials_tab"],
    name: "Financials",
    description: "This is a widget for the project financials tab",
    icon: "widgets/public/icon.svg",
    entrypoint: {
      html: "dist/index.html",
    },
    identifier: "project-financials-tab",
  },
  {
    location: ["accounts_tab"],
    name: "Accounts",
    description: "This is a widget for the accounts tab",
    icon: "widgets/public/icon.svg",
    entrypoint: {
      html: "dist/index.html",
    },
    identifier: "account-tab",
  },
  {
    location: ["left_nav"],
    name: "Global",
    description: "This is a widget for the global tab",
    icon: "widgets/public/global-icon.svg",
    entrypoint: {
      html: "dist/index.html",
    },
    identifier: "global-tab",
  },
];

module.exports = {
  widgets,
  serverActions,
  version: "1.0.0",
};
