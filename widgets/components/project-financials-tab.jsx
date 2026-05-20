import React from "react";
import { useQuery } from "@tanstack/react-query";

const formatCurrency = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value) => `${Math.round(value * 100)}%`;

const useFinancials = (app) =>
  useQuery({
    queryKey: ["project-financials"],
    queryFn: async () => {
      if (!app) throw new Error("App not initialized");
      const resp = await app.data.invoke("getProjectFinancials");
      return resp?.response;
    },
    enabled: !!app,
  });

const useCurrentProject = (app) =>
  useQuery({
    queryKey: ["current-project"],
    queryFn: async () => {
      if (!app) throw new Error("App not initialized");
      const resp = await app.data.get(app.data.dataIdentifiers.CURRENT_PROJECT);
      return resp?.response?.project;
    },
    enabled: !!app,
  });

const statusStyles = {
  PAID: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  INVOICED: "bg-blue-100 text-blue-700 ring-blue-200",
  PENDING: "bg-amber-100 text-amber-700 ring-amber-200",
  OUTSTANDING: "bg-rose-100 text-rose-700 ring-rose-200",
  "ON TRACK": "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

const StatusPill = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
      statusStyles[status] ?? "bg-gray-100 text-gray-700 ring-gray-200"
    }`}
  >
    {status}
  </span>
);

const KpiCard = ({ label, value, hint }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
  </div>
);

export const ProjectFinancialsTab = ({ app }) => {
  const { data: project } = useCurrentProject(app);
  const { data, isLoading, isError, error } = useFinancials(app);

  if (isLoading)
    return <div className="p-8 text-slate-500">Loading financials…</div>;
  if (isError || !data)
    return (
      <div className="p-8 text-rose-600">
        Failed to load financials: {String(error)}
      </div>
    );

  const { contract, health, milestones, costs, invoices } = data;
  const recognitionPct = health.revenueRecognized / contract.totalValue;
  const hoursPct = costs.loggedHours / costs.budgetedHours;
  const awaitingPayment = health.invoicedToDate - health.paidToDate;

  return (
    <div className="min-h-full bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Onboarding · Financial overview
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              {project?.projectName ?? "Customer onboarding"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {contract.billingFrequency} billing · Contract{" "}
              {contract.contractStart} – {contract.contractEnd}
            </p>
          </div>
          <StatusPill status="ON TRACK" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <KpiCard
            label="Total contract value"
            value={formatCurrency(contract.totalValue, contract.currency)}
            hint={`ARR ${formatCurrency(contract.annualRecurringRevenue)}`}
          />
          <KpiCard
            label="Recognized revenue"
            value={formatCurrency(health.revenueRecognized)}
            hint={`${formatPercent(recognitionPct)} of TCV`}
          />
          <KpiCard
            label="Outstanding"
            value={formatCurrency(health.revenueOutstanding)}
            hint={`${formatCurrency(awaitingPayment)} awaiting payment`}
          />
          <KpiCard
            label="Gross margin"
            value={formatPercent(health.grossMargin)}
            hint={`${formatCurrency(costs.burnedCost)} burned`}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Revenue recognition
              </h3>
              <span className="text-xs text-slate-500">
                {formatPercent(recognitionPct)}
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${recognitionPct * 100}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>{formatCurrency(health.revenueRecognized)} recognized</span>
              <span>{formatCurrency(contract.totalValue)} target</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Implementation hours
              </h3>
              <span className="text-xs text-slate-500">
                {formatPercent(hoursPct)}
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  hoursPct > 0.85 ? "bg-amber-500" : "bg-blue-500"
                }`}
                style={{ width: `${Math.min(hoursPct * 100, 100)}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>{costs.loggedHours} logged</span>
              <span>{costs.budgetedHours} budgeted</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Billing milestones
            </h3>
            <ul className="mt-4 divide-y divide-slate-100">
              {milestones.map((m) => (
                <li
                  key={m.name}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {m.name}
                    </p>
                    <p className="text-xs text-slate-500">Due {m.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-900">
                      {formatCurrency(m.amount)}
                    </span>
                    <StatusPill status={m.status} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-900">
              Cost by role
            </h3>
            <ul className="mt-4 space-y-3">
              {costs.byRole.map((r) => {
                const pct = r.cost / costs.burnedCost;
                return (
                  <li key={r.role}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-700">{r.role}</span>
                      <span className="font-medium text-slate-900">
                        {formatCurrency(r.cost)}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${pct * 100}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{r.hours} hrs</p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
              Forecast at completion:{" "}
              <span className="font-medium text-slate-900">
                {formatCurrency(costs.forecastedCost)}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-semibold text-slate-900">Invoices</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-2 text-left font-medium">Invoice</th>
                <th className="px-5 py-2 text-left font-medium">Date</th>
                <th className="px-5 py-2 text-right font-medium">Amount</th>
                <th className="px-5 py-2 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {inv.id}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{inv.date}</td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-900">
                    {formatCurrency(inv.amount)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <StatusPill status={inv.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
