# variables.tf - Input variables for the infrastructure

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-southeast-2"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "app_name" {
  description = "Application name used for resource naming"
  type        = string
  default     = "ticket-board"
}

# ECS Configuration
variable "backend_cpu" {
  description = "CPU units for backend container (1024 = 1 vCPU)"
  type        = number
  default     = 256
}

variable "backend_memory" {
  description = "Memory for backend container in MB"
  type        = number
  default     = 512
}

variable "backend_desired_count" {
  description = "Number of backend containers to run"
  type        = number
  default     = 1
}

# Auth0 Configuration
variable "auth0_domain" {
  description = "Auth0 tenant domain"
  type        = string
}

variable "auth0_audience" {
  description = "Auth0 API audience/identifier"
  type        = string
}
