import { useState } from "react";
import EditSecurityInfoModal from "./editSecurityInfoModal";

export default function SecurityCard() {


  ///////////////// Temporal Backend //////////////////
    const [password, setPassword] = useState({
      new_password: "",
      confirm_password: ""
    });
  
  
  
  
    //////////// State to control modal open/close ////////
    const [isEditing, setIsEditing] = useState(false);
  


  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 h-35">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-base font-medium text-gray-700">Security</h2>
        <button  onClick={() => setIsEditing(true)}  className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm">✏️</button>

      </div>


      {/** Incase of editing */}
            <EditSecurityInfoModal
              open={isEditing}
              onClose={() => setIsEditing(false)}
              data={password}
              onSave={setPassword}
            />


      <p className="text-sm mt-7">
        Password: <span className="ml-1 tracking-wider">••••••••••••</span>
      </p>
    </div>
  );
}
