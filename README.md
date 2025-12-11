
# SmartTasks — AI-Powered Task Manager

Hi guys, 
I'm **Mohamed Asnaff**, a 4th-year **BSc (Hons) in Information Technology** student at **Rajarata University of Sri Lanka**.

I built this just to get hands on experience with 
**.NET**, **React/Next.js**, and **Azure cloud deployment**.  
This project helped me understand real world full stack engineering, API design, authentication, and cloud hosting.

---

# CORE TECHNOLOGIES USED

### **Frontend**
- **Next.js**
- **React**
- **TypeScript**
- **TailwindCSS**

### **Backend**
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **SQL Server / Azure SQL**
- **JWT Authentication**

### **Cloud Deployment**
- **Azure App Service** - Backend Hosting (.NET API)
- **Azure Static Web Apps** - Frontend Hosting (Next.js/React)

---

# Overview

**SmartTasks** is a modern full stack productivity app that helps users manage tasks.  
It includes

 UI with glassmorphism  
 Secure login & registration  
 Task CRUD operations  
 AI powered task suggestions  
 Cloud hosted backend + frontend  

This stack reflects real-world industry architecture:  
**Next.js frontend → .NET 8 Web API → SQL Database → Azure Deployment**

---

# Architecture

```

Next.js Frontend
│
│  -Fetch API calls (with JWT Bearer Token)
v
ASP.NET Core Web API
│
│   -Authentication (JWT)
│   -Controller logic
v
SQL Server Database (via EF Core)

````

#  Live Demo

**Its Live Now**
https://polite-pond-06e6b0f1e.3.azurestaticapps.net
---

#  Project Setup

## **Frontend Setup**

```sh
npm install
npm run dev
```

## **Backend Setup**

```sh
dotnet restore
dotnet ef database update
dotnet run
```

# Thank You!

If you found this project interesting or helpful, feel free to star rate the repository and connect with me!


