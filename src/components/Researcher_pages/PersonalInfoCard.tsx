import Image from "next/image";
import favicon from "@/app/favicon.ico"
import { useState } from "react";
import EditPersonalInfoModal from "./Researcher_editPersonalInfoModal";
import { FiEdit2 } from "react-icons/fi";




type Profile = {
  name: string;
  profession: string;
  about: string;
  avatar: string;
};

type Props = {
  profile: Profile;
  onSave: (data: Profile) => void;
}




export default function PersonalInfoCard({ profile, onSave }: Props) {



  //////////// State to control modal open/close ////////
  const [isEditing, setIsEditing] = useState(false);



  return (
    <div className="col-span-2 bg-white rounded-xl shadow-lg p-5 border border-gray-200 h-118">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-base font-medium text-gray-700">Personal info</h2>
        <button  onClick={() => setIsEditing(true)}  className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm">✏️</button>
      </div>



      {/** Incase of editing */}
      <EditPersonalInfoModal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        data={profile}
        onSave={onSave}
      />




      <div className="flex flex-col items-center w-86 mt-6 overflow-y-auto scrollbar-hide">
        <div className="w-42 h-42 rounded-full overflow-hidden mb-4">
          <Image
            src={profile.avatar || "/favicon.ico"}
            alt="profile"
            width={170}
            height={170}
            className="object-cover"
          />
        </div>

        <div className="text-left w-full max-w-sm">
          <p className="font-medium mb-1">
            Name: <span className="font-normal text-md"> {profile.name || "No name has been set" } </span>
          </p>

          <p className="font-medium mb-1">
            Profession: <span className="font-normal text-md"> {profile.profession || "No profession has been set" } </span>
          </p>

          <p className="font-medium mt-2">About you:</p>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed max-h-25 overflow-y-auto scrollbar-hide">
            {profile.about || "No about has been set" }
          </p>
        </div>
      </div>
    </div>
  );
}
