const notesModel = require("../models/notesModel");

const getNotes = async (res) => {
  const notes = await notesModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

const createNote = (req, res) => {
  const { title, body, tags } = req.body;

  notesModel
    .create({ title, body, tags })
    .then(() => res.status(200).json("success"))
    .catch((err) => res.status(404).json(err.message));
};

const deleteNote = (req) => {
  const id = req.params;
  notesModel
    .findByIdAndDelete({ _id: id })
    .then(() => res.status(200).json("Note deleted"))
    .catch((err) => res.status(404).json({ err: "An error has occurred" }));
};

module.exports = { getNotes, createNote, deleteNote };
