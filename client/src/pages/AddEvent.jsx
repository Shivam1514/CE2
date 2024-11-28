import  { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import Notiflix from "notiflix"

export default function AddEvent() {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user? user.name : "",
    title: "",
    optional:"",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: null,
    likes: 0
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("File:",file);
    
    setFormData((prevState) => ({ ...prevState, image: file }));
    console.log("ddddddd:",formData.image);
    
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formdata:",formData);
    //const file = e.target.files[0];
    //formData.append("imageX",file)
    axios
      .post("/createEvent", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Event posted successfully:", response.data);
        Notiflix.Notify.success("Event posted successfully")
      })
      .catch((error) => {
        console.error("Error posting event:", error);
        Notiflix.Notify.failure("Error in posting Event")
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <main className="flex-grow flex justify-center items-center mt-10 mb-10">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-10 ">
          <h1 className="font-bold text-2xl text-center mb-5">Post an Event</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col">
              Title:
              <input
                type="text"
                name="title"
                className="rounded mt-2 px-4 ring-sky-700 ring-2 h-10 border-none"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col">
              Optional:
              <input
                type="text"
                name="optional"
                className="rounded mt-2 px-4 ring-sky-700 ring-2 h-10 border-none"
                value={formData.optional}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col">
              Description:
              <textarea
                name="description"
                className="rounded mt-2 px-4 py-2 ring-sky-700 ring-2 border-none"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col">
              Organized By:
              <input
                type="text"
                name="organizedBy"
                className="rounded mt-2 px-4 ring-sky-700 ring-2 h-10 border-none"
                value={formData.organizedBy}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col">
              Event Date:
              <input
                type="date"
                name="eventDate"
                className="rounded mt-2 px-4 ring-sky-700 ring-2 h-10 border-none"
                value={formData.eventDate}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col">
              Event Time:
              <input
                type="time"
                name="eventTime"
                className="rounded mt-2 px-4 ring-sky-700 ring-2 h-10 border-none"
                value={formData.eventTime}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col">
              Location:
              <input
                type="text"
                name="location"
                className="rounded mt-2 px-4 ring-sky-700 ring-2 h-10 border-none"
                value={formData.location}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col">
              Ticket Price:
              <input
                type="number"
                name="ticketPrice"
                className="rounded mt-2 px-4 ring-sky-700 ring-2 h-10 border-none"
                value={formData.ticketPrice}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col">
              Image:
              <input
                type="file"
                name="imageX"
                className="rounded mt-2 px-4 py-2 ring-sky-700 ring-2 border-none"
                onChange={handleImageUpload}
              />
            </label>
            <button className="bg-sky-700 text-white py-2 px-4 rounded mt-5 hover:bg-sky-800">
              Submit
            </button>
          </form>
        </div>
      </main>

      
    </div>
 
  );
}
