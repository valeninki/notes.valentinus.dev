Greetings, when I enter Proxmox all of a sudden I can't log in when I enter my password, I would like to share with you the solution to this problem.

![[content/notes/Images/Pasted image 20241211235508.png]]

---

Connect to your server with ssh and paste them respectively, then log in again and it will be fixed.

```bash
root@pve1 ~# pvecm expected 1
root@pve1 ~# pvecm updatecerts
root@pve1 ~# systemctl restart pvedaemon pveproxy
root@pve1 ~# systemctl restart pve-cluster
root@pve1 ~# systemctl restart corosync
```

---
**Resources:**

[Proxmox Forum/Can't login to Proxmox with Web GUI](https://forum.proxmox.com/threads/can-not-login-to-proxmox-from-web-interface.32860/)
