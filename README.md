# Polling Website

It is a simple website which lets the user vote a choice of True/False and show all the votes in tabular form and display the trends analysis using BarGraph and LineChart.

You can find a demo of this website running [at this url](http://pollingwebsite.herokuapp.com/)
## Installation

You first need to download NodeJs which can be found [here](https://nodejs.org/en/download/)

Now you need to download MongoDB which can be found [here](https://docs.mongodb.com/manual/administration/install-community/)


After installing NodeJs and MongoDB, Use the git clone command to clone the repository

```bash
git clone https://github.com/Lone-Star5/pollingwebsite.git
```

Open the folder where you have cloned the repository in your terminal and type the following command to download all the dependencies

```bash
npm install
```

Make sure you have your mongodb running using the command `sudo service mongodb status`
If the mongodb shows status fail, then run the following command to start mongodb

```bash
sudo service mongodb start
```

Now you can start the server using the following command and open `localhost:3000` in your browser to view the wesbite.

```bash
npm start
```


## Libraries Used

[express](https://www.npmjs.com/package/express)
[mongoose](https://www.npmjs.com/package/mongoose)
[ejs](https://www.npmjs.com/package/ejs)
[body-parser](https://www.npmjs.com/package/body-parser)
[chart.js](https://www.chartjs.org/)
[bootstrap](https://getbootstrap.com/)

