---
title: ansible playbook
date: 2019-01-01 00:39:43
tags: [ansible, playbook]
---

* <https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html>
* <https://docs.ansible.com/ansible/latest/user_guide/intro_adhoc.html>

<!--more-->

```sh
tree ./

./
├── inventory
└── playbook.yml
0 directories, 2 files
```

inventory

```yaml
[webservers]

ip1

ip2

```

playbook.yml

```yaml
---
- hosts: webservers
  remote_user: fred
  tasks:
    - name: test connection
      ping:
      remote_user: fred

```

ansible-playbook

```sh
ansible-playbook -i inventory playbook.yml -f 10
```
