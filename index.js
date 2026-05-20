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

const installationFields = () => [
  {
    name: "apiKey",
    label: "Rocketlane API Key",
    type: "AUTH_API_KEY",
    required: true,
    secure: true,
  },
];

module.exports = {
  widgets,
  serverActions: [],
  installationFields,
  version: "1.0.0",
};
