import Modal from "@/components/Modal_structure_Researcher_profile";
import { useEffect, useState } from "react";

export default function EditPersonalInfoModal({ open, onClose, data, onSave }: any) {
  
  const [form, setForm] = useState(data);
  
  
  
  ////////////// Validation state /////////////
  const [errors, setErrors] = useState({
    name: "",
    profession: "",
    about: "",
  });
  
  
  ////////////// image /////////////////
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(data.avatar);


///////////////////// reinitialise state
  useEffect(() => {
    setForm(data);
    setImagePreview(data.avatar);
  }, [data]);
////////////////////


  ///////////// Validation Function ///////////
  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.profession.trim()) newErrors.profession = "Profession is required";
    if (!form.about.trim()) newErrors.about = "About section is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const update = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };


  ///////////////////// image change handler ////////////
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };


  const handleSave = () => {
    if (!validate()) return;

    onSave({
      ...form,
      avatar: imagePreview, // backend will replace this later
    });

    onClose();
  };


  return (
    <Modal open={open} onClose={onClose}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Personal info</h3>
        <button
          onClick={handleSave}
          className="text-blue-600 font-medium"
        >
          Save
        </button>
      </div>


      {/* Image Upload */}
      <div className="flex justify-center mb-6">
        <label className="cursor-pointer">
          <img
            src={imagePreview || "/favicon.ico"} ///////////////////////// default image is the favicon for now //////////////////////
            className="w-48 h-48 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>


      {/* Avatar 
      <div className="flex justify-center mb-6">
        <img
          src={form.avatar}
          className="w-28 h-28 rounded-full object-cover"
        />
      </div>*/}


      {/* Inputs */}
      <div className="space-y-4">
        <div>
            <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={`w-full border-b focus:border-blue-600 outline-none
            ${
              errors.name
                ? "border-red-600 outline-none"
                : ""
            }`}
            />

            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>


        <div>
            <input
            placeholder="Profession"
            value={form.profession}
            onChange={(e) => update("profession", e.target.value)}
            className={`w-full border-b focus:border-blue-600 outline-none
            ${
              errors.profession
                ? "border-red-600 outline-none"
                : ""
            }`}
            />
            
            {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
        </div>


        <div>
            <textarea
            placeholder="About you"
            value={form.about}
            onChange={(e) => update("about", e.target.value)}
            className={`w-full border rounded-lg p-2 resize-none focus:border-blue-600 outline-none
            ${
              errors.about
                ? "border-red-600 outline-none"
                : ""
            }`}

            rows={4}
            />

            {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
        </div>
      </div>
    </Modal>
  );
}
