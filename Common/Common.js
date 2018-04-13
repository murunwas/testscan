var HTML5Demos;
(function (HTML5Demos) {
    var PingResponse = (function () {
        function PingResponse() {
        }
        return PingResponse;
    }());
    HTML5Demos.PingResponse = PingResponse;
    var ServiceHelper = (function () {
        function ServiceHelper() {
        }
        ServiceHelper.init = function () {
            ServiceHelper._serviceUri = ServiceHelper.buildServiceUrl();
        };
        Object.defineProperty(ServiceHelper, "serviceHost", {
            get: function () { return ServiceHelper._serviceHost; },
            set: function (value) {
                ServiceHelper._serviceHost = value;
                ServiceHelper._serviceUri = ServiceHelper.buildServiceUrl();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceHelper, "servicePath", {
            get: function () { return ServiceHelper._servicePath; },
            set: function (value) {
                ServiceHelper._servicePath = value;
                ServiceHelper._serviceUri = ServiceHelper.buildServiceUrl();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceHelper, "serviceApiPath", {
            get: function () { return ServiceHelper._serviceApiPath; },
            set: function (value) {
                ServiceHelper._serviceApiPath = value;
                ServiceHelper._serviceUri = ServiceHelper.buildServiceUrl();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceHelper, "serviceUri", {
            get: function () { return ServiceHelper._serviceUri; },
            enumerable: true,
            configurable: true
        });
        ServiceHelper.buildServiceUrl = function () {
            var serviceUri = null;
            var location = window.location;
            var serviceHost = ServiceHelper._serviceHost;
            var servicePath = ServiceHelper._servicePath;
            var serviceApiPath = ServiceHelper._serviceApiPath;
            if (serviceHost == null)
                serviceUri = location.protocol + "//" + location.host;
            else
                serviceUri = serviceHost;
            if (servicePath == null) {
                var pathname = location.pathname;
                var dotIndex = pathname.indexOf(".");
                if (dotIndex > -1) {
                    var lastSlashIndex = pathname.lastIndexOf("/");
                    if (lastSlashIndex > -1)
                        pathname = pathname.substring(0, lastSlashIndex);
                }
                serviceUri += ServiceHelper.clean(pathname);
            }
            else {
                serviceUri += ServiceHelper.clean(servicePath);
            }
            if (serviceApiPath != null && serviceApiPath.length > 0)
                serviceUri += ServiceHelper.clean(serviceApiPath);
            return serviceUri;
        };
        ServiceHelper.clean = function (value) {
            var length = value.length;
            if (value.charAt(0) !== "/") {
                value = "/" + value;
                length += 1;
            }
            if (value.charAt(length - 1) === "/")
                value = value.substring(0, length - 1);
            return value;
        };
        Object.defineProperty(ServiceHelper, "serviceTestResource", {
            get: function () { return ServiceHelper._serviceTestResource; },
            set: function (value) {
                ServiceHelper._serviceTestResource = value;
            },
            enumerable: true,
            configurable: true
        });
        ServiceHelper.verifyService = function () {
            var serviceUrl = [ServiceHelper.serviceUri, ServiceHelper.serviceTestResource].join("/");
            var d = $.Deferred();
            return $.get(serviceUrl);
        };
        ServiceHelper.addParamsToUrl = function (url, params) {
            url += "?";
            var keys = Object.keys(params);
            keys.forEach(function (key, idx) {
                url += key + "=" + params[key];
                if (idx != keys.length - 1) {
                    url += "&";
                }
            });
            return url;
        };
        ServiceHelper._serviceHost = null;
        ServiceHelper._servicePath = null;
        ServiceHelper._serviceApiPath = null;
        ServiceHelper._serviceUri = null;
        ServiceHelper._serviceTestResource = "Test/Ping";
        return ServiceHelper;
    }());
    HTML5Demos.ServiceHelper = ServiceHelper;
    var DemoInteractiveMode = (function () {
        function DemoInteractiveMode(mode, reset) {
            this.resetToPanZoom = reset;
            this.interactiveMode = mode;
        }
        return DemoInteractiveMode;
    }());
    HTML5Demos.DemoInteractiveMode = DemoInteractiveMode;
    var ImageInfo = (function () {
        function ImageInfo() {
        }
        return ImageInfo;
    }());
    HTML5Demos.ImageInfo = ImageInfo;
    var DemoImage = (function () {
        function DemoImage(url, useDpi, dpi, isLoadedImageBitonal) {
            this.url = url;
            this.useDpi = useDpi;
            this.dpi = dpi;
            this.isLoadedImageBitonal = isLoadedImageBitonal;
        }
        return DemoImage;
    }());
    HTML5Demos.DemoImage = DemoImage;
    var CommonApp = (function () {
        function CommonApp() {
            var _this = this;
            this._useService = true;
            this._imageLoadedFromService = false;
            this._interactiveModes = [];
            this.commonUI = {
                openBtn: "#openFile",
                panZoomBtn: "#panZoom",
                interactiveModesBtns: ".interactiveModesBtns",
                fitBtn: "#fit", actualSizeBtn: "#actualSize",
                zoomInBtn: "#zoomIn", zoomOutBtn: "#zoomOut",
                aboutBtn: "#about"
            };
            this.verifyServicePromise = null;
            window.onresize = (function (e) { return _this.onResize(e); });
            window.onunload = function (e) {
                _this.dispose();
                _this.unload();
            };
        }
        Object.defineProperty(CommonApp.prototype, "imageViewerControl", {
            get: function () {
                return this._viewer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonApp.prototype, "isLoadedImageBitonal", {
            get: function () {
                return this._isLoadedImageBitonal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonApp.prototype, "currentImageUrl", {
            get: function () {
                return this._currentImageUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonApp.prototype, "imageLoadedFromService", {
            get: function () {
                return this._imageLoadedFromService;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonApp.prototype, "interactiveModes", {
            get: function () {
                return this._interactiveModes;
            },
            enumerable: true,
            configurable: true
        });
        CommonApp.prototype.onResize = function (e) {
            HTML5Demos.Utils.DemoHelper.resetSidebars();
        };
        CommonApp.prototype.dispose = function () {
            if (this._viewer)
                this._viewer.dispose();
        };
        Object.defineProperty(CommonApp.prototype, "demoImages", {
            get: function () { return; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonApp.prototype, "customDemoInteractiveMode", {
            get: function () { return; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommonApp.prototype, "demoName", {
            get: function () { return; },
            enumerable: true,
            configurable: true
        });
        CommonApp.prototype.viewer_ItemChangedCustomAction = function (sender, e) { };
        CommonApp.prototype.unload = function () { };
        CommonApp.runDemo = function (page) {
            if (!lt.LTHelper.supportsCanvas || (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && lt.LTHelper.device != lt.LTDevice.desktop && lt.LTHelper.version <= 9)) {
                window.location.replace("../Resources/NoHTML5Support.html");
                return;
            }
            page.run();
        };
        CommonApp.prototype.run = function () {
            this._demoImages = this.demoImages;
            this.initUI();
            this.createViewer();
            this.initInteractiveModes();
            this.verifyService();
        };
        CommonApp.prototype.verifyService = function () {
            var _this = this;
            this.beginOperation("Verifying Service Connection...");
            $.getJSON("../serviceConfig.json")
                .done(function (json) {
                lt.LTHelper.licenseDirectory = json["licenseDirectory"];
                _this.initService(json);
            })
                .fail(function () {
                lt.LTHelper.licenseDirectory = "../LEADTOOLS";
                _this.initService(null);
            })
                .always(function () {
                _this.verifyServicePromise = ServiceHelper.verifyService();
                _this.verifyServicePromise.done(function (response) {
                    if (!response.isLicenseChecked) {
                        window.alert("Warning!\n\nThe LEADTOOLS License used in the service could not be found. This demo may not function as expected.");
                    }
                    else if (response.isLicenseExpired) {
                        window.alert("Warning!\n\nThe LEADTOOLS Kernel has expired. This demo may not function as expected.");
                    }
                    if (response.kernelType != null && response.kernelType != "Release") {
                        (window.console && console.log && console.log("Server LEADTOOLS Kernel type: " + response.kernelType));
                    }
                    if (_this.demoImages != null && _this.demoImages.length > 0)
                        _this.selectNewImage(0);
                });
                _this.verifyServicePromise.fail(function (xhr, statusText, errorThrown) {
                    _this.endOperation(false);
                    window.alert("The LEADTOOLS Service could not be reached - Check your service path.");
                });
            });
        };
        CommonApp.prototype.initService = function (json) {
            ServiceHelper.init();
            ServiceHelper.serviceHost = (json && json["serviceHost"]) ? json["serviceHost"] : null;
            ServiceHelper.servicePath = (json && json["servicePath"]) ? json["servicePath"] : null;
            ServiceHelper.serviceApiPath = (json && json["serviceApiPath"]) ? json["serviceApiPath"] : "../../api";
        };
        CommonApp.prototype.initUI = function () {
            $(this.commonUI.openBtn).bind("click", $.proxy(this.openBtn_Click, this));
            $(this.commonUI.interactiveModesBtns).bind("click", $.proxy(this.interactiveModesBtns_BtnClicked, this));
            $(this.commonUI.fitBtn).bind("click", $.proxy(this.fitBtn_Click, this));
            $(this.commonUI.actualSizeBtn).bind("click", $.proxy(this.actualSizeBtn_Click, this));
            $(this.commonUI.zoomInBtn).bind("click", $.proxy(this.zoomInBtn_Click, this));
            $(this.commonUI.zoomOutBtn).bind("click", $.proxy(this.zoomOutBtn_Click, this));
            $(this.commonUI.aboutBtn).bind("click", $.proxy(this.aboutBtn_Click, this));
            if (HTML5Demos.Utils.DemoHelper.isTouchDevice()) {
                $(".headerToolbarDiv").css("overflow", "hidden");
                var headerToolbarDiv = document.getElementsByClassName('headerToolbarDiv').item(0);
                HTML5Demos.Utils.DemoHelper.touchScroll(headerToolbarDiv);
            }
            this.InitDialogs();
        };
        CommonApp.prototype.InitDialogs = function () {
            var _this = this;
            this._openFileDlg = new HTML5Demos.Dialogs.OpenFileDlg();
            this._openFileDlg.goClick = (function (url) { return _this.openFileDlg_GoClick(url); });
            this._openFileDlg.fileSelect = (function (selectedIndex) { return _this.openFileDlg_FileSelect(selectedIndex); });
            this._loadingDlg = new HTML5Demos.Dialogs.LoadingDlg();
            this._aboutDlg = new HTML5Demos.Dialogs.AboutDlg(this.demoName);
        };
        CommonApp.prototype.createViewer = function () {
            var _this = this;
            lt.Controls.ImageViewer.imageProcessingLibrariesPath = "../Common/Libs";
            var createOptions = new lt.Controls.ImageViewerCreateOptions(document.getElementById("imageViewerDiv"));
            this._viewer = new lt.Controls.ImageViewer(createOptions);
            this._viewer.autoCreateCanvas = true;
            this._viewer.itemError.add(function (sender, e) { return _this.viewer_ItemError(sender, e); });
            this._viewer.itemChanged.add(function (sender, e) { return _this.viewer_ItemChanged(sender, e); });
            this._viewer.viewHorizontalAlignment = lt.Controls.ControlAlignment.center;
            this._viewer.viewVerticalAlignment = lt.Controls.ControlAlignment.center;
            this._viewer.autoResetOptions = lt.Controls.ImageViewerAutoResetOptions.all;
            if (lt.LTHelper.OS == lt.LTOS.android)
                this._viewer.enableRequestAnimationFrame = true;
            if (lt.LTHelper.msPointerEnabled && !lt.LTHelper.supportsMouse)
                this._viewer.scrollMode = lt.Controls.ControlScrollMode.hidden;
        };
        CommonApp.prototype.viewer_ItemError = function (sender, e) {
            window.alert("Cannot open: " + this._tempUrl);
            this.endOperation(false);
        };
        CommonApp.prototype.viewer_ItemChanged = function (sender, e) {
            if (e.reason == lt.Controls.ImageViewerItemChangedReason.url) {
                this.endOperation(true);
                this.viewer_ItemChangedCustomAction(sender, e);
            }
        };
        CommonApp.prototype.initInteractiveModes = function () {
            var _this = this;
            this._interactiveModes = [];
            var customMode = this.customDemoInteractiveMode;
            if (customMode != null) {
                this._interactiveModes.push(customMode);
            }
            var panZoom = new lt.Controls.ImageViewerPanZoomInteractiveMode();
            panZoom.doubleTapSizeMode = lt.Controls.ControlSizeMode.none;
            var inertiaScrollOptions = panZoom.inertiaScrollOptions;
            inertiaScrollOptions.isEnabled = true;
            panZoom.inertiaScrollOptions = inertiaScrollOptions;
            this._interactiveModes.push(new DemoInteractiveMode(panZoom, false));
            if (!this._viewer.useElements) {
                this._interactiveModes.push(new DemoInteractiveMode(new lt.Controls.ImageViewerMagnifyGlassInteractiveMode(), false));
            }
            var workCompleted = function () {
                HTML5Demos.Utils.DemoHelper.checked($(_this.commonUI.interactiveModesBtns), false);
                HTML5Demos.Utils.DemoHelper.checked($(_this.commonUI.panZoomBtn), true);
                _this._viewer.defaultInteractiveMode = _this._interactiveModes[parseInt($(_this.commonUI.panZoomBtn).val())].interactiveMode;
            };
            for (var i = 0; i < this._interactiveModes.length; i++) {
                var mode = this._interactiveModes[i];
                var interactiveMode = mode.interactiveMode;
                if (interactiveMode != null) {
                    interactiveMode.idleCursor = "crosshair";
                    if (interactiveMode.name == "PanZoom")
                        interactiveMode.workingCursor = "move";
                    else
                        interactiveMode.workingCursor = "crosshair";
                    interactiveMode.workOnBounds = true;
                    if (mode.resetToPanZoom)
                        interactiveMode.add_workCompleted(workCompleted);
                }
            }
            this._viewer.defaultInteractiveMode = this._interactiveModes[0].interactiveMode;
        };
        CommonApp.prototype.destroyViewer = function () {
            if (!this._viewer)
                throw "viewer does not exist - viewer must be created first";
            this._viewer.dispose();
            this._viewer = null;
        };
        CommonApp.prototype.recreateViewer = function (elementsMode) {
            var _this = this;
            if (this._viewer)
                throw "viewer exists - must dispose of old viewer first";
            if (elementsMode) {
                var createOptions = new lt.Controls.ImageViewerCreateOptions(document.getElementById("imageViewerDiv"));
                createOptions.useElements = true;
                this._viewer = new lt.Controls.ImageViewer(createOptions);
                this._viewer.itemError.add(function (sender, e) { return _this.viewer_ItemError(sender, e); });
                this._viewer.itemChanged.add(function (sender, e) { return _this.viewer_ItemChanged(sender, e); });
                this._viewer.viewHorizontalAlignment = lt.Controls.ControlAlignment.center;
                this._viewer.viewVerticalAlignment = lt.Controls.ControlAlignment.center;
                this._viewer.autoResetOptions = lt.Controls.ImageViewerAutoResetOptions.all;
                if (lt.LTHelper.msPointerEnabled && !lt.LTHelper.supportsMouse)
                    this._viewer.scrollMode = lt.Controls.ControlScrollMode.hidden;
            }
            else {
                this.createViewer();
            }
            this.initInteractiveModes();
        };
        CommonApp.prototype.beforeSelectNewImage = function (index) {
            return true;
        };
        CommonApp.prototype.selectNewImage = function (index) {
            this._imageLoadedFromService = true;
            var demoImage = this._demoImages[index];
            var newImageUrl = "Resources/Images/" + demoImage.url;
            var location = window.location.href;
            var index = location.lastIndexOf("/");
            this._tempUrl = "";
            this._tempUrl = location.substring(0, index + 1) + newImageUrl;
            if (newImageUrl == this._viewer.imageUrl)
                return;
            this.beginOperation("Please Wait... Loading New Image");
            if (demoImage.useDpi)
                this._imageDPI = demoImage.dpi;
            else
                this._imageDPI = 0;
            this._isLoadedImageBitonal = demoImage.isLoadedImageBitonal;
            this._viewer.beginUpdate();
            this._viewer.imageUrl = newImageUrl;
            this._viewer.endUpdate();
        };
        CommonApp.prototype.loadImageFromURL = function (url, useService) {
            var _this = this;
            this.beginOperation("Please Wait... Loading New Image");
            this._imageDPI = 0;
            this._isLoadedImageBitonal = false;
            this._imageLoadedFromService = useService;
            if (useService) {
                var rest = [ServiceHelper.serviceUri, "Raster", "Info"].join("/");
                var params = {
                    uri: url
                };
                $.get(rest, params)
                    .done(function (info) {
                    if (info.formatId == 0) {
                        window.alert("Unrecognized image file format.");
                        return;
                    }
                    _this._imageDPI = info.xResolution;
                    _this._isLoadedImageBitonal = (info.bitsPerPixel == 1);
                    var width = 0;
                    var height = 0;
                    if (lt.LTHelper.device == lt.LTDevice.mobile || lt.LTHelper.device == lt.LTDevice.tablet) {
                        width = 1000;
                        height = 1000;
                        _this._imageDPI = 0;
                    }
                    var imageRest = [ServiceHelper.serviceUri, "Raster", "Load"].join("/");
                    var imageParams = {
                        uri: url
                    };
                    if (width != 0 && height != 0) {
                        imageParams["width"] = width;
                        imageParams["height"] = height;
                    }
                    imageRest = ServiceHelper.addParamsToUrl(imageRest, imageParams);
                    _this._tempUrl = url;
                    _this._viewer.imageUrl = imageRest;
                })
                    .fail(function (xhr, statusText, errorThrown) {
                    _this.endOperation(false);
                    HTML5Demos.Utils.DemoHelper.showRequestError(xhr, statusText, errorThrown);
                });
            }
            else {
                this._tempUrl = url;
                this._viewer.imageUrl = url;
            }
        };
        CommonApp.prototype.beginOperation = function (processText) {
            this._loadingDlg.show(processText);
        };
        CommonApp.prototype.endOperation = function (imageChanged) {
            this._loadingDlg.hide();
            if (imageChanged) {
                this._currentImageUrl = this._tempUrl;
                this._viewer.beginUpdate();
                var resolution = lt.LeadSizeD.create(this._imageDPI == 0 ? 96 : this._imageDPI, this._imageDPI == 0 ? 96 : this._imageDPI);
                this._viewer.imageResolution = resolution;
                this._viewer.useDpi = (this._imageDPI != 0);
                if (lt.LTHelper.device == lt.LTDevice.mobile || lt.LTHelper.device == lt.LTDevice.tablet) {
                    this._viewer.zoom(lt.Controls.ControlSizeMode.fitWidth, 1, this._viewer.defaultZoomOrigin);
                }
                this._viewer.endUpdate();
            }
            this._tempUrl = null;
        };
        CommonApp.prototype.openBtn_Click = function (e) {
            this._openFileDlg.show();
        };
        CommonApp.prototype.interactiveModesBtns_BtnClicked = function (e) {
            HTML5Demos.Utils.DemoHelper.checked($(this.commonUI.interactiveModesBtns), false);
            HTML5Demos.Utils.DemoHelper.checked($(e.currentTarget), true);
            var modeIndex = parseInt($(e.currentTarget).val());
            this._viewer.defaultInteractiveMode = this._interactiveModes[modeIndex].interactiveMode;
        };
        CommonApp.prototype.fitBtn_Click = function (e) {
            this._viewer.zoom(lt.Controls.ControlSizeMode.fitAlways, 1.0, this._viewer.defaultZoomOrigin);
            this._viewer.scrollOffset = lt.LeadPointD.create(0, 0);
        };
        CommonApp.prototype.actualSizeBtn_Click = function (e) {
            this._viewer.zoom(lt.Controls.ControlSizeMode.actualSize, 1.0, this._viewer.defaultZoomOrigin);
            this._viewer.scrollOffset = lt.LeadPointD.create(0, 0);
        };
        CommonApp.prototype.zoomInBtn_Click = function (e) {
            var newScaleFactor = this._viewer.scaleFactor + 0.1;
            if (newScaleFactor <= this._viewer.maximumScaleFactor) {
                this._viewer.zoom(lt.Controls.ControlSizeMode.none, newScaleFactor, this._viewer.defaultZoomOrigin);
            }
        };
        CommonApp.prototype.zoomOutBtn_Click = function (e) {
            var newScaleFactor = this._viewer.scaleFactor - 0.1;
            if (newScaleFactor >= this._viewer.minimumScaleFactor) {
                this._viewer.zoom(lt.Controls.ControlSizeMode.none, newScaleFactor, this._viewer.defaultZoomOrigin);
            }
        };
        CommonApp.prototype.aboutBtn_Click = function (e) {
            this._aboutDlg.show();
        };
        CommonApp.prototype.openFileDlg_FileSelect = function (selectedIndex) {
            if (this.beforeSelectNewImage(selectedIndex)) {
                this.selectNewImage(selectedIndex);
            }
        };
        CommonApp.prototype.openFileDlg_GoClick = function (url) {
            if (url != null && url.length > 0) {
                this.loadImageFromURL(url, this._useService);
            }
        };
        return CommonApp;
    }());
    HTML5Demos.CommonApp = CommonApp;
})(HTML5Demos || (HTML5Demos = {}));
