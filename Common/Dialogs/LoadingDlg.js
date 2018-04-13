var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var LoadingDlg = (function () {
            function LoadingDlg() {
                this.dialogUI = {
                    dialog: "#loadingDialog",
                    processTextLable: "#processText"
                };
            }
            LoadingDlg.prototype.show = function (processText) {
                $(this.dialogUI.processTextLable).text(processText);
                $(this.dialogUI.dialog).modal();
            };
            LoadingDlg.prototype.processing = function (processText) {
                $(this.dialogUI.processTextLable).text(processText);
            };
            LoadingDlg.prototype.hide = function () {
                $(this.dialogUI.dialog).modal("hide");
            };
            return LoadingDlg;
        }());
        Dialogs.LoadingDlg = LoadingDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
