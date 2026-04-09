<#
.SYNOPSIS
    PowerShell Theme Stress Test
.DESCRIPTION
    Testing cmdlets, variables, and script blocks.
#>

# 1. Variables and Scopes
$Global:ThemeName = 'DeepRedBlue'
$private:counter = 0
$EnvironmentPaths = ${env:Path} -split ';'

# 2. Custom Classes (PowerShell 5+)
class DeveloperProfile {
  [int]$Id
  [string]$Username
  [datetime]$LastLogin

  DeveloperProfile([int]$id, [string]$name) {
    $this.Id = $id
    $this.Username = $name
    $this.LastLogin = Get-Date
  }

  [string] GetSummary() {
    return "User: $($this.Username) (ID: $($this.Id))"
  }
}

# 3. Cmdlets, Parameters, and Splatting
$Params = @{
  Path        = 'C:\Temp\Logs'
  Filter      = '*.log'
  ErrorAction = 'SilentlyContinue'
}

# Testing hyphenated cmdlets and parameters
Get-ChildItem @Params | ForEach-Object {
  Write-Host "Processing: $($_.Name)" -ForegroundColor Cyan
}

# 4. Logic, Comparison Operators, and Arrays
$StatusColors = @('#1a3a4a', '#5a1d1d')
$isActive = $true

if ($isActive -and $StatusColors.Count -gt 0) {
  try {
    # Testing backticks for line continuation
    Set-Content `
      -Path './output.txt' `
      -Value "Theme: $Global:ThemeName"
  }
  catch {
    Write-Error "Failed to write file: $($_.Exception.Message)"
  }
}

# 5. Strings and Interpolation
$SimpleString = 'Single quotes: No interpolation'
$DoubleString = "Double quotes: Counter is at $private:counter"
$MultiLine = @"
This is a Here-String.
It preserves whitespace and allows "quotes"
without escaping.
"@

# 6. Advanced Functions
function Test-Theme {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('Red', 'Blue')]
    [string]$Color
  )

  process {
    $result = switch ($Color) {
      'Red'  { '#5a1d1d' }
      'Blue' { '#1a3a4a' }
      Default { throw 'Invalid color' }
    }
    return $result
  }
}
