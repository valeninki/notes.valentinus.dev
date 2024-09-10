## Set a password and start ssh daemon

**Set password**

```bash
passwd
```

**Start ssh daemon**

```bash
systemctl start sshd.service
```

- I'll suppose to you're connected to internet.

## Partitioning

```bash
cfdisk /dev/nvme0n1
```

## Formatting Partition

```bash
mkfs.vfat -F32 /dev/nvme0n1p1
mkfs.btrfs /dev/nvme0n1p2
```

## Create and Mount Subvolumes

```bash
mount /dev/nvme0n1p2 /mnt
cd /mnt
btrfs sub cr /mnt/@ && \
btrfs sub cr /mnt/@/home && \
mkdir -p @/var
btrfs sub cr /mnt/@/var/log && \
btrfs sub cr /mnt/@/var/cache && \
cd
umount /mnt
```

**Mount Subvols**

```bash
mount -t btrfs -o rw,noatime,subvol=@,compress=zstd /dev/nvme0n1p2 /mnt
mount -t btrfs -o rw,noatime,subvol=@/home,compress=zstd /dev/nvme0n1p2 /mnt/home && \
mount -t btrfs -o rw,noatime,subvol=@/var/cache,compress=zstd /dev/nvme0n1p2 /mnt/var/cache && \
mount -t btrfs -o rw,noatime,subvol=@/var/log,compress=zstd /dev/nvme0n1p2 /mnt/var/log 
```

**Mount EFI Partition**

```bash
mount --mkdir /dev/nvme0n1p1 /mnt/boot
```


## Installing Base System and /etc/fstab

**Editing /etc/pacman.conf**

```bash
sudo nano /etc/pacman.conf
Enable Max Parallel Downloads, Multilib repo and Color, then add ILoveCandy
```

**Install kernel and essential packages**

```bash
pacstrap -K /mnt base linux linux-firmware linux-headers intel-ucode or amd-ucode
```

**Create /etc/fstab**

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```


## Enter Chroot and Configure System

**Enter Chroot**

```bash
arch-chroot /mnt
```

**Set time zone**

```bash
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
```

**Run hwclock to generate /etc/adjtime**

```bash
hwclock --systohc
```

**Localization**

**Edit `/etc/locale.gen` and uncomment `en_US.UTF-8 UTF-8` and other needed UTF-8 locales.**

```bash
locale-gen
```

**Create `locale.conf` and set LANG variable accordingly:**

```bash
/etc/locale.conf
LANG=en_US.UTF-8
```

```Bash 
LANG=en_US.UTF-8
```

**Create `/etc/hostname` file and setting hostname:**

```bash
valentinus
```

**Recreate initramfs:**

```bash
mkinitcpio -P
```

**Set the root password:**

```bash
passwd
```

I leave it to you create a user, installing Bootloader and setting your Desktop Environment.

## Add and Use CachyOS Repositories with CachyOS's Configs

- **[CachyOS](https://cachyos.org/)** is an performance orianted Operating System and has repositories are including flags for performance, stability and security.

- If you want more information for Cachyos Repositories take a look: [What is the CachyOS Repositories](https://wiki.cachyos.org/cachyos_repositories/what_is_the_cachyos_repo/)

**Get and Add CachyOS Repositories:**

```bash
wget https://mirror.cachyos.org/cachyos-repo.tar.xz
tar xvf cachyos-repo.tar.xz && cd cachyos-repo
sudo ./cachyos-repo.sh
```

- When it reinstall the packages, we'll continue.

**Installing yay (aur helper) and linux-cachyos kernel.**
- CachyOS kernel includes EEVDF and BORE CPU SCHEDULERS.
- BORE CPU Scheduler gives us to maximum responsiveness. I'm personally using this.

```bash
sudo pacman -S yay
```

- Now installing kernel and nvidia drivers. (Because I have nvidia right now)

```bash
yay -S linux-cachyos linux-cachyos-headers nvidia-dkms nvidia-utils lib32-nvidia-utils
```

> [!info] Nvidia DRM Backend
You must add `nvidia-drm.modeset=1` kernel parameter in your bootloader config.

- Now download CachyOS Settings and use on our machine.

```bash
cd Downloads
git clone https://github.com/CachyOS/CachyOS-Settings
cd CachyOS-Settings
cd etc
sudo cp -r * /etc
```

**CachyOS using zstd compression algorithm with zram, we'll change it with lz4 and using all ram size.**

```bash
sudo nano /etc/systemd/zram-generator.conf
```

```bash
[zram0] 
compression-algorithm = lz4
zram-size = ram 
```

> [!info] Optional Kernel Parameter 
> - zswap functions as a swap cache in front of zram, intercepting and compressing evicted memory pages before they can reach zram.
> - Becouse of this reason we'll disable zswap as a result zram will work better.
> - If we disable zswap, suspend to disk (hibernate) wont work. 
> - Add this kernel parameter your bootloader config disables zswap on your system. `zswap.enable=0`

- Now installing zram generator and enabling it.

```bash
yay -S zram-generator
systemctl enable systemd-zram-setup@.service
```

- Reboot now, and enjoy system :)

> [!info] Extras
> [uksmd](https://github.com/CachyOS/uksmd)
> [libva-nvidia-driver](https://github.com/elFarto/nvidia-vaapi-driver)
> [btrfs-assistant](https://gitlab.com/btrfs-assistant/btrfs-assistant)
> [ccache](https://wiki.archlinux.org/title/ccache)
> 
