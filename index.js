const widgets = [
  {
    location: ["left_nav"],
    name: "COACT Day View",
    description: "Daily task overview across all your active projects",
    icon: "widgets/public/global-icon.svg",
    entrypoint: {
      html: "dist/index.html",
    },
    identifier: "day-view",
  },
];

module.exports = {
  widgets,
  serverActions: [],
  version: "1.0.0",
};
