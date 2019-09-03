---
title: SourceTree 更新密码
date: 2019-06-12 17:31:15
tags: [sourcetree, windows, git]
---

### windows

<kbd>Win</kbd> -> Credential Manager

<kbd>Win</kbd>+<kbd>E</kbd> -> %LocalAppData%/Atlassian/SourceTree -> passwd

SourceTree -> Tools -> Options -> Authentication

```shell
git config --global --list
git config          --list


# https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage
git config credential.helper cache
git config credential.helper store
git config credential.helper manager # windows
git config credential.helper osxkeychain # mac


git config --unset credential.helper


git remote set-url        origin https://yourname:password@github.com/user/repo.git
git remote set-url --push origin https://yourname:password@github.com/user/repo.git
git remote -v
```
