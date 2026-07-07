
import React, { useState, useRef, ChangeEvent } from "react";
import Re_PublicationSlider from "./Researcher_Publication_Preview";



export default function Researcher_Publication_Tab_Content() {


    ////////////////////////////////////////////
    ////  PUBLICATION STATE (TEMP BACKEND)  ////
    ////////////////////////////////////////////
    const [publications, setPublications] = useState<any[]>([
      {
        id: 1,
        title: "Sample Publication",
        author: ["Ekwoge junior", "James"],
        date: "1st November 2025",
        description: "Maximize your tax returns and minimize common errors with our expert guidance. Our system streamlines the entire declaration process, helping you find every eligible deduction and optimize your financial outcomes effortlessly declaration process, helping you find every eligible deduction and optimize your financial outcomes effortlessly declaration process, helping you find every eligible deduction and optimize your financial outcomes effortlessly...",
        link: ""
      }
    ]);


    
    //////////////////////////////
    ////  AUTHOR INPUT STATE  ////
    //////////////////////////////
    const [authorInput, setAuthorInput] = useState("") // holds the text currently being typed



    //////////////////////////
    //////  FORM STATE  //////
    const [form, setForm] = useState({
        id: null as number | null,
        title: "",
        author: [] as string[], // can take multiple authors
        date: "",
        description: "",
        link: ""
    })
    // when editing, the form id should not be null
    const isEditing = form.id !== null;
    

     
    ///////////////////////////////////////
    //////  Field Validation States  //////
    ///////////////////////////////////////
    const [errors, setErrors] = useState({
        title: "",
        author: "",
        date: "",
        description: "",
        link: ""
    });
      
    

    //////////////////////////////////
    //////  FORM INPUT HANDLER  //////
    //////////////////////////////////
    const updateField = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    
        // Clear the error for the field being edited
        setErrors((prev) => ({ ...prev, [key]: "" }));
    }
    


    ///////////////////////////////
    ////  ADD AUTHOR HANDLERS  ////
    ///////////////////////////////
    const addAuthor = () => {
      const value = authorInput.trim();
      if (!value) return;

      if (!form.author.includes(value)) {
        setForm(prev => ({
          ...prev,
          author: [...prev.author, value]
        }));
      }


      setAuthorInput("");
      setErrors(prev => ({ ...prev, author: "" }));
    }



    ////////////////////////////////////////////////
    ////  HANDLE ENTER/COMMA TO SAVE AN AUTHOR  ////
    ////////////////////////////////////////////////
    const handleAuthorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addAuthor();
      }


      // Optional UX: backspace removes last tag
      {/** if (e.key === "Backspace" && !authorInput && form.author.length) {
        setForm(prev => ({
          ...prev,
          author: prev.author.slice(0, -1)
        }));
      }*/}
    };



    //////////////////////////////////
    ////  REMOVE AUTHOR HANDLERS  ////
    //////////////////////////////////
    const removeAuthor = (index: number) => {
      setForm(prev => ({
        ...prev,
        author: prev.author.filter((_, i) => i !== index)
      }));
    };

    
    
    //////////////////////////////////////
    //////  CREATE NEW PUBLICATION  //////
    //////////////////////////////////////
    const handleCreate = () => {
        if (!validate()) return;     // <<--- stop if invalid
    
        const newPublication = {
          ...form,        
          id: Date.now(),   
        };
    
        setPublications((prev) => [...prev, newPublication]);
    
        resetForm();
    };
    
    
    
    ///////////////////////////////////////
    //////  SAVE EDITED PUBLICATION  //////
    ///////////////////////////////////////
    const handleSave = () => {
        if (!validate()) return;     // <<--- stop if invalid
    
        setPublications((prev) =>
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
          title: "",
          author: [],
          date: "",
          description: "",
          link: ""
        });
    
        setErrors({
          title: "",
          author: "",
          date: "",
          description: "",
          link: ""
        })
    };
    
    
    
    ///////////////////////////////////////
    //////  ON EDIT CLICK FROM CARD  //////
    ///////////////////////////////////////
    
    {/** 
      const handleEditFromCard = (publication: any) => {
        setForm(publication);
      }
    */}

    const handleEditFromCard = (publication: any) => {
      setForm({
        ...publication,
        author: publication.author ?? []
      });
    };
    
    
    
    //////////////////////////////////
    //////  DELETE PUBLICATION  //////
    //////////////////////////////////
    const handleDeleteFromCard = (id: number) => {
        setPublications((prev) => prev.filter((p) => p.id !== id));
    
        // if deleted one was on form
        if (form.id === id) resetForm();
    };
    
    
    
    ////////////////////////////////////
    ////////  Field Validator  /////////
    ////////////////////////////////////
    const validate = () => {
        const newErrors: any = {};
      
        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.author.length) newErrors.author = "At least one Author is required";
        if (!form.date.trim()) newErrors.date = "Publication date is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        if (!form.link.trim()) newErrors.link = "Link is required";
      
        setErrors(newErrors);
      
        return Object.keys(newErrors).length === 0;  // true = valid
    };
    





  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
                    
        {/* LEFT FORM CARD */}
        <div className="self-start bg-white min-h-[390px] max-h-[450px] rounded-2xl shadow-lg border border-gray-300 overflow-y-auto scrollbar-hide">
     
  
              
            {/* FORM SECTION */}
            <div className="p-6 mt-2 space-y-5">
              
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
    

                <div className="flex gap-6">

                    <div className="w-1/2">
                      <div className="border-b border-gray-300 focus-within:border-blue-600 pb-2 flex flex-wrap gap-2">
                        
                        {form.author.map((author_name, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm"
                          >
                            {author_name}
                            <button
                              type="button"
                              onClick={() => removeAuthor(i)}
                              className="hover:text-red-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}

                        <input
                          type="text"
                          value={authorInput}
                          onChange={(e) => setAuthorInput(e.target.value)}
                          onKeyDown={handleAuthorKeyDown}
                          placeholder="Add author & press Enter"
                          className="flex-1 min-w-[120px] outline-none"
                        />
                      </div>

                      {errors.author && ( <p className="text-red-500 text-sm">{errors.author}</p> )}
                    </div>


    
                    <div className="w-1/2">
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
      
              <Re_PublicationSlider 
                editable={true}
                publications={publications}
                onEdit={handleEditFromCard}
                onDelete={handleDeleteFromCard}
              />
    
            </div>
    </div>
  )
}
