Greetings, in this article I will show you how to build a structure for network testing from scratch and then make the necessary adjustments. Have a good read.

# Prerequisites

**A PC** \
**Minimum 8Gb Flash Drive** \
**Router (x86_64):** [Zimaboard 832](https://shop.zimaboard.com/products/zimaboard-single-board-server?variant=39283928465606) \
**Managed or Smart Switch:** [TP-Link TL-SG105E](https://www.amazon.com.tr/Tp-Link-Tl-Sg105E-5-Portlu-Gigabit-Switch/dp/B00N0OHEMA) \
**Router (for WLAN):** [Xiaomi Mi Router 4 Giga Edition with OpenWRT](https://openwrt.org/inbox/toh/xiaomi/xiaomi_mi_router_4a_gigabit_edition) 

> My conditions allow me to test with this hardware. If you have better ones, you can use them.

---
# Router Configuration

> In this section, I will not talk about OPNsense installation and initial settings, you can set it up as you wish. 

The network I set up as an example: \
**LAN:** 10.1.0.1/24 \
**WAN:** 192.168.1.210/24 
## Create VLAN 10 with OPNsense

Go to `Interfaces --> Other Types --> VLAN`, you'll see `+` icon under VLAN. Add VLAN10 with using it.

![[Pasted image 20250116203227.png]]

Set: \
**Device:** vlan010 \
**Parent:** re0 [LAN] \
**VLAN tag:** 10 \
**Description:** VLAN10

![[Pasted image 20250117002643.png]]

## Assign VLAN 10 to Network and Start VLAN Interface

Come `Interfaces --> Assignments` then add VLAN10 interface

![[Pasted image 20250117002935.png]]

After, screen will look like this

![[Pasted image 20250117002800.png]]

Now we have VLAN10 Interface, to enable VLAN10 interface go to `Interfaces --> VLAN10` then enable it, then set `IPv4 Configuration Type` to `Static IPv4` .

![[Pasted image 20250117003432.png]]

Come to under the page and set IPv4 Address to 10.1.10.1/24.

> You can set it different too, my test network is 10.1.0.0/24 and open VLAN Network with different subnet for 10.1.10.0/24. (VLAN 10 and Subnet 10)

![[Pasted image 20250117003456.png]]

**Don't forget after click Apply Changes.**

## Firewall Rules for VLAN 10

Before writing Rules for the Firewall, we create `Alias` for `Private Networks` `(192.168.1.0/24, 10.1.0.0/24 and 10.1.10.0/24)`. If we don't do this, we will enter 3 rules instead of 1 rule and it will be easier to find this way when we enter more rules in the future.

`Firewall --> Aliases`

![[Pasted image 20250117125251.png]]

**Name:** PrivateNetworks \
**Type:** Networks \
**Content:** 192.168.1.0/24 + 10.1.0.0/24 + 10.1.10.0/24 \
**Description:** Alias for Network Isolation

![[Pasted image 20250117125349.png]]

Then come to `Firewall --> Rules --> VLAN10` and add this rules for network security.

| Action | TCP/IP Version | Protocol | Source     | Dest / Invert | Destination    | Dest Port | Description                                   |
| ------ | -------------- | -------- | ---------- | ------------- | -------------- | --------- | --------------------------------------------- |
| Pass   | IPv4           | TCP/UDP  | VLAN10 net | unchecked     | VLAN10 address | 53        | Allow VLAN10 to access DNS                    |
| Pass   | IPv4           | TCP      | VLAN10 net | unchecked     | VLAN10 address | 443       | Allow VLAN10 to access HTTPS for Firewall GUI |
| Pass   | IPv4           | any      | VLAN10 net | checked       | VLAN10 address | any       | Allow access only to Internet                 |

![[Pasted image 20250117124421.png]]

It will see like this after all:

![[Pasted image 20250117151228.png]]

**Don't forget apply changes.**

## Enable DHCP for VLAN 10

We come to the last step of setting up the VLAN10 network, now we enable DHCP and finish the network setup by the Router.

![[Pasted image 20250117124113.png]]

**Don't forget scroll down and save.**

## Configure Shaper for Bufferbloat

> When I connected to the network, after a while I started to experience noticeable disconnections. \
> I thought it was `Bufferbloat`, so I ran a test and saw that the `Download Active` output was too high. \
> I ran the test 5 times and `Upload Active` started to rise unusually in between. When this happened, I started to avoid Bufferbloat.

**I have 500 Mbit/s Up / 50 Mbit/s Down**
### Set Pipes

Come to `Firewall --> Shaper` then add a shaper like as below.

![[Pasted image 20250118004630.png]]
Set: \
**Enabled:** Checked \
**Bandwidth:** 450 (set whatever value works best for your network) \
**Bandwidth Metric:** Mbit/s \
**Scheduler Type:** FlowQueue-CoDel \
**Enable CoDel:** Checked \
**(FQ-)Codel ECN:** Checked \
**Description:** Download or Download Shaper

![[Pasted image 20250118004805.png]]

Next, apply the above process according to your upload speed.

![[Pasted image 20250118004918.png]]

### Set Queues

After adding Pipe, the next step is to add Queue, add it as indicated below.

![[Pasted image 20250118005202.png]]

Set: \
**Enabled:** Checked \
**Pipe:** Download \
**Mask:** destination \
Enable Codel and (FQ-) Codel

![[Pasted image 20250118005306.png]]

For Upload Queue, most things are the same as above, don't forget set `Pipe: Upload` and `Mask: source`.

![[Pasted image 20250118005341.png]]

### Set Rules

We finish the shaper adjustment part here. Create the rule as described below and then observe the change in your network.

![[Pasted image 20250118005418.png]]


![[Pasted image 20250118005516.png]]


![[Pasted image 20250118005623.png]]

## OPNsense Tuning

When I observed that the `Errors Out` value started to increase in the `WAN Interface` section with `Interface Statistics`, I realized that I needed to optimize the system.

You can look here for OPNsense Tuning. If you have a 10G NIC, I definitely recommend to take a look.

[OPNsense Performance Tuning Guide on Proxmox / Emin's Notes](https://notes.xeome.dev/notes/OPNSense-Tuning)

> I just changed `kern.ipc.maxsockbuf` to `2097152` becouse my NIC's are 1G and testing `net.inet.rss.bits` with `2` value. 

![[Pasted image 20250118150454.png]]

 Disable Fragmentation in `Firewall --> Settings --> Normalization`.

![[Pasted image 20250118150555.png]]

I recommend restarting the Firewall once you have finished setting it up. Otherwise it may cause problems when setting Switch.

---
# Switch Configuration

## Connect Switch's Port 1 to Router LAN and Find Switch's Local IP

Go to `Services --> ISC DHCPv4 --> Leases` , when page is load you'll see `MAC Addresses`, check this section it'll show your switch maintainer such as `TP-LINK CORPORATION PTE. LTD.` . 

My switch has `10.1.0.3` address. \
Enter 10.1.0.3 from your browser and enter the device's interface.


![[Pasted image 20250117134420.png]]

## 802.1Q Settings

After connecting to the switch, go to Monitoring and check the connected ports.\
I connected my own computer to port 5 and it also shows up without any problems.

![[Pasted image 20250117134624.png]]

As for the VLAN connection section, go to the 802.1Q VLAN section under VLAN. \
After Enabling 802.1Q VLAN Configuration, configure the network as follows, so we have completed the first step of the connection.

`VLAN --> 802.1Q VLAN`

![[Pasted image 20250117134904.png]]

Now we have come to the last part of the VLAN connection, we come to the `802.1Q VLAN PVID` section, select all ports and set the `PVID` to `10`. \
Thus, the network passing through the Switch will pass through the VLAN.

![[Pasted image 20250117135023.png]]

Since I don't have a switch that I can manage Layer 3, I restart the Smart Switch I have, so that we can check whether it can receive IP through the Firewall.

![[Pasted image 20250117135126.png]]

It will be useful to restart the Firewall before making the VLAN connection. In some cases, the Switch cannot receive IP.

![[Pasted image 20250117135201.png]]

![[Pasted image 20250117135336.png]]

---
# Dummy Access Point (WLAN) Configuration

## Remove WAN Interfaces and Configuration for Dummy Access Point

We will not need the `WAN` Interfaces, we delete both of them, and click `Save & Apply`.

![[Pasted image 20250117213257.png]]

Go to Devices and select Configure to the right of br-lan.

![[Pasted image 20250117213315.png]]

Select Bridge Ports and add the WAN port there. You can connect to the other two ports if you have other access points.

![[Pasted image 20250117213339.png]]

## Set Static IP to Access Point

If the Router and Switch settings have been successfully completed, we can now continue from here. 

> The router I use has OpenWRT in it, and my goal is to turn off DHCP and use it as a WLAN Access Point. \
   If you have another Router or WLAN Access Point you can use it as a Dummy Access Point or WLAN Access Point.

Go to `Network --> Interfaces` then click to `Edit` button next to LAN interface.

![[Pasted image 20250117213430.png]]

Set: \
**Protocol:** Static Address \
**IPv4 address:** 10.1.10.3 \
**IPv4 netmask:** 255.255.255.0 \
**IPv4 gateway:** 10.1.10.1 (Firewall VLAN10) \
**IPv4 broadcast:** 10.1.10.255

![[Pasted image 20250117213506.png]]

## Set DNS Server

Then come to `Advanced Settings` section and set DNS to `1.1.1.1` or something.

![[Pasted image 20250117213618.png]]

## Disable DHCP Server

It comes with `DHCP` turned on. \ 
Since we have `DHCP` turned on in the Firewall, we turn it off here, because if it is turned on here too, the addresses to which the devices will connect may be mismatched.

![[Pasted image 20250117215254.png]]

## Configuring Wireless

We are nearing the end of setting up the Access Point. Finally, we turn on WLAN. 

Go to `Network --> Wireless` and edit a WLAN network under `MediaTek MT76x2E 802.11ac/n` . \
This is for Wifi5, if you have Wifi6 use ax.

![[Pasted image 20250117235808.png]]

**Wireless Security** \
Set: \
**Mode:** Access Point \
**ESSID:** Tungsten Carbide (set it what you want) \
**Network:** LAN

![[Pasted image 20250117235846.png]]

Set: \
**Encryption:** WPA2-PSK \
**Cipher:** Force CCMP (AES) \
Then set a wifi password


![[Pasted image 20250117235915.png]]

Click `Save` and click `Save & Apply` again.

---
> I would like to thank everyone for taking the time to read my article. If you have any questions, feel free to contact me on Linkedin.

---
**Resources**

[Set Up a Management VLAN for OPNsense, a Network Switch, and a Wireless Access Point / Home Network Guy](https://homenetworkguy.com/how-to/set-up-management-vlan-for-opnsense-network-switch-and-access-point/) \
[OPNsense Performance Tuning Guide on Proxmox / Emin's Notes](https://notes.xeome.dev/notes/OPNSense-Tuning) \
[How to Configure VLANs on OPNsense / Zenarmor](https://www.zenarmor.com/docs/network-security-tutorials/how-to-configure-vlan-on-opnsense) \
[VLAN and LAGG Setup / OPNsense Docs](https://docs.opnsense.org/manual/how-tos/vlan_and_lagg.html) \
[Improve your BufferBloat with Traffic Shaping in Opnsense with IPv6 / Maltech](https://maltechx.de/en/2021/03/opnsense-setup-traffic-shaping-and-reduce-bufferbloat/) \
[Fighting Bufferbloat with FQ_CoDel](https://docs.opnsense.org/manual/how-tos/shaper_bufferbloat.html#fighting-bufferbloat-with-fq-codel)
