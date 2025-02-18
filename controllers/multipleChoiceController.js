const { checkIfExists } = require('../utils/modelUtils');
const MultipleChoice = require('../models/multipleChoice')

exports.getMultipleChoice = async (req, res) => {
    try {
        const { id } = req.params;
        const questions = await MultipleChoice.find({ business_id: id, deleted: false });
        res.json({ questions });
      } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

exports.createMultipleChoice = async (req, res) => {
    try {
        const { business_id, question, answers } = req.body;
        console.log(business_id, question, answers);
        if (!business_id || !question || !answers) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const questionCount = await MultipleChoice.countDocuments({ business_id, deleted: false });

        if (questionCount >= 3) {
            return res.status(400).json({ error: "Maximum of 3 questions allowed per business" });
        }
        const newQuestion = new MultipleChoice({ business_id, question, answers });
        await newQuestion.save();

        res.status(201).json({ message: "Multiple choice created successfully", newQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Error creating multiple choice', error });
    }
}

exports.updateMultipleChoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answers } = req.body;

        if (!question && !answers) {
            return res.status(400).json({ error: "At least one field (question or answers) must be updated" });
        }
        if (!(await checkIfExists(MultipleChoice, id)))
            return res.status(404).json({ message: 'Multiple Choice not found or already deleted' });

        const updatedQuestion = await MultipleChoice.findByIdAndUpdate(
            id,
            { $set: { question, answers } },
            { new: true, runValidators: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ error: "Multiple choice not found" });
        }

        res.status(200).json({ updatedQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Error updating multiple choice', error });
    }
}

exports.deleteMultipleChoice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuestion = await MultipleChoice.findByIdAndUpdate(id, { deleted: true });
        if (!deletedQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.status(200).json({ message: "Multiple choice deleted successfully", deletedQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting multiple choice', error });
    }
}

