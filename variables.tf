variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "devops-pipeline-demo"
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "ami_id" {
  description = "AMI ID for Ubuntu 22.04 LTS (update based on your region)"
  type        = string
  default     = "ami-0866a3c8686eaeeba" # Ubuntu 22.04 LTS in us-east-1
}

variable "key_name" {
  description = "SSH key pair name for EC2 access"
  type        = string
  # No default - must be provided by user
}
