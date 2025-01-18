**List all Nodes**

Connect the machine which you used to create cluster and list all nodes with `pvecm nodes` command.

```bash
root@pve3 ~# pvecm nodes

Membership information
----------------------
    Nodeid      Votes Name
         1          1 pve1
         2          1 pve2
         3          1 pve3 (local)
root@pve3 ~#   
```

Now, we're deleting our pve2 node from our Cluster.

```bash
root@pve3 ~# pvecm delnode pve2
root@pve3 ~#
```

If this method don't worked then we'll delete pve2 manually.

---
# Deleting a node folder manually

```bash
root@pve3 ~# cd /etc/pve/
 authkey.pub                     corosync.conf~   local     openvz            qemu-server       virtual-guest
 authkey.pub.old                 corosync.conz~   lxc       priv              replication.cfg   vzdump.cron
 corosync.conf                   firewall         mapping   pve-root-ca.pem   sdn
 corosync.conf.new.tmp.3582997   ha               nodes     pve-www.key       storage.cfg
root@pve3 /e/pve#  
```

Then go to nodes folder, and delete pve2 manually.

```bash
root@pve3 /e/pve# cd nodes
 pve1   pve2   pve3
root@pve3 /e/p/nodes# pwd
/etc/pve/nodes
root@pve3 /e/p/nodes# rm -rf pve2   
```

---
# Fully Removing a Cluster

When I changed Local IP's from my nodes, cluster connection didn't worked. I also wanted to share this part with you.

**In my setup, cluster machine is pve3, firstly we'll remove cluster in pve3.**

```bash
root@pve3 ~# systemctl stop pve-cluster corosync
root@pve3 ~# pmxcfs -l
root@pve3 ~# rm -rf /etc/corosync
root@pve3 ~# rm /etc/pve/corosync.conf
root@pve3 ~# killall pmxcfs
root@pve3 ~# systemctl start pve-cluster
root@pve3 ~# cd /etc/pve/nodes
 pve1   pve2   pve3
root@pve3 /e/p/nodes# rm -rf pve1 pve2
root@pve3 /e/p/nodes#
```

After all we deleted our cluster fully and deleted our pve1 and pve2 node files from our pve3 node.


> [!warning] What I have shown above only removes cluster in pve3, you should do the same for other nodes.
> **Example for pve2:**
> ```bash
> root@pve2 ~# systemctl stop pve-cluster corosync
> root@pve2 ~# pmxcfs -l 
> root@pve2 ~# rm -rf /etc/corosync
> root@pve2 ~#  rm /etc/pve/corosync.conf
> root@pve2 ~# killall pmxcfs
> root@pve2 ~# systemctl start pve-cluster
> root@pve2 ~# cd /etc/pve/nodes
> root@pve2 /e/p/nodes# rm -rf pve1 pve3
> ````

---

**resources**

https://forum.proxmox.com/threads/remove-node-from-cluster.98752/
https://forum.proxmox.com/threads/removing-node-permission-denied.136033/

---
