const MeetingHistory = require('../../model/schema/meeting');
const mongoose = require('mongoose');

// Add a new meeting
const add = async (req, res) => {
    console.log(req.body);
    
    try {
        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        res.status(201).json({ message: 'Meeting created successfully', meeting });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all meetings
const index = async (req, res) => {
    try {
        const meetings = await MeetingHistory.find();
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific meeting by ID
const view = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Meeting ID' });
        }

        const meeting = await MeetingHistory.findById(id);
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a specific meeting by ID
const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Meeting ID' });
        }

        const meeting = await MeetingHistory.findByIdAndDelete(id);
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        res.status(200).json({ message: 'Meeting deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete multiple meetings
const deleteMany = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of IDs in the request body
        if (!Array.isArray(ids) || ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
            return res.status(400).json({ message: 'Invalid Meeting IDs' });
        }

        const result = await MeetingHistory.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: `${result.deletedCount} meetings deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { add, index, view, deleteData, deleteMany };
