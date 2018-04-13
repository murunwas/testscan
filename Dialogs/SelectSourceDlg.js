var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var SelectSourceDlg = (function () {
            function SelectSourceDlg() {
                this.dialogUI = {
                    dialog: "#selectSourceDialog",
                    sourcesSelectElement: "#sources",
                    OkBtn: "#selectSourceDialog_Ok"
                };
                this.Init();
            }
            Object.defineProperty(SelectSourceDlg.prototype, "OkClick", {
                set: function (value) {
                    this._OkClick = value;
                },
                enumerable: true,
                configurable: true
            });
            SelectSourceDlg.prototype.Init = function () {
                $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
            };
            SelectSourceDlg.prototype.show = function (options) {
                $(this.dialogUI.sourcesSelectElement).html(options);
                $(this.dialogUI.dialog).modal();
            };
            SelectSourceDlg.prototype.OkBtn_Click = function (e) {
                if (this._OkClick != null)
                    this._OkClick($(this.dialogUI.sourcesSelectElement).val());
                $(this.dialogUI.dialog).modal("hide");
            };
            return SelectSourceDlg;
        }());
        Dialogs.SelectSourceDlg = SelectSourceDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
