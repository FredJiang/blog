---
title: print remote disk information
date: 2017-06-21 07:46:36
tags: [awk, df, ssh, sshpass]
---



```
                      ssh user@host "df -h | grep '/dev/' | awk 'BEGIN {printf(\"|%15s |%15s |%15s |%15s |%15s |%15s |\n\",\"Filesystem\",\"Size\",\"Used\",\"Avail\",\"Use\",\"% Mounted on\"); printf(\"|%15s |%15s |%15s |%15s |%15s |%15s |\n\",\"---\",\"---\",\"---\",\"---\",\"---\",\"---\")} {printf(\"|%15s |%15s |%15s |%15s |%15s |%15s |\n\",\$1,\$2,\$3,\$4,\$5,\$6)}'"
# or
sshpass -p 'password' ssh user@host "df -h | grep '/dev/' | awk 'BEGIN {printf(\"|%15s |%15s |%15s |%15s |%15s |%15s |\n\",\"Filesystem\",\"Size\",\"Used\",\"Avail\",\"Use\",\"% Mounted on\"); printf(\"|%15s |%15s |%15s |%15s |%15s |%15s |\n\",\"---\",\"---\",\"---\",\"---\",\"---\",\"---\")} {printf(\"|%15s |%15s |%15s |%15s |%15s |%15s |\n\",\$1,\$2,\$3,\$4,\$5,\$6)}'"
```

result

```
|     Filesystem |           Size |           Used |          Avail |            Use |   % Mounted on |
|            --- |            --- |            --- |            --- |            --- |            --- |
|      /dev/sda1 |            30G |            27G |           1.3G |            96% |              / |
|      /dev/sdc1 |            50G |            24G |            24G |            51% |       /newdata |
|      /dev/sdb1 |           133G |           1.8G |           125G |             2% |           /mnt |
```