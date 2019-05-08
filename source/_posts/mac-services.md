---
title: mac services
date: 2019-04-03 20:54:03
tags: [mac, services]
---

<https://www.maketecheasier.com/reveal-path-file-mac/>
<https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/MakeaSystem-WideService.html#//apple_ref/doc/uid/TP40016239-CH46-SW1>

<!--more-->

```sh
ls ~/Library/Services
```

```sh
/usr/local/bin/node /Users/Fred/.myshell/shanbay "$1"
# osascript -e "display notification \"$(cat /tmp/shanbay)\" with title \"$1\""
# osascript -e "tell app \"System Events\" to display dialog \"$1\n$(cat /tmp/shanbay)\""
```
