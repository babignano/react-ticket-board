# main.tf - Terraform configuration and AWS provider setup

# Specify required providers and versions
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  # Uncomment this to store state in S3 (recommended for teams)
  # backend "s3" {
  #   bucket = "your-terraform-state-bucket"
  #   key    = "ticket-board/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region

  # Tags applied to all resources
  default_tags {
    tags = {
      Project     = "ticket-board"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}
