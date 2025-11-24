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

  backend "s3" {
    bucket  = "ticket-board-terraform-state-ap"
    key     = "terraform.tfstate"
    region  = "ap-southeast-2"
    encrypt = true
  }
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
