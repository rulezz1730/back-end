const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
console.log(chalk);

//для того чтобы это работало на любых платформах
const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    // const notes = require("./db.json");
    // const notes = await fs.readFile(notesPath, { encoding: "utf-8" }); notes было buffer
    // const notes = Buffer.from(buffer).toString("utf-8");

    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString(),
    };

    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    // console.log(chalk.green.inverse("Note was added"));
    console.log(chalk.bgBlue("New note was added"));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlue("Here is list of notes:"));
    notes.forEach((note) => console.log(chalk.blue(note.id, note.title)));
}

async function removeNote(id) {
    let notes = await getNotes();
    const removingNote = notes.find((note) => note.id === id);
    notes = notes.filter((note) => note.id !== id);

    await fs.writeFile(notesPath, JSON.stringify(notes));

    console.log(
        chalk.green(
            `Note with title:"${removingNote.title}" and ID: "${removingNote.id}" was deleted`
        )
    );
}

module.exports = {
    addNote,
    printNotes,
    removeNote,
};
