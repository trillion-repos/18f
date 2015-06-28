# Trillion OpenFDA Data Visulaization Platform 
[![Build Status](http://18fci.ttsiglobal.com:8080/view/All/builds)](http://18fci.ttsiglobal.com:3000)

Welcome to 18f OpenFDA 
Brought to you by Trillion Technology Solutions, Inc 

This prototype provides a graphical interface to OpenFDA - Enforcement Reports, using OpenFDA publicly available API. This interface provides an insight to Recalls reported to FDA for Drugs, Devices and Foods.

The following information is made available: 
•Number of recalls per US state, for each category - Drugs, Devices and Foods
•Number of recalls per Year for a selected US State, for each category - Drugs, Devices and Foods
•Number of recalls per Month for a selected US State and Year, for each category - Drugs, Devices and Foods
•List of recalled records for a selected Month and Year and State, for each category - Drugs, Devices and Foods



## Install and Run the App (as a developer)

See our [Installation Guide](INSTALL.md)

## How this works

By default, data will be loaded from /sample-data

* [cities100.csv](sample-data/cities100.csv) - dataset of 100 most populous cities in the US
* [data.yaml](sample-data/data.yaml) - configuration for
  * how columns are mapped to fields in json output
  * index name *city-data*
  * api endpoint name *cities*

When you run the app (after ```rake import```), you can query the dataset via json API, like: /cities?name=Chicago

To use your own data, you can set a different directory with

```
export export DATA_PATH='./data'
```

1. Put csv files into /data
1. Import files from /data: ```rake import```
   1.1 there can be multiple files (must end in .csv)
   1.1 optional data.yaml file that specifies column -> field mapping, index and API endpoint
1. api endpoint to get the data /api?name=value

## Help Wanted

1. Try out importing multiple data sets with different endpoints and data.yaml configuration
2. Take a look at our [open issues](https://github.com/18F/open-data-maker/issues) and our [Contribution Guide](CONTRIBUTING.md)

## More Info

Here's how it might look in the future:

![overview of data types, prompt to download data, create a custom data set, or look at API docs](/doc/data-overview.png)


![Download all the data or make choices to create a csv with a subset](/doc/csv-download.png)

