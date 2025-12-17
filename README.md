# Terraform AWS Demo: VPC, EC2, dan CI/CD

Repository ini berisi contoh **infrastructure setup menggunakan
Terraform** untuk membuat:

-   VPC dengan public subnet
-   Security Group
-   EC2 Amazon Linux 2023
-   Akses SSH
-   Web server (Nginx)
-   CI/CD otomatis menggunakan GitHub Actions

> **Catatan:**\
> Pada demo ini **Terraform state masih disimpan secara lokal**.\
> Pada environment production, state **sebaiknya disimpan di S3

------------------------------------------------------------------------

## 1️Konfigurasi AWS CLI

Pastikan AWS CLI sudah terinstall.

### Cek versi

``` bash
aws --version
```

### Konfigurasi AWS Access Key

``` bash
aws configure
```

Masukkan:

``` text
AWS Access Key ID     : <YOUR_ACCESS_KEY>
AWS Secret Access Key : <YOUR_SECRET_KEY>
Default region name   : ap-southeast-3
Default output format : json
```

------------------------------------------------------------------------

## Menjalankan Terraform (Init, Plan, Apply)

### Terraform Init

``` bash
terraform init
```

### Terraform Plan

``` bash
terraform plan
```

Pastikan semua resource sesuai (VPC, Subnet, IGW, SG, EC2).

### Terraform Apply

``` bash
terraform apply
```

Ketik `yes` saat diminta konfirmasi.

------------------------------------------------------------------------

## SSH ke EC2 & Verifikasi Service

### SSH ke EC2

``` bash
chmod 400 edo.pem
ssh -i edo.pem root@<PUBLIC_IP>
```

### Install & Cek Docker

``` bash
docker --version
```

Jika belum terinstall:

``` bash
sudo dnf install -y docker
sudo systemctl enable docker
sudo systemctl start docker
```

### Install & Cek Nginx

``` bash
nginx -v
```

Jika belum:

``` bash
sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Akses:

    https://<PUBLIC_IP>

### Generate Self Sign Certificate

``` bash
openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout ip.key \
  -out ip.crt \
  -subj "/CN={{PUBLIC_IP}}"

```


------------------------------------------------------------------------

## CI/CD Menggunakan GitHub Actions

CI/CD akan otomatis berjalan saat ada **push ke branch main**.

### Alur:

1.  Push code ke GitHub
2.  GitHub Actions berjalan
3.  Deploy ke EC2 via SSH
4.  Service direstart

Pastikan GitHub Secrets: - SSH_HOST - SSH_USER - SSH_PRIVATE_KEY

------------------------------------------------------------------------

## 5️⃣ Verifikasi di Browser

Setelah GitHub Actions sukses:

    https://<PUBLIC_IP>
    atau
    https://yourdomain.com

Perubahan dari repository akan langsung terlihat.

------------------------------------------------------------------------

## Kesimpulan

-   Infrastructure dibuat otomatis dengan Terraform
-   Server siap untuk production / demo
-   Deployment otomatis via CI/CD
-   Mudah diverifikasi via browser

## Bonus yang dikerjakan
- Menggunakan Docker
- Menggunakann HTTPS
- Menggunakan Terraform

