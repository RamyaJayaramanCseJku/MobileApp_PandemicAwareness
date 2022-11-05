# MobileApp_PandemicAwareness
Mobile app for visualizing COVID-19 information for Austria and indoor risk assessment based on aerosol transmission model.

# Data Sources
COVID-19 data sources are based on the Austrian government database. COVID-19 information can be accessed from the portal and available as web urls.

# Google Cloud App Engine
The data sources are pre-processed and parsed removing zero or null records. The required data sources are provided through Python Flask REST API for front end requests. The REST API is deployed into Google Cloud Server for universal access to end-users for performing UAT (User Acceptance Testing).

# React-Native Mobile Application
Cross platform app development framework used for developing mobile front-end and designed with CSS.

![Architecture]('./image/systemArchOverviewDiagram-Thesis.png')

# App Screenshots

 ![Architecture]('./image/overview&warningLevel.png')

 ![Architecture]('./image/allCharts.png')

  ![Architecture]('./image/model.png')

  
