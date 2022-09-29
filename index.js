"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var _ = require("lodash");
var TailoringForCategoriesEnum_1 = require("./models/TailoringForCategoriesEnum");
var read_helpers_1 = require("./read-helpers");
var N_TOTAL = 12;
var N_MAX_STATE = 5;
var N_RANDOM_STATE = _.random(0, N_MAX_STATE);
var N_MIN_CUSTOM_TAILORING = 4;
var N_RANDOM_TAILORING = _.random(N_MIN_CUSTOM_TAILORING, N_TOTAL);
function pickCharities(charities, profile, customTailoring) {
    var stateFilteredCharities = calculateState(charities, profile);
    var nationalFilteredCharities = calculateNational(charities);
    var filteredCharities = __spreadArray(__spreadArray([], nationalFilteredCharities, true), stateFilteredCharities, true);
    // For part II 
    // (if you passed 'true' in the command line as an argument for customTailoring)
    var customTailoredCharities = [];
    if (customTailoring) {
        customTailoredCharities = filterTailoredCharities(filteredCharities, profile);
    }
    // END of for part II
    filteredCharities = _(filteredCharities)
        .shuffle() // loDash .shuffle() uses Fisher-Yates method
        .take(customTailoring ? N_TOTAL - N_RANDOM_TAILORING : N_TOTAL)
        .concat(customTailoredCharities)
        .shuffle()
        .value();
    return formatCharities(filteredCharities);
}
function calculateState(charities, profile) {
    return _(charities)
        .shuffle()
        .filter(function (c) { return c.featured == 'STATE' && c.state == profile.state; })
        .take(N_RANDOM_STATE)
        .value();
}
function calculateNational(charities) {
    return _(charities)
        .shuffle()
        .filter(function (c) { return c.featured === 'NATIONAL'; })
        .value();
}
function formatCharities(charitiyJson) {
    var formattedJson = [];
    charitiyJson.forEach(function (charity) {
        var formattedCharity = "".concat(charity.id, ", ").concat(charity.name, ", ").concat(charity.state, ", ").concat(charity.category, ", ").concat(charity.featured);
        formattedJson.push(formattedCharity);
    });
    return formattedJson;
}
function filterTailoredCharities(charities, profile) {
    _.forIn(TailoringForCategoriesEnum_1.TailoringForCategoriesEnum, function (value, key) {
        if (profile[key] && TailoringForCategoriesEnum_1.TailoringForCategoriesEnum[key]) {
            charities = _(charities).filter(function (c) { return c.category == TailoringForCategoriesEnum_1.TailoringForCategoriesEnum[key]; }).shuffle().take(N_RANDOM_TAILORING).value();
        }
        else {
            charities = [];
            N_RANDOM_TAILORING = 0;
        }
    });
    return charities;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, charitiesPath, profilePath, customTailoring, charitiesData, profileData, customTailoringData, charities, profile, charitiesToFeature;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = process.argv, charitiesPath = _a[2], profilePath = _a[3], customTailoring = _a[4];
                    return [4 /*yield*/, (0, read_helpers_1.readCharities)(charitiesPath)];
                case 1:
                    charitiesData = _b.sent();
                    return [4 /*yield*/, (0, read_helpers_1.readProfile)(profilePath)];
                case 2:
                    profileData = _b.sent();
                    customTailoringData = customTailoring === 'true';
                    charities = charitiesData.map(function (data) {
                        return {
                            name: data.name,
                            id: data.id,
                            state: data.state,
                            category: data.category,
                            featured: data.featured
                        };
                    });
                    profile = {
                        name: profileData.name,
                        id: profileData.id,
                        state: profileData.state,
                        isMarried: profileData.isMarried,
                        hasChildren: profileData.hasChildren,
                        hasPets: profileData.hasPets,
                        age: profileData.age
                    };
                    charitiesToFeature = pickCharities(charities, profile, customTailoringData);
                    console.dir(charitiesToFeature);
                    return [2 /*return*/];
            }
        });
    });
}
main();
