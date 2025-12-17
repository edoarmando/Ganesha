output "public_ip" {
  value = aws_instance.demo.public_ip
}

output "ssh_command" {
  value = "ssh -i edo.pem ec2-user@${aws_instance.demo.public_ip}"
}
