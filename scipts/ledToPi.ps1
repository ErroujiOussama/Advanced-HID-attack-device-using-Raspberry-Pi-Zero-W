Function Get-LED-Sequence($strChr) {
  $chr = switch ($strChr) { 
    'a' { $sendChrs = 1,1,1 }
    'b' { $sendChrs = 1,1,2 }
    'c' { $sendChrs = 1,1,3 }
    'd' { $sendChrs = 1,2,1 }
    'e' { $sendChrs = 1,2,2 }
    'f' { $sendChrs = 1,2,3 }
    'g' { $sendChrs = 1,3,1 }
    'h' { $sendChrs = 1,3,2 }
    'i' { $sendChrs = 1,3,3 }
    'j' { $sendChrs = 2,1,1 }
    'k' { $sendChrs = 2,1,2 }
    'l' { $sendChrs = 2,1,3 }
    'm' { $sendChrs = 2,2,1 }
    'n' { $sendChrs = 2,2,2 }
    'o' { $sendChrs = 2,2,3 }
    'p' { $sendChrs = 2,3,1 }
    'q' { $sendChrs = 2,3,2 }
    'r' { $sendChrs = 2,3,3 }
    's' { $sendChrs = 3,1,1 }
    't' { $sendChrs = 3,1,2 }
    'u' { $sendChrs = 3,1,3 }
    'v' { $sendChrs = 3,2,1 }
    'w' { $sendChrs = 3,2,2 }
    'x' { $sendChrs = 3,2,3 }
    'y' { $sendChrs = 3,3,1 }
    'z' { $sendChrs = 3,3,2 }
    ' ' { $sendChrs = 3,3,3 }
    default { $sendChrs = $null; '' }
  }
  if ($sendChrs -ne $null) {
    Send-LED-Keys($sendChrs)
  }

  return $chr
}

Function Send-LED-Keys($sendChrs) {
  $keyBoardObject = New-Object -ComObject WScript.Shell
  foreach ($chr in $sendChrs) {
    Start-Sleep -Milliseconds 10
    switch ($chr) {
      1 { Write-Output 'PRINT CAPSLOCK'; $keyBoardObject.SendKeys('{CAPSLOCK}') }
      2 { Write-Output 'PRINT NUMLOCK'; $keyBoardObject.SendKeys('{NUMLOCK}') }
      3 { Write-Output 'PRINT SCROLLLOCK'; $keyBoardObject.SendKeys('{SCROLLLOCK}') }
    }
  }
}

$LogFilePath = [Environment]::GetFolderPath('Desktop')+'\testing-log.txt'
[Array] $logFileArr = Get-Content $LogFilePath
# This delay ensures that there's enough time for the JavaScript portion to be initialized before PS emits LED changes
Start-Sleep -Milliseconds 3000
Foreach($logLine in $logFileArr) {
    Foreach($logChar in $logLine.ToCharArray()) {
      Get-LED-Sequence($logChar)
    }
}