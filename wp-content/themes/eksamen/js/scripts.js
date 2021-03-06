/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./src/scripts/modules/contact-modal.js":
/*!**********************************************!*\
  !*** ./src/scripts/modules/contact-modal.js ***!
  \**********************************************/
/***/ (() => {

// Contact modal
var contactToggleBtn = document.querySelectorAll('.contact-modal-toggle');
var contactModal = document.getElementById('contact-modal');
var closeModalBtn = document.getElementById('contact-close-modal');
var closeModalBtn2 = document.getElementById('contact-footer-close-modal'); // Contact modal toggle //

contactToggleBtn.forEach(function (btn) {
  btn.addEventListener('click', function () {
    contactModal.classList.toggle('active');
  });
}); // Hide modal //

function hideModal() {
  contactModal.classList.remove('active');
}

closeModalBtn.addEventListener('click', function () {
  hideModal();
});
closeModalBtn2.addEventListener('click', function () {
  hideModal();
});
document.addEventListener('click', function (event) {
  if (event.target === contactModal) {
    hideModal();
  }
});
document.addEventListener('keydown', function (event) {
  if (event.code === "Escape") {
    hideModal();
  }
});

/***/ }),

/***/ "./src/scripts/modules/enquiry-toggle.js":
/*!***********************************************!*\
  !*** ./src/scripts/modules/enquiry-toggle.js ***!
  \***********************************************/
/***/ (() => {

var enqToggleBtns = document.querySelectorAll('.enquiry-toggle');

if (enqToggleBtns) {
  enqToggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentNode.classList.toggle('active');
    });
  });
}

/***/ }),

/***/ "./src/scripts/modules/googleMap.js":
/*!******************************************!*\
  !*** ./src/scripts/modules/googleMap.js ***!
  \******************************************/
/***/ (() => {

// https://www.advancedcustomfields.com/resources/google-map/
function initMap($el) {
  // Find marker elements within map.
  var $markers = $el.find('.marker'); // Create gerenic map.

  var mapArgs = {
    zoom: $el.data('zoom') || 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map($el[0], mapArgs); // Add markers.

  map.markers = [];
  $markers.each(function () {
    initMarker(jQuery(this), map);
  }); // Center map based on markers.

  centerMap(map); // Return map instance.

  return map;
}

function initMarker($marker, map) {
  // Get position from marker.
  var lat = $marker.data('lat');
  var lng = $marker.data('lng');
  var latLng = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  }; // Create marker instance.

  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  }); // Append to reference for later use.

  map.markers.push(marker); // If marker contains HTML, add it to an infoWindow.

  if ($marker.html()) {
    // Create info window.
    var infowindow = new google.maps.InfoWindow({
      content: $marker.html()
    }); // Show info window when marker is clicked.

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });
  }
}

function centerMap(map) {
  // Create map boundaries from all map markers.
  var bounds = new google.maps.LatLngBounds();
  map.markers.forEach(function (marker) {
    bounds.extend({
      lat: marker.position.lat(),
      lng: marker.position.lng()
    });
  }); // Case: Single marker.

  if (map.markers.length == 1) {
    map.setCenter(bounds.getCenter()); // Case: Multiple markers.
  } else {
    map.fitBounds(bounds);
  }
} // Render maps on page load.


jQuery(document).ready(function () {
  jQuery('.acf-map').each(function () {
    var map = initMap(jQuery(this));
  });
});

/***/ }),

/***/ "./src/scripts/modules/login.js":
/*!**************************************!*\
  !*** ./src/scripts/modules/login.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _settings_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings/api */ "./src/scripts/settings/api.js");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/storage.js */ "./src/scripts/utils/storage.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Login with JWT authentication, then create a wordpress cookie


var loginForm = document.getElementById('login-form');
var username = document.getElementById('loginUsername');
var password = document.getElementById('loginPassword');
var errorMsgContainer = document.getElementById('lform_validation_errors');

var submitForm = function submitForm(event) {
  event.preventDefault();
  errorMsgContainer.innerHTML = '';
  var usernameValue = username.value.trim();
  var passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    errorMsgContainer.innerHTML = "<h2>Both username and password is required</h2>";
  }

  doLogin(usernameValue, passwordValue);
};

if (loginForm) {
  loginForm.addEventListener('submit', submitForm);
}

var sendUsername = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(theName) {
    var sendUrl, options;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sendUrl = _settings_api__WEBPACK_IMPORTED_MODULE_1__.baseUrl + '/wp-json/auth/v1/auth-user?username=' + theName;
            options = {
              method: 'POST',
              body: theName
            };
            _context.prev = 2;
            _context.next = 5;
            return fetch(sendUrl, options);

          case 5:
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](2);
            errorMsgContainer.innerHTML = "<h2>Error fetching data from server: ".concat(_context.t0, "</h2>");

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 7]]);
  }));

  return function sendUsername(_x) {
    return _ref.apply(this, arguments);
  };
}();

var doLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(username, password) {
    var url, data, options, response, json;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = _settings_api__WEBPACK_IMPORTED_MODULE_1__.baseUrl + '/wp-json/jwt-auth/v1/token';
            data = JSON.stringify({
              username: username,
              password: password
            });
            options = {
              method: 'POST',
              body: data,
              headers: {
                'Content-Type': 'application/json'
              }
            };
            _context2.prev = 3;
            _context2.next = 6;
            return fetch(url, options);

          case 6:
            response = _context2.sent;
            _context2.next = 9;
            return response.json();

          case 9:
            json = _context2.sent;

            if (json.user_display_name) {
              (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_2__.saveToken)(json.token);
              (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_2__.saveUser)(json.user_display_name);
              alert('Login successful.');
              sendUsername(json.user_nicename);
              setTimeout(function () {
                location.href = _settings_api__WEBPACK_IMPORTED_MODULE_1__.baseUrl + '/dashboard';
              }, 750);
            } else {
              errorMsgContainer.innerHTML = "<h2>Wrong username or password.</h2>";
            }

            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](3);
            errorMsgContainer.innerHTML = "<h2>Error fetching data from server: ".concat(_context2.t0, "</h2>");

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 13]]);
  }));

  return function doLogin(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/scripts/modules/mobile-menu.js":
/*!********************************************!*\
  !*** ./src/scripts/modules/mobile-menu.js ***!
  \********************************************/
/***/ (() => {

// Mobile header menu
var mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle');
var mobileMenu = document.querySelector('.header-nav__ul');
mobileMenuToggleBtn.addEventListener('click', function () {
  mobileMenu.classList.toggle('active');
});
document.addEventListener('keydown', function (event) {
  if (event.code === "Escape") {
    mobileMenu.classList.toggle('remove');
  }
});

/***/ }),

/***/ "./src/scripts/modules/renderDashboardAdmin.js":
/*!*****************************************************!*\
  !*** ./src/scripts/modules/renderDashboardAdmin.js ***!
  \*****************************************************/
/***/ (() => {

// Render admin dashboard
var adminNavMenu = document.getElementById('dashboard-links'); // Admin profile links

var enquiriesBtn = document.getElementById('enquiries-btn');
var newEstablishmentBtn = document.getElementById('new-establishment-btn'); // Contact links

var contactLinks = document.getElementById('contact-links');
var establishmentEnqBtn = document.getElementById('establishment-enq-btn');
var holidazeEnqBtn = document.getElementById('holidaze-enq-btn'); // Interfaces

var dashboardContent = document.getElementById('dashboard-content');
var newEstablishmentInterface = document.getElementById('new-establishment-interface');
var establishmentEnqInterface = document.getElementById('establishment-enquiries-interface');
var holidazeEnqInterface = document.getElementById('holidaze-enquiries-interface'); // Functions

function showContactLinks() {
  dashboardContent.classList.add('visually-hidden');
  enquiriesBtn.classList.add('active-dashboard-tablink');
  newEstablishmentBtn.classList.remove('active-dashboard-tablink');
  contactLinks.classList.remove('visually-hidden');
  establishmentEnqBtn.classList.remove('active-dashboard-tablink');
  holidazeEnqBtn.classList.remove('active-dashboard-tablink');
  newEstablishmentInterface.classList.add('visually-hidden');
}

function showNewEstablishmentInterface() {
  enquiriesBtn.classList.remove('active-dashboard-tablink');
  newEstablishmentBtn.classList.add('active-dashboard-tablink');
  contactLinks.classList.add('visually-hidden');
  newEstablishmentInterface.classList.remove('visually-hidden');
  establishmentEnqInterface.classList.add('visually-hidden');
  holidazeEnqInterface.classList.add('visually-hidden');
  dashboardContent.classList.remove('visually-hidden');
}

function showEstablishmentEnqInterface() {
  holidazeEnqBtn.classList.remove('active-dashboard-tablink');
  establishmentEnqBtn.classList.add('active-dashboard-tablink');
  newEstablishmentInterface.classList.add('visually-hidden');
  establishmentEnqInterface.classList.remove('visually-hidden');
  holidazeEnqInterface.classList.add('visually-hidden');
  dashboardContent.classList.remove('visually-hidden');
}

function showHolidazeEnqInterface() {
  establishmentEnqBtn.classList.remove('active-dashboard-tablink');
  holidazeEnqBtn.classList.add('active-dashboard-tablink');
  newEstablishmentInterface.classList.add('visually-hidden');
  establishmentEnqInterface.classList.add('visually-hidden');
  holidazeEnqInterface.classList.remove('visually-hidden');
  dashboardContent.classList.remove('visually-hidden');
} // Eventlisteners


if (enquiriesBtn) {
  enquiriesBtn.addEventListener('click', showContactLinks);
}

if (newEstablishmentBtn) {
  newEstablishmentBtn.addEventListener('click', showNewEstablishmentInterface);
}

if (establishmentEnqBtn) {
  establishmentEnqBtn.addEventListener('click', showEstablishmentEnqInterface);
}

if (holidazeEnqBtn) {
  holidazeEnqBtn.addEventListener('click', showHolidazeEnqInterface);
}

/***/ }),

/***/ "./src/scripts/modules/renderDashboardSubscriber.js":
/*!**********************************************************!*\
  !*** ./src/scripts/modules/renderDashboardSubscriber.js ***!
  \**********************************************************/
/***/ (() => {

// Render subscriber/normal user dashboard
var adminNavMenu = document.getElementById('dashboard-links'); // Admin profile links

var enquiriesBtn = document.getElementById('enquiries-btn'); // Contact links

var contactLinks = document.getElementById('contact-links');
var establishmentEnqBtn = document.getElementById('establishment-enq-btn');
var holidazeEnqBtn = document.getElementById('holidaze-enq-btn'); // Interfaces

var dashboardContent = document.getElementById('dashboard-content');
var establishmentEnqInterface = document.getElementById('establishment-enquiries-interface');
var holidazeEnqInterface = document.getElementById('holidaze-enquiries-interface'); // Functions

function showContactLinks() {
  dashboardContent.classList.add('visually-hidden');
  enquiriesBtn.classList.add('active-dashboard-tablink');
  contactLinks.classList.remove('visually-hidden');
  establishmentEnqBtn.classList.remove('active-dashboard-tablink');
  holidazeEnqBtn.classList.remove('active-dashboard-tablink');
  newEstablishmentInterface.classList.add('visually-hidden');
}

function showEstablishmentEnqInterface() {
  holidazeEnqBtn.classList.remove('active-dashboard-tablink');
  establishmentEnqBtn.classList.add('active-dashboard-tablink');
  establishmentEnqInterface.classList.remove('visually-hidden');
  holidazeEnqInterface.classList.add('visually-hidden');
  dashboardContent.classList.remove('visually-hidden');
}

function showHolidazeEnqInterface() {
  establishmentEnqBtn.classList.remove('active-dashboard-tablink');
  holidazeEnqBtn.classList.add('active-dashboard-tablink');
  establishmentEnqInterface.classList.add('visually-hidden');
  holidazeEnqInterface.classList.remove('visually-hidden');
  dashboardContent.classList.remove('visually-hidden');
} // Eventlisteners


if (enquiriesBtn) {
  enquiriesBtn.addEventListener('click', showContactLinks);
}

if (establishmentEnqBtn) {
  establishmentEnqBtn.addEventListener('click', showEstablishmentEnqInterface);
}

if (holidazeEnqBtn) {
  holidazeEnqBtn.addEventListener('click', showHolidazeEnqInterface);
}

/***/ }),

/***/ "./src/scripts/modules/search-modal.js":
/*!*********************************************!*\
  !*** ./src/scripts/modules/search-modal.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _settings_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings/api.js */ "./src/scripts/settings/api.js");


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Search modal

var searchToggleBtn = document.querySelectorAll('.search-modal-toggle');
var searchModal = document.getElementById('search-modal');
var searchInput = document.getElementById('search-bar');
var searchResults = document.getElementById('search-results');
var closeModalBtn = document.getElementById('search-close-modal');
var closeModalBtn2 = document.getElementById('search-footer-close-modal'); // Search modal toggle //

searchToggleBtn.forEach(function (btn) {
  btn.addEventListener('click', function () {
    searchModal.classList.toggle('active');
    searchInput.focus();
  });
}); // Hide modal //

function hideModal() {
  searchModal.classList.remove('active');
}

closeModalBtn.addEventListener('click', function () {
  hideModal();
});
closeModalBtn2.addEventListener('click', function () {
  hideModal();
});
document.addEventListener('click', function (event) {
  if (event.target === searchModal) {
    hideModal();
  }
});
document.addEventListener('keydown', function (event) {
  if (event.code === 'Escape') {
    hideModal();
  }
}); // Get search results

var hotelsPostTypeSearchUrl = _settings_api_js__WEBPACK_IMPORTED_MODULE_1__.baseUrl + '/wp-json/hotelSearch/v1/search?term=';
var THEME_DIR = MAIN.themedir;
var typingTimer;
searchInput.addEventListener('keyup', function (event) {
  clearTimeout(typingTimer);
  searchResults.innerHTML = "<li><img src=\"".concat(THEME_DIR, "/assets/svg/loading-search-results.svg\" alt=\"Loading search results\"></li>");
  typingTimer = setTimeout(function () {
    var searchBarValue = searchInput.value.trim().toLowerCase();
    getSearchResults(searchBarValue);
  }, 750);
});

function getSearchResults(_x) {
  return _getSearchResults.apply(this, arguments);
}

function _getSearchResults() {
  _getSearchResults = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(searchValue) {
    var searchPostTypes, _yield$Promise$all, _yield$Promise$all2, hotelSearch, hotelJson;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            searchPostTypes = hotelsPostTypeSearchUrl + searchValue;
            _context.next = 4;
            return Promise.all([fetch(searchPostTypes)]);

          case 4:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 1);
            hotelSearch = _yield$Promise$all2[0];
            _context.next = 9;
            return hotelSearch.json();

          case 9:
            hotelJson = _context.sent;
            renderSearchResults(hotelJson);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            searchResults.innerHTML = "\n    <li>\n      <p class=\"lead\">Error: ".concat(_context.t0, "</p>\n    </li>\n    ");

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));
  return _getSearchResults.apply(this, arguments);
}

function renderSearchResults(json) {
  searchResults.innerHTML = "\n  <li>\n    <p class=\"lead\">Search results:</p>\n  </li>\n  ";
  json.forEach(function (hotel) {
    var searchItem = document.createElement('li');
    searchItem.innerHTML = "\n    <li>\n      <div class=\"hotel-search-item\">\n        <a href=\"".concat(hotel.permalink, "\" title=\"").concat(hotel.title, "\">\n          <p>").concat(hotel.title, "</p>\n          ").concat(hotel.thumbnail, "\n        </a>\n      </div>\n    </li>\n    ");
    searchResults.appendChild(searchItem);
  });

  if (json.length === 0) {
    searchResults.innerHTML = "\n    <li>\n      <p class=\"no-results-found\">No hotels matched your search terms.</p>\n    </li>\n    ";
  } else {}
}

/***/ }),

/***/ "./src/scripts/scripts.js":
/*!********************************!*\
  !*** ./src/scripts/scripts.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_mobile_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/mobile-menu */ "./src/scripts/modules/mobile-menu.js");
/* harmony import */ var _modules_mobile_menu__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_mobile_menu__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_search_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/search-modal */ "./src/scripts/modules/search-modal.js");
/* harmony import */ var _modules_contact_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/contact-modal */ "./src/scripts/modules/contact-modal.js");
/* harmony import */ var _modules_contact_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_contact_modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_googleMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/googleMap */ "./src/scripts/modules/googleMap.js");
/* harmony import */ var _modules_googleMap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_googleMap__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/login */ "./src/scripts/modules/login.js");
/* harmony import */ var _modules_renderDashboardAdmin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/renderDashboardAdmin */ "./src/scripts/modules/renderDashboardAdmin.js");
/* harmony import */ var _modules_renderDashboardAdmin__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_renderDashboardAdmin__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_renderDashboardSubscriber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/renderDashboardSubscriber */ "./src/scripts/modules/renderDashboardSubscriber.js");
/* harmony import */ var _modules_renderDashboardSubscriber__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_renderDashboardSubscriber__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modules_enquiry_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/enquiry-toggle */ "./src/scripts/modules/enquiry-toggle.js");
/* harmony import */ var _modules_enquiry_toggle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_modules_enquiry_toggle__WEBPACK_IMPORTED_MODULE_7__);









/***/ }),

/***/ "./src/scripts/settings/api.js":
/*!*************************************!*\
  !*** ./src/scripts/settings/api.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseUrl": () => (/* binding */ baseUrl)
/* harmony export */ });
var baseUrl = MAIN.home_url;

/***/ }),

/***/ "./src/scripts/utils/storage.js":
/*!**************************************!*\
  !*** ./src/scripts/utils/storage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "saveToken": () => (/* binding */ saveToken),
/* harmony export */   "saveUser": () => (/* binding */ saveUser),
/* harmony export */   "getToken": () => (/* binding */ getToken),
/* harmony export */   "getUserName": () => (/* binding */ getUserName),
/* harmony export */   "clearUser": () => (/* binding */ clearUser)
/* harmony export */ });
// user
var tokenKey = 'token';
var userKey = 'user';

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  var value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
} //


function saveToken(token) {
  saveToStorage(tokenKey, token);
}
function saveUser(user) {
  saveToStorage(userKey, user);
}
function getToken() {
  return getFromStorage(tokenKey);
}
function getUserName() {
  var user = getFromStorage(userKey);

  if (user) {
    return user.username;
  }

  return null;
} // clear user

function clearUser() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

/***/ }),

/***/ "./src/styles/critical.scss":
/*!**********************************!*\
  !*** ./src/styles/critical.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/editor.scss":
/*!********************************!*\
  !*** ./src/styles/editor.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/wp-content/themes/eksamen/js/scripts": 0,
/******/ 			"wp-content/themes/eksamen/style": 0,
/******/ 			"wp-content/themes/eksamen/editor": 0,
/******/ 			"wp-content/themes/eksamen/critical": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwpsite_starter"] = self["webpackChunkwpsite_starter"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["wp-content/themes/eksamen/style","wp-content/themes/eksamen/editor","wp-content/themes/eksamen/critical"], () => (__webpack_require__("./src/scripts/scripts.js")))
/******/ 	__webpack_require__.O(undefined, ["wp-content/themes/eksamen/style","wp-content/themes/eksamen/editor","wp-content/themes/eksamen/critical"], () => (__webpack_require__("./src/styles/critical.scss")))
/******/ 	__webpack_require__.O(undefined, ["wp-content/themes/eksamen/style","wp-content/themes/eksamen/editor","wp-content/themes/eksamen/critical"], () => (__webpack_require__("./src/styles/editor.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["wp-content/themes/eksamen/style","wp-content/themes/eksamen/editor","wp-content/themes/eksamen/critical"], () => (__webpack_require__("./src/styles/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=scripts.js.map