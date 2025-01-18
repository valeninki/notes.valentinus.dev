Greetings, today we'll learning how to setup GeoFilter (MaxMind GeoIP) to out OPNsense Firewall.

---
## 1) Create an Account

Firstly going to  [MaxMind Signup](https://www.maxmind.com/en/geolite2/signup) and creating our account.

---
## 2) Creating License Keys

Now going to **Manage License Keys** and generating our License Key.

![[Pasted image 20241128183255.png]]

---

## 3) Getting GeoLite2 Country CSV

You can see **Download Files** section under **GeoIP2/GeoLite2**, come to page and find "GeoLite2 Country CSV". Then copy the "Download ZIP" address.

![[Pasted image 20241128183255.png]]

![[Pasted image 20241128184540.png]]

![[Pasted image 20241128185710.png]]

---

## 4) Enable and Use GeoFilter with OPNsense

Finally, we can use our copied address with OPNsense. Come to **Aliases under Firewall** section, after we're seeing 2 categories "Aliases and GeoIP Settings".
Come inside **GeoIP Settings** and paste the Url we copied inside it.

![[Pasted image 20241128190028.png]]

---

## 5) Setting Alias

Now come to **Aliases** page and add new alias.
I set the name as "country_filter" if you wish can change it.
Select the counteries as you wish.
If you want to set Description for it, can set "GeoFilter for Network Security"
Then **save** and **enable** it.

![[Pasted image 20241128192253.png]]

---
## 6) Firewall Rule for GeoFilter

We got our Lisence Key, Geofilter Url and Alias.
Lastly we're creating a Firewall Rule to use GeoFilter our network.
Come to "Firewall --> Rules --> Wan" tab and add a new firewall rule.

**Action:** Block
**Interface:** WAN
**Direction:** In
**TCP/IP Version:** IPv4 (you can use both too)
**Protocol:** Any
**Source:** country_filter (under aliases)
**Destination:** Any
**Description:** Geofilter Rule for Network Security (optional)

![[Pasted image 20241128194132.png]]

![[Pasted image 20241128194205.png]]

![[Pasted image 20241128194230.png]]

---

After all, we set GeoFilter to OPNsense Firewall successfully.

**Additional Info:** Geofilter updates itself automaticly.

---
**Resources:**

[OPNsense Docs/ **MaxMind GeoIP’s Setup**](https://docs.opnsense.org/manual/how-tos/maxmind_geo_ip.html)
[Zenarmor/ **OPNsense Security and Hardening Best Practice Guide**](https://www.zenarmor.com/docs/network-security-tutorials/opnsense-security-and-hardening-best-practice-guide)
