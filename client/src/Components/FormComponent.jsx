import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { MdEmail } from "react-icons/md";

const FormComponent = () => {
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");


  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/schedule`, {
        recipients: recipients.split(",").map((email) => email.trim()),
        subject,
        message,
        scheduleTime,
      });
      console.log("Success:", response.data);
      toast.success("Email Scheduled Successfully!");
      setRecipients("");
      setSubject("");
      setMessage("");
      setScheduleTime("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error scheduling email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 p-4">
      <Toaster position="top-right" />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl px-10 pt-8 pb-10 w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-purple-800 text-center mb-4">
          <MdEmail className="inline-block text-purple-600 text-3xl mr-2" />
          Schedule an Email
        </h2>

        <div className="relative">
          <input
            type="text"
            placeholder="Recipients (comma separated)"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition pl-10"
          />
          <MdEmail className="absolute top-3 left-3 text-purple-400 text-xl" />
        </div>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
        />

        <input
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 shadow-md transition duration-300"
        >
          Schedule Email
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
