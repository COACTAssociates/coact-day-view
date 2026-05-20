const getProjectFinancials = async (rliCore, args) => {
  return {
    contract: {
      totalValue: 120000,
      currency: "USD",
      annualRecurringRevenue: 96000,
      oneTimeFees: 24000,
      billingFrequency: "Annual",
      contractStart: "2026-02-01",
      contractEnd: "2027-02-01",
    },
    health: {
      invoicedToDate: 60000,
      paidToDate: 36000,
      revenueRecognized: 38400,
      revenueOutstanding: 81600,
      grossMargin: 0.62,
    },
    milestones: [
      { name: "Kickoff", amount: 12000, dueDate: "2026-02-15", status: "PAID" },
      { name: "Discovery sign-off", amount: 18000, dueDate: "2026-03-15", status: "INVOICED" },
      { name: "UAT sign-off", amount: 30000, dueDate: "2026-05-01", status: "PENDING" },
      { name: "Go-live", amount: 36000, dueDate: "2026-06-15", status: "PENDING" },
      { name: "30-day stabilization", amount: 24000, dueDate: "2026-07-15", status: "PENDING" },
    ],
    costs: {
      budgetedHours: 320,
      loggedHours: 184,
      burnedCost: 27600,
      forecastedCost: 48000,
      byRole: [
        { role: "Solutions Architect", hours: 42, cost: 8400 },
        { role: "Implementation Lead", hours: 78, cost: 11700 },
        { role: "Engineer", hours: 56, cost: 6720 },
        { role: "Project Manager", hours: 8, cost: 780 },
      ],
    },
    invoices: [
      { id: "INV-1042", date: "2026-02-15", amount: 12000, status: "PAID" },
      { id: "INV-1078", date: "2026-03-20", amount: 24000, status: "PAID" },
      { id: "INV-1115", date: "2026-04-30", amount: 24000, status: "OUTSTANDING" },
    ],
  };
};

module.exports = {
  getProjectFinancials,
};
