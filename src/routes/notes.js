const express = require('express');
const router = express.Router();



const Note = require('../models/Note');

router.get('/notes/add', (req, res) =>{
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req,res) =>{
   const {title, description } = req.body;
   const errors = [];
   if (!title) {
       errors.push({text: 'please write a title'});
   }
   if (!description) {
       errors.push({text:'please write a description'});
   }
   if (errors.length >0) {
       res.render('notes/new-note', {
           errors,
           title,
           description
       });
       
   }else{
      const newNote = new Note({ title, description});
     await newNote.save();
    res.redirect('/notes')   
   }
});

router.get('/notes', async (req, res) => {
    await Note.find().sort({date: 'desc'})
      .then(documentos => {
        const contexto = {
            notes: documentos.map(documento => {
            return {
                _id: documento._id,
                title: documento.title,
                description: documento.description
            }
          })
        }
        res.render('notes/all-notes', {
 notes: contexto.notes }) 
      })
  });

  router.get('/notes/edit/:_id', async (req, res) =>{
    const note = await Note.findById(req.params._id)
      res.render('notes/edit-note', {note});
  });

module.exports = router;
