const db = require("../models");
const mongoose = require('mongoose')
const Moment = require('moment')

module.exports = {
  clear: function(req, res) {
    db.Institution.remove({}).then(res => console.log(res));
    db.CushionSensor.remove({}).then(res => console.log(res));
    db.BedSensor.remove({}).then(res => console.log(res));
    db.ShoeSensor.remove({}).then(res => console.log(res));
    db.ShoeData.remove({}).then(res => console.log(res));
    db.BedData.remove({}).then(res => console.log(res));
    db.CushionData.remove({}).then(res => console.log(res));
    res.send('success')
  },
  findAllInstitution: function(req, res) {
    db.Institution
      .find({})
      .then(result => res.send(result))
      .catch(err => console.log(err))
  },
  findAllBedSensor: function(req, res) {
    db.BedSensor
      .find({})
      .then(result => res.send(result))
      .catch(err => console.log(err))
  },
  findAllShoeSensor: function(req, res) {
    db.ShoeSensor
      .find({})
      .then(result => res.send(result))
      .catch(err => console.log(err))
  },
  findAllCushionSensor: function(req, res) {
    db.CushionSensor
      .find({})
      .then(result => res.send(result))
      .catch(err => console.log(err))
  },
  createInstitution: function(req, res) {
    db.Institution
      .create(req.body)
      .then(result =>  res.send(result))
      .catch(err => console.log(err))
  },
  createCushion: function(req, res) {
    db.CushionSensor
      .create(req.body, (err, sensor) => {
        if (err) console.log(err);

        db.Institution.update({_id: req.body.institution},
          {$push: {cushion: sensor }})
          .then(result => {
            res.send(sensor)
          })
      })
  },
  createBed: function(req, res) {
    db.BedSensor
      .create(req.body, (err, sensor) => {
        if (err) console.log(err);

        db.Institution.update({_id: req.body.institution},
          {$push: {bed: sensor }})
          .then(result => {
            res.send(sensor)
          })
      })
  },
  createShoe: function(req, res) {
    db.ShoeSensor
      .create(req.body, (err, sensor) => {
        if (err) console.log(err);

        db.Institution.update({_id: req.body.institution},
          {$push: {shoe: sensor }})
          .then(result => {
            res.send(sensor)
          })
      })
  },
  findAllShoeData: function(req, res) {
    db.ShoeData
      .find({})
      .then(result =>  res.send(result))
      .catch(err => console.log(err))
  },
  findAllBedData: function(req, res) {
    db.BedData
      .find({})
      .then(result =>  res.send(result))
      .catch(err => console.log(err))
  },
  findAllCushionData: function(req, res) {
    db.CushionData
      .find({})
      .then(result =>  res.send(result))
      .catch(err => console.log(err))
  },
  createShoeData: function(req, res) {
    db.ShoeData
      .create(req.body, (err, dataResponse) => {
        if (err) console.log(err);
        db.ShoeSensor.update({_id: req.body.sensor},
          {$push: {data: dataResponse}})
          .then(result => {
            res.send(result);
          })
      })
  },
  createBedData: function(req, res) {
    db.BedData
      .create(req.body, (err, dataResponse) => {
        if (err) console.log(err);
        db.BedSensor.update({_id: req.body.sensor},
          {$push: {data: dataResponse}})
          .then(result => {
            res.send(result);
          })
      });
  },
  createCushionData: function(req, res) {
    db.CushionData
      .create(req.body, (err, dataResponse) => {
        if (err) console.log(err);
        db.CushionSensor.update({_id: req.body.sensor},
          {$push: {data: dataResponse}})
          .then(result => {
            res.send(result);
          })
      })
  }
};