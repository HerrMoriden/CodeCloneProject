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
var Duplication = /** @class */ (function () {
    function Duplication(id, lines, tokens, fileSource1, fileSource2, codefragment) {
        this.id = id;
        this.lines = lines;
        this.tokens = tokens;
        this.fileSource1 = fileSource1;
        this.fileSource2 = fileSource2;
        this.codefragment = codefragment;
    }
    return Duplication;
}());
var FileSource = /** @class */ (function () {
    function FileSource(path, line) {
        this.path = path;
        this.line = line;
    }
    return FileSource;
}());
var duplicationList = [];
$(function () {
    var input = document.getElementById('fileInput');
    input.addEventListener('change', function (event) {
        var file = event.target.files[0];
        handleThisShitPLs(file).then();
    });
    var classSelector = "btn btn-secondary btn-sm py-0 modal-open";
    document.addEventListener('click', function (e) {
        // these error shoudlnt be there cause the browser doesnt throw any error here ...
        // @ts-ignore
        if (e.target && e.target.className == classSelector) {
            // @ts-ignore
            var dupeId = e.target.dataset.id;
            // @ts-ignore
            console.log(e.target.dataset.id);
            putDataIntoModal(dupeId);
        }
    });
    $('#modal').on('hidden.bs.modal', function () {
        $('#modalTitle').empty();
        $('#codeFragmentElement').empty();
        console.log('cleaned modal up');
    });
});
function handleThisShitPLs(file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseFile(file)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function parseFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var reader;
        return __generator(this, function (_a) {
            reader = new FileReader();
            reader.onload = function (ev) {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = String(ev.target.result);
                                return [4 /*yield*/, parseFromStringToXml(result)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            };
            reader.readAsText(file);
            return [2 /*return*/];
        });
    });
}
function parseFromStringToXml(testString) {
    return __awaiter(this, void 0, void 0, function () {
        var parser, xmlDoc;
        return __generator(this, function (_a) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(testString, 'text/xml');
            addXMLToDom(xmlDoc);
            return [2 /*return*/];
        });
    });
}
function addXMLToDom(data) {
    var numOfDupes = data.getElementsByTagName('duplication').length;
    for (var i = 0; i < numOfDupes; i++) {
        duplicationList.push(new Duplication(i, data.getElementsByTagName('duplication')[i].getAttribute('lines'), data.getElementsByTagName('duplication')[i].getAttribute('tokens'), new FileSource(data.getElementsByTagName("duplication")[i].getElementsByTagName('file')[0].getAttribute('path'), data.getElementsByTagName("duplication")[i].getElementsByTagName('file')[0].getAttribute('line')), new FileSource(data.getElementsByTagName("duplication")[i].getElementsByTagName('file')[1].getAttribute('path'), data.getElementsByTagName("duplication")[i].getElementsByTagName('file')[1].getAttribute('line')), data.getElementsByTagName("duplication")[i].getElementsByTagName('codefragment')[0].childNodes[0].nodeValue));
    }
    makePrettyHtmlStuff(duplicationList);
}
function makePrettyHtmlStuff(dupeList) {
    var i = 0;
    var resDiv = $('#resultCont');
    var div;
    for (var _i = 0, dupeList_1 = dupeList; _i < dupeList_1.length; _i++) {
        var dupe = dupeList_1[_i];
        if (i % 4 == 0) {
            var newDiv = $("<div id=\"result" + i / 4 + "\" class=\"row\"></div>");
            resDiv.append(newDiv);
            div = $("#result" + i / 4);
        }
        i++;
        var htmlObj = $("\n        <div class=\"col-3\">\n            <div class=\"card border-success mb-3\">\n                <div class=\"card-header bg-transparent border-success\">\n                    <p>Duplication Num.: " + dupe.id + "</p>\n                    <p class=\"small\">Number of lines: " + dupe.lines + "</p>\n                    <p class=\"small\">Number of tokens: " + dupe.tokens + "</p>\n                </div>\n                \n                <div class=\"card-body text-secondary\">\n                \n                \n                    <h6 class=\"card-title mb-0\">FilePath 1: </h6>\n                    <button class=\"btn btn-secondary btn-sm py-0\" style=\"font-size: 0.8rem\" type=\"button\" role=\"button\"\n                     data-toggle=\"collapse\" data-target=\"#filePathOne" + dupe.id + "\">See Filepath</button>\n                    <div class=\"collapse\" id=\"filePathOne" + dupe.id + "\">\n                        <p class=\"small\">" + dupe.fileSource1.path + "</p>\n                    </div>                    \n                    \n                    <h6 class=\"card-title mb-0\">FilePath 2: </h6>\n                    <button class=\"btn btn-secondary btn-sm py-0\" style=\"font-size: 0.8rem\" type=\"button\" role=\"button\"\n                     data-toggle=\"collapse\" data-target=\"#filePathTwo" + dupe.id + "\">See Filepath</button>\n                    <div class=\"collapse\" id=\"filePathTwo" + dupe.id + "\">\n                        <p class=\"small\">" + dupe.fileSource2.path + "</p>\n                    </div>\n                    \n                    <h6 class=\"card-title mt-2 mb-0\">starting at line: </h6>\n                    <p class=\"small mt-0\">" + dupe.fileSource1.line + "</p>\n                    \n                    <button data-id=\"" + dupe.id + "\" class=\"btn btn-secondary btn-sm py-0 modal-open\" style=\"font-size: 0.8rem\" type=\"button\" role=\"button\"\n                     data-toggle=\"modal\" data-target=\"#modal\">See Codeclone\n                     </button>\n                </div>\n            </div>\n        </div>\n    ");
        div.append(htmlObj);
    }
    $('#littleSuccessMsg').append('Here are your CodeClones made pretty and seperated');
}
function putDataIntoModal(dupeId) {
    var modal = $('#modal');
    var modalTitle = $('#modalTitle');
    var codeFragmentElement = $('#codeFragmentElement');
    var duplication = duplicationList[dupeId];
    modalTitle.html('Duplication: #' + duplication.id);
    codeFragmentElement.append(duplication.codefragment);
    modal.show();
}
//# sourceMappingURL=script2.js.map