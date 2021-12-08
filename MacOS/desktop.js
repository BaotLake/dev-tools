app = Application.currentApplication()
app.includeStandardAdditions = true
value = app.doShellScript("defaults read com.apple.finder CreateDesktop")
map = {"true":"false", "false":"true"}
command = "defaults write com.apple.finder CreateDesktop " + map[value] + " && killall Finder"
app.doShellScript(command)
