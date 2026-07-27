# Employee Management System with Generative AI HR Assistant

## Overview

The Employee Management System is a cloud-based full-stack web application developed using **ASP.NET Core 8 Web API**, **Angular**, **SQL Server**, and **Microsoft Azure**. The application enables organizations to manage employees, departments, and designations while providing an AI-powered HR Assistant using **Azure OpenAI GPT-4.1 Mini** for natural language employee queries.

The project demonstrates modern software engineering practices including secure authentication, cloud deployment, CI/CD automation, application monitoring, and Generative AI integration.

---

## Live Architecture

```text
Angular Frontend
        │
        ▼
ASP.NET Core Web API
        │
        ├────────► Azure OpenAI GPT-4.1 Mini
        │
        ▼
Azure SQL Database
```

---

# Features

## Employee Management

* Add Employee
* Update Employee
* Delete Employee
* View Employee Details
* Employee Search

## Department Management

* Add Department
* Update Department
* Delete Department
* View Departments

## Designation Management

* Add Designation
* Update Designation
* Delete Designation

## Authentication & Security

* JWT Authentication
* Role-Based Authorization
* Protected REST APIs
* Secure Azure Environment Variables
* User Secrets for Local Development

## AI HR Assistant

Powered by **Azure OpenAI GPT-4.1 Mini**

Supports natural language queries such as:

* How many employees are there?
* How many employees are in each city?
* Which role has the highest number of employees?

The backend retrieves employee information from Azure SQL Database and generates intelligent responses using Azure OpenAI.

---

# Technology Stack

## Backend

* ASP.NET Core 8 Web API
* C#
* Entity Framework Core
* REST APIs
* JWT Authentication

## Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* Bootstrap

## Database

* SQL Server
* Azure SQL Database

## Cloud

* Azure App Service
* Azure Static Web Apps
* Azure SQL Database
* Azure OpenAI
* Azure Application Insights

## DevOps

* Git
* GitHub
* GitHub Actions
* CI/CD

---

# Project Structure

```text
Employee Management System

│
├── EmployeeApi
│     ├── Controllers
│     ├── Models
│     ├── Entity Framework Core
│     ├── Authentication
│     ├── Azure OpenAI Integration
│     └── REST APIs
│
├── EmployeeAdmin
│     ├── Angular Components
│     ├── Services
│     ├── Authentication
│     └── AI Assistant UI
│
└── GitHub Actions
```

---

### Authentication APIs

* Login
* JWT Token Generation

### AI Assistant API

* Ask HR-related natural language questions
* Retrieve employee insights using Azure OpenAI

---

# Azure Services Used

* Azure App Service
* Azure Static Web Apps
* Azure SQL Database
* Azure OpenAI GPT-4.1 Mini
* Azure Application Insights

---

# CI/CD

The application uses **GitHub Actions** to automate:

* Build
* Test
* Deployment to Azure App Service
* Deployment to Azure Static Web Apps

---

# Security

* JWT Authentication
* Role-Based Authorization
* Secure API Endpoints
* Azure Environment Variables
* User Secrets for local development
* Sensitive credentials excluded from source control

---

# Sample AI Questions

* How many employees are there?
* List all employees.
* Which city has the highest employee count?
* How many managers are there?

---

# Future Enhancements

* Employee Analytics Dashboard
* AI Chat History
* AI-powered Employee Search
* Export Reports (PDF/Excel)
* Docker Containerization
* Kubernetes Deployment
* Azure Blob Storage Integration
* Unit Testing with xUnit

---

# Skills Demonstrated

* ASP.NET Core Web API
* Angular Development
* Entity Framework Core
* SQL Server
* Azure SQL Database
* Azure App Service
* Azure Static Web Apps
* Azure OpenAI Integration
* JWT Authentication
* RESTful API Development
* GitHub Actions CI/CD
* Application Insights
* Secure Configuration Management
* Cloud Deployment

---

# Author

**Dheera M**

Full Stack .NET Developer

**Tech Stack:** ASP.NET Core • C# • Angular • SQL Server • Azure • Azure OpenAI • Entity Framework Core • GitHub Actions • REST APIs • JWT Authentication
