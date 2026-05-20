"use strict";
(this["webpackChunkwidgets"] = this["webpackChunkwidgets"] || []).push([["main"],{

/***/ 398:
/*!********************************************!*\
  !*** ./widgets/components/account-tab.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountsTab: () => (/* binding */ AccountsTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ 7286);


const useGetRandomUsers = app => {
  return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({
    queryKey: ["random-users"],
    queryFn: async () => {
      const resp = await app.data.invoke("getRandomUsers");
      return resp?.response;
    }
  });
};
const AccountsTab = ({
  app
}) => {
  const {
    data,
    isLoading,
    isError
  } = useGetRandomUsers(app);
  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading...");
  if (isError) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Error: ", isError.message);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col items-center justify-center h-full p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "text-2xl font-bold text-blue-500 mb-4"
  }, "Random Users"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
  }, data?.map((user, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "bg-white rounded-lg shadow-md p-4 border"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: user.picture.medium,
    alt: `${user.name.first} ${user.name.last}`,
    className: "w-16 h-16 rounded-full"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "font-semibold text-lg"
  }, user.name.first, " ", user.name.last), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-gray-600"
  }, user.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-gray-500 text-sm"
  }, user.location.city, ", ", user.location.country)))))));
};

/***/ }),

/***/ 3239:
/*!*******************************!*\
  !*** ./widgets/src/index.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 5078:
/*!*******************************************!*\
  !*** ./widgets/components/global-tab.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalTab: () => (/* binding */ GlobalTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ 7286);


const useGetRandomFacts = app => {
  return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({
    queryKey: ["random-facts"],
    queryFn: async () => {
      const resp = await app.data.invoke("getRandomFacts");
      return resp?.response;
    }
  });
};
const GlobalTab = ({
  app
}) => {
  const {
    data,
    isLoading,
    isError,
    refetch
  } = useGetRandomFacts(app);
  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading...");
  if (isError) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Error: ", isError.message);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col items-center justify-center h-full p-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-2xl text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "text-3xl font-bold text-purple-600 mb-6"
  }, "\uD83C\uDFAF Random Fun Fact"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 shadow-lg border border-purple-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-lg text-gray-800 leading-relaxed mb-4"
  }, data.text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Source:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "font-medium"
  }, data.source || "Fun Facts API")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => refetch(),
    className: "bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
  }, "Get Another Fact! \uD83C\uDFB2")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-sm text-gray-400 mt-4"
  }, "Click the button to discover more amazing facts!")));
};

/***/ }),

/***/ 7304:
/*!***************************************!*\
  !*** ./widgets/src/render-widget.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderWidget: () => (/* binding */ RenderWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_project_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/project-tab */ 8520);
/* harmony import */ var _components_account_tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/account-tab */ 398);
/* harmony import */ var _components_global_tab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/global-tab */ 5078);




function RenderWidget({
  app
}) {
  const queryParams = new URLSearchParams(window.location.search);
  const widgetId = queryParams.get("widgetId");
  if (!widgetId) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Widget not found");
  }
  switch (widgetId) {
    case "project-tab":
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_project_tab__WEBPACK_IMPORTED_MODULE_1__.ProjectTab, {
        app: app
      });
    case "account-tab":
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_account_tab__WEBPACK_IMPORTED_MODULE_2__.AccountsTab, {
        app: app
      });
    case "global-tab":
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_global_tab__WEBPACK_IMPORTED_MODULE_3__.GlobalTab, {
        app: app
      });
    default:
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Widget not found");
  }
}

/***/ }),

/***/ 8317:
/*!*******************************!*\
  !*** ./widgets/src/index.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ 5338);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ 3239);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App */ 8756);




const root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_App__WEBPACK_IMPORTED_MODULE_3__["default"], null)));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

/***/ }),

/***/ 8520:
/*!********************************************!*\
  !*** ./widgets/components/project-tab.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectTab: () => (/* binding */ ProjectTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ 7286);


const useGetRandomQuotes = app => {
  return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({
    queryKey: ["random-quotes"],
    queryFn: async () => {
      const resp = await app.data.invoke("getRandomQuotes");
      return resp?.response;
    }
  });
};
const useGetCurrentProject = app => {
  return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({
    queryKey: ["current-project"],
    queryFn: async () => {
      const resp = await app.data.get(app.data.dataIdentifiers.CURRENT_PROJECT);
      return resp?.response;
    }
  });
};
const ProjectTab = ({
  app
}) => {
  const {
    data,
    isLoading,
    isError
  } = useGetRandomQuotes(app);
  const {
    data: currentProject,
    isLoading: isCurrentProjectLoading,
    isError: isCurrentProjectError
  } = useGetCurrentProject(app);
  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading...");
  if (isError) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Error: ", isError.message);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col items-center justify-center h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "text-2xl font-bold text-blue-500 max-w-[600px] text-center"
  }, data.quote), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-sm text-gray-500"
  }, data.author), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text-sm text-gray-500"
  }, currentProject?.projectName));
};

/***/ }),

/***/ 8756:
/*!*****************************!*\
  !*** ./widgets/src/App.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wait_till_app_initialised__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wait-till-app-initialised */ 9058);
/* harmony import */ var _render_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render-widget */ 7304);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ 5490);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ 7665);




const queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClient();
function App() {
  const [app, setApp] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log("App", app);
  }, [app]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.QueryClientProvider, {
    client: queryClient
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wait_till_app_initialised__WEBPACK_IMPORTED_MODULE_1__.WaitTillAppInitialisedApp, {
    onLoaded: setApp,
    app: app
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_render_widget__WEBPACK_IMPORTED_MODULE_2__.RenderWidget, {
    app: app
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ 9058:
/*!***************************************************!*\
  !*** ./widgets/src/wait-till-app-initialised.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WaitTillAppInitialisedApp: () => (/* binding */ WaitTillAppInitialisedApp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function WaitTillAppInitialisedApp({
  onLoaded,
  children,
  app
}) {
  const [loaded, setLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log("Waiting for app to initialise", loaded, app);
    if (!app && !loaded) {
      console.log("Waiting for app to initialise", window.rliSdk);
      if (window.rliSdk && !loaded) {
        console.log("Initialising app", window.rliSdk);
        window.rliSdk.init({}).then(client => {
          // window.initialiseEventHandlers?.(client)
          console.log("Initialised app", client);
          client.data.get(client.data.dataIdentifiers.GET_USER_DATA).then(userData => {
            console.log("User data", userData);
            onLoaded(client);
            setLoaded(true);
          });
        });
      } else {
        console.log("App already initialised", loaded, window.rliSdk.isInitialized());
      }
    } else {
      console.log("App already initialised", loaded);
    }
  }, [app, onLoaded, loaded]);
  if (!loaded) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading...");
  }
  return children;
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__(7461), __webpack_exec__(8317)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.352368c6.js.map