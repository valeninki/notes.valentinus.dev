```bash
# Everything in this tutorial should be done as root:
sudo -i

# Now hop on into the EFI partition root.
cd /boot/efi

# Configuration files will go here:
mkdir -p loader/entries

# And kernels will go here:
mkdir debian
```

`/boot/efi/loader/loader.conf`

```bash
default  debian.conf
timeout  4
console-mode max
editor   no
```

`/etc/kernel/postinst.d/zz-update-systemd-boot`

```bash
#!/bin/bash
#
# This is a simple kernel hook to populate the systemd-boot entries
# whenever kernels are added or removed.
#
       
# The UUID of your disk.
UUID="CHANGEME"

# The LUKS volume slug you want to use, which will result in the
# partition being mounted to /dev/mapper/CHANGEME.
VOLUME="CHANGEME"

# Any rootflags you wish to set.
ROOTFLAGS="CHANGEME"    

# Our kernels.
KERNELS=()
FIND="find /boot -maxdepth 1 -name 'vmlinuz-*' -type f -print0 | sort -rz"
while IFS= read -r -u3 -d $'\0' LINE; do
    KERNEL=$(basename "${LINE}")
    KERNELS+=("${KERNEL:8}")
done 3< <(eval "${FIND}")

# There has to be at least one kernel.
if [ ${#KERNELS[@]} -lt 1 ]; then
    echo -e "\e[2msystemd-boot\e[0m \e[1;31mNo kernels found.\e[0m"
    exit 1
fi
       
# Perform a nuclear clean to ensure everything is always in perfect
# sync.
rm /boot/efi/loader/entries/*.conf
rm -rf /boot/efi/debian
mkdir /boot/efi/debian
      
# Copy the latest kernel files to a consistent place so we can keep
# using the same loader configuration.
LATEST="${KERNELS[@]:0:1}"
echo -e "\e[2msystemd-boot\e[0m \e[1;32m${LATEST}\e[0m"
for FILE in config initrd.img System.map vmlinuz; do
    cp "/boot/${FILE}-${LATEST}" "/boot/efi/debian/${FILE}"
    cat << EOF > /boot/efi/loader/entries/debian.conf
title   Debian
linux   /debian/vmlinuz
initrd  /debian/initrd.img
options cryptdevice=UUID=${UUID}:${VOLUME} root=/dev/mapper/${VOLUME} ro rootflags=${ROOTFLAGS}
EOF
done
    
# Copy any legacy kernels over too, but maintain their version-based
# names to avoid collisions.
if [ ${#KERNELS[@]} -gt 1 ]; then
    LEGACY=("${KERNELS[@]:1}")
    for VERSION in "${LEGACY[@]}"; do
        echo -e "\e[2msystemd-boot\e[0m \e[1;32m${VERSION}\e[0m"
        for FILE in config initrd.img System.map vmlinuz; do
            cp "/boot/${FILE}-${VERSION}" "/boot/efi/ubuntu/${FILE}-${VERSION}"
            cat << EOF > /boot/efi/loader/entries/ubuntu-${VERSION}.conf
title   Ubuntu GNOME ${VERSION}
linux   /debian/vmlinuz-${VERSION}
initrd  /debian/initrd.img-${VERSION}
options cryptdevice=UUID=${UUID}:${VOLUME} root=/dev/mapper/${VOLUME} ro rootflags=${ROOTFLAGS}
EOF
        done
    done
fi

# Success!
exit 0
```

`/boot/efi/loader/entries/debian.conf`

```bash
title   Debian
linux   /debian/vmlinuz
initrd  /debian/initrd.img
options root=UUID={your UUID} ro
```

```bash
bootctl install --path=/boot/efi
```

```
efibootmgr

reboot
```

---

**Resource**

[Askubuntu How to Replace Grub with systemd-boot](https://askubuntu.com/questions/1225791/how-to-replace-grub-with-bootloader-systemd-boot-in-ubuntu-20-04)
