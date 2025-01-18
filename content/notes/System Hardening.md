Greetings, in this article I will list and explain as best I can some of the things that can make it difficult to connect to Home and Server systems from the outside. Have a good read.

# 1) Locking Root Account

**Warning:** Before you try what is written here on your **Remote Server**, be sure to do the **Preparation** in the **SSH Hardening** section, then come back here.

- First of all, we close access to the root user. The reason is to prevent Brute Force attacks, which are very obvious.

```bash
## Adds valen account with new home folder.
root@fedora ~# useradd -m valen

## Sets password to valen account.
root@fedora ~# passwd valen

## Adds valen account to wheel group.
root@fedora ~# usermod -aG wheel valen

## Changes user to valen account.
root@fedora ~# su valen

## Locks root account.
valen@fedora ~> sudo passwd -l root.

## Checks root account is locked or unlocked
valen@fedora ~> sudo cat /etc/shadow | grep root
root:!::0:99999:7:::
valen@fedora ~> 
```

1) Firstly, added a new account name with **valen**, and set a password for it. 
2) Then added **valen** account to `wheel` group becouse we need root access for our new account.
3) After change user to **valen** and locked root account.
4) Finally root account is locked, but we need to check it with `sudo cat /etc/shadow | grep root` command. If you see `root:!` root account is successfully locked. `!` means this user is locked.

---

# 2) SSH Hardening

Now we come to one of the most crucial parts. We need to make it more difficult for users to connect to the machine. 

## Preparation

Since we locked the **root** user above, our user does not have the `.ssh` folder and `authorized_keys` file. **If you are going to lock the root user on a remote server, make sure to do this part first, otherwise you may lose access to the machine and you will have to deal with support.**

```bash
## Copies .ssh folder to valen user becouse this user hasn't got .ssh .
root@fedora ~# cp .ssh /home/valen/

## Changes user to valen.
root@fedora ~# su valen

## Changes permissons for .ssh folder to Read, Write and Execute for this user.
valen@fedora ~> chmod 700 ~/.ssh

## Changes permissons for authorized_keys file to Read and Write for this user.
valen@fedora ~> chmod 600 ~/.ssh/authorized_keys
```

## a) Basic Security Settings for sshd_config File

```bash
# Gives permisson to connect root account with ssh. (set it no)
PermitRootLogin no

# Enables ssh connection with ssh key, don't lose it becouse you cannot access without it. (set it yes)
PubkeyAuthentication yes

# Enables ssh connection with password. (set it no)
PasswordAuthentication no
```

## b) Set Listen Address to Private VPN

```bash
# Listens only VPN IP.
ListenAddress <VPN IP>
```

At the moment the SSH service **only** listens to the VPN, but the firewall might not allow access there, so we have to write rules ourselves.

```bash
### FirewallD
# Adds vpn-zone for VPN. 
valen@fedora ~> sudo firewall-cmd --permanent --new-zone=vpn-zone

# Adds VPN interface to vpn-zone.
valen@fedora ~> sudo firewall-cmd --permanent --zone=vpnzone --add-interface=tun0

# Adds SSH service to vpn-zone.
valen@fedora ~> sudo firewall-cmd --permanent --zone=vpnzone --add-service=ssh

# Removes SSH service connection to public zone.
valen@fedora ~> sudo firewall-cmd --permanent --zone=public --remove-service=ssh

# Restarts FirewallD.
valen@fedora ~> sudo firewall-cmd --reload

### UFW
# Example firewall rule for tun0 interface with ufw.
valen@fedora ~> sudo ufw allow in on tun0 to any port 22

### Iptables
# Accepts SSH traffic only on the VPN interface.
valen@fedora ~> sudo iptables -A INPUT -i tun0 -p tcp --dport 22 -j ACCEPT

# Drops SSH traffic from other interfaces.
valen@fedora ~> sudo iptables -A INPUT -p tcp --dport 22 -j DROP

# Saves iptables settings. (this command may be different on your system)
valen@fedora ~> sudo iptables-save
```

---
# 3) Network Hardening

coming soon...