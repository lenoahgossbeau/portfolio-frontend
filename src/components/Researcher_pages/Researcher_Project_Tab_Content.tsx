
import React, { useState, useRef, ChangeEvent } from "react";
import Re_ProjectSlider from "@/components/Researcher_pages/Researcher_Project_Preview";
import { IoCameraOutline } from "react-icons/io5";


export default function Researcher_Project_Tab_Content() {


    ////////////////////////////////////////////
    //////  PROJECT STATE (TEMP BACKEND)  //////
    ////////////////////////////////////////////
      const [projects, setProjects] = useState<any[]>([
        {
          id: 1,
          image: "",
          title: "Sample Project",
          date: "01-12-2025",
          description: "Description details here A passionate software engineer specializing in building modern, responsive, and user-friendly web solutions. A passionate software engineer specializing in building modern, responsive, and user-friendly web solutions.",
          link: ""
        }
      ]);


    //////////////////////////
    //////  FORM STATE  //////
      const [form, setForm] = useState({
        id: null as number | null,
        image: "",
        title: "",
        date: "",
        description: "",
        link: ""
      })
      // when editing, the form id should not be null
      const isEditing = form.id !== null;
    
      // Handle image upload
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      const fileInputRef = useRef<HTMLInputElement | null>(null);
    
    
    
      ///////////////////////////////////////
      //////  Field Validation States  //////
      ///////////////////////////////////////
      const [errors, setErrors] = useState({
        title: "",
        date: "",
        description: "",
        link: ""
      });
    
    
    
      const handleImageClick = () => {
        fileInputRef.current?.click();
      };
    
      const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        if (!file.type.startsWith("image/")) {
          alert("Please upload an image file");
          return;
        }
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setForm((prev) => ({ ...prev, image: reader.result as string })); /// added this
        };
        reader.readAsDataURL(file);
      };
      
    
    
      //////////////////////////////////
      //////  FORM INPUT HANDLER  //////
      //////////////////////////////////
      const updateField = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    
        // Clear the error for the field being edited
        setErrors((prev) => ({ ...prev, [key]: "" }));
      }
    
    
    
      //////////////////////////////////
      //////  CREATE NEW PROJECT  //////
      //////////////////////////////////
      const handleCreate = () => {
        if (!validate()) return;     // <<--- stop if invalid
    
        const newProject = {
          ...form,        
          id: Date.now(),   
        };
    
        setProjects((prev) => [...prev, newProject]);
    
        resetForm();
      };
    
    
    
      ///////////////////////////////////
      //////  SAVE EDITED PROJECT  //////
      ///////////////////////////////////
      const handleSave = () => {
        if (!validate()) return;     // <<--- stop if invalid
    
        setProjects((prev) =>
          prev.map((p) => (p.id === form.id ? { ...p, ...form} : p))
        );
    
        resetForm();
      }
    
    
    
      ///////////////////////////////////
      //////  RESET FORM  ///////////////
      ///////////////////////////////////
      const resetForm = () => {
        setForm({
          id: null,
          image: "",
          title: "",
          date: "",
          description: "",
          link: ""
        });
    
        setErrors({
          title: "",
          date: "",
          description: "",
          link: ""
        })
      };
    
    
    
      ///////////////////////////////////////
      //////  ON EDIT CLICK FROM CARD  //////
      ///////////////////////////////////////
      const handleEditFromCard = (project: any) => {
        setForm(project);
      }
    
    
    
      //////////////////////////////
      //////  DELETE PROJECT  //////
      //////////////////////////////
      const handleDeleteFromCard = (id: number) => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
    
        // if deleted one was on form
        if (form.id === id) resetForm();
      };
    
    
    
     
    
      ////////////////////////////////////
      ////////  Field Validator  /////////
      ////////////////////////////////////
      const validate = () => {
        const newErrors: any = {};
      
        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.date.trim()) newErrors.date = "Date is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        if (!form.link.trim()) newErrors.link = "Link is required";
      
        setErrors(newErrors);
      
        return Object.keys(newErrors).length === 0;  // true = valid
      };
    



  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
                    
        {/* LEFT FORM CARD */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      
          {/* IMAGE UPLOAD AREA */}
          <div
            onClick={handleImageClick}
            className="relative w-full h-60 bg-gray-300 flex items-center justify-center cursor-pointer"
          >
    
            {/* added this second condition */}
            {form.image ? (
              <img
                src={form.image}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                            
                <IoCameraOutline size={45} className="text-gray-500" />
                          
              </div>
            )}
          </div>
              
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
              
          {/* FORM SECTION */}
          <div className="p-6 space-y-5">
              
            <div className="flex gap-6">
              <div className="w-1/2">
                {/** <label className="text-sm text-gray-400">Title</label> */}
                <input
                  type="text"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full pl-2 border-b border-gray-300 focus:border-blue-600 outline-none py-1"
                />
    
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>
              
              <div className="w-1/2">
                {/** <label className="text-sm text-gray-400">Date done</label> */}
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full pl-2 border-b border-gray-300 focus:border-blue-600 outline-none py-1"
                />
    
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
              </div>
            </div>
              
            <div>
              {/** <label className="text-sm text-gray-400">Description</label> */}
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-600 outline-none resize-none scrollbar-hide"
                rows={4}
              />
    
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
              
            <div>
              {/** <label className="text-sm text-gray-400">Link</label> */}
              <input
                type="link"
                placeholder="Link"
                value={form.link}
                onChange={(e) => updateField("link", e.target.value)}
                className="w-full pl-2 border-b border-gray-300 focus:border-blue-600 outline-none py-1"
              />
    
              {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
            </div>
              
            <div className="flex justify-center gap-4 pt-4">
              <button 
                onClick={resetForm}
                className="cursor-pointer px-4 py-2 border border-gray-400 rounded-full text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
    
              {!isEditing ? (
                <button 
                  onClick={handleCreate}
                  className="cursor-pointer px-4 py-2 bg-[#003F7F] text-white rounded-full hover:bg-[#004F9F]"
                >
                  CREATE
                </button>
    
              ) : (
                <button 
                  onClick={handleSave}
                  className="cursor-pointer px-4 py-2 bg-[#003F7F] text-white rounded-full hover:bg-[#004F9F]"
                >
                  SAVE
                </button>
              )}
      
            </div>
          </div>
        </div>
              
              
        {/* RIGHT PREVIEW CARD */}
        <div className="bg-[#f5f6f8] max-h-screen rounded-2xl p-6 flex items-center justify-center h-[600px]">
      
          <Re_ProjectSlider 
            editable={true}
            projects={projects}
            onEdit={handleEditFromCard}
            onDelete={handleDeleteFromCard}
          />
    
        </div>
      </div>
  )
}
