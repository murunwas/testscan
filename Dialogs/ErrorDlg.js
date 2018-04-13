var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var ErrorDlg = (function () {
            function ErrorDlg(isWindowsEnvironment) {
                this.dialogUI = {
                    dialog: "#errorDialog",
                    errorDetailsSpan: "#errorDetails",
                    downloadApplicationAnchorElement: "#downloadApplication",
                    troubleshootingGuideAnchor: "#troubleshootingGuide"
                };
                if (isWindowsEnvironment) {
                    $(this.dialogUI.downloadApplicationAnchorElement).attr("href", "Leadtools.WebScanning.Setup.msi");
                    if (lt.LTHelper.browser == lt.LTBrowser.edge) {
                        $(this.dialogUI.troubleshootingGuideAnchor).show();
                    }
                    $(this.dialogUI.errorDetailsSpan).text("Failed to reach Scanning Service. Please make sure that the Scan Application exe is running");
                }
                else {
                    $(this.dialogUI.downloadApplicationAnchorElement).attr("href", "ltwebscanning-20-0.noarch.rpm");
                    $(this.dialogUI.errorDetailsSpan).text("Failed to reach Scanning Application. Please make sure that the Java Scanning Application  is running");
                    $(this.dialogUI.troubleshootingGuideAnchor).show();
                }
            }
            ErrorDlg.prototype.show = function () {
                $(this.dialogUI.dialog).modal();
            };
            return ErrorDlg;
        }());
        Dialogs.ErrorDlg = ErrorDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
