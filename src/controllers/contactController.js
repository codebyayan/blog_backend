const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const { name, email, phoneNumber, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !phoneNumber || !service || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      phoneNumber,
      service,
      message,
    });

    // Save to MongoDB
    const savedContact = await newContact.save();

    res.status(201).json({
      message: "Contact information saved successfully",
      data: savedContact,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error while saving contact" });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (error) {
   res.status(500).json({
  message: "Server error while fetching contacts",
  error: {
    name: error.name,
    message: error.message,
    stack: error.stack,
  },
});
  }
};
