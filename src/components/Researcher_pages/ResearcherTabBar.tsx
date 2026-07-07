'use client'
import React, { useEffect, useState } from "react";
import Resume from "@/sections/Resume";
import { FiUpload } from "react-icons/fi";
import PersonalInfoCard from "./PersonalInfoCard";
import ContactCard from "./ContactCard";
import SecurityCard from "./SecurityCard";
import Researcher_Project_Tab_Content from "./Researcher_Project_Tab_Content";
import Researcher_Publication_Tab_Content from "./Researcher_Publication_Tab_Content";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "resume", label: "Resume" },
  { id: "project", label: "Project" },
  { id: "publication", label: "Publication" },
];


///////////////
type Props = {
  admin?: boolean;
  mode?: "create" | "edit";
  researcherId?: number;
};
///////////////

//////// type for the profile ///////
type Profile = {
  name: string;
  profession: string;
  about: string;
  avatar: string;
};

type Researcher = Profile & {
  id: number;
};
/////////////////////////////////////



const MOCK_ACCOUNTS = [
  {
    id: 1,
    name: "Ekwoge Junior",
    profession: "Data Engineer",
    about: "I'm a nonprofit organization...",
    avatar: "",
  },
  {
    id: 2,
    name: "Jane Smith",
    profession: "Data Engineer",
    about: "I'm a nonprofit organization...",
    avatar: "",
  },
];


/////////////////// Data for empty fields ( default values ) ////////////////

const EMPTY_PROFILE: Profile = {
  name: "",
  profession: "",
  about: "",
  avatar: "",
};





const ResearcherDashboard: React.FC<Props> = ({ 
  admin = false,
  mode = "create",
  researcherId,
}) => {
  const [activeTab, setActiveTab] = useState<string>("profile");

///////////////////////////////
  const [profile, setProfile] = useState<Researcher | null>(null);


  //////////////// when creating //////////////
  useEffect(() => {
    if (mode === "create") {
      setProfile({ id: Date.now(), ...EMPTY_PROFILE });
    }
  }, [mode]);



  /////////////// when editing //////////
  useEffect(() => {
    if (mode === "edit" && researcherId) {
      // TEMP: fake fetch (later replace with API)
      const found = MOCK_ACCOUNTS.find(
        (r) => r.id === Number(researcherId)
      );

      if (found) setProfile(found);
    }
  }, [mode, researcherId]);

///////////////////////////////





  //////// Tab content /////////
  const renderContent = () => {
    switch (activeTab) {
      case "project":
        return (
          <Researcher_Project_Tab_Content />
        );
          
      case "publication":
        return (
          <Researcher_Publication_Tab_Content />
        );

      case "resume":
        return (
          <div className="mt-[-20px]">
            <Resume editable={true} />
          </div>
        );

      case "profile":
        return (
          <div className="mt-10 text-center text-gray-600 text-lg">

            <div className="flex flex-row gap-5 justify-center">
              
              {profile && (
                <PersonalInfoCard 
                  profile={profile ?? EMPTY_PROFILE } 
                  //onSave={(updated) =>
                    //setProfile((prev) =>
                      //prev ? { ...prev, ...updated } : prev
                    //)
                  //}
                  onSave={(updated) =>
                    setProfile((prev) =>
                      prev
                        ? { ...prev, ...updated } // edit existing
                        : { id: Date.now(), ...updated } // create new
                    )
                  }
                />
              )}
             

              <div className="flex flex-col gap-5">
                <ContactCard />
                <SecurityCard />
              </div>
            </div>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-10 py-6">

      <div className="flex justify-between items-center w-full  h-13">
          {/* Tabs */}
          <div className="flex gap-0 p-2 rounded-full h-13 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center text-sm gap-2 px-6 py-2 rounded-full transition-all ${
                  activeTab === tab.id
                    ? "bg-[#E6EEF7] text-[#474747]"
                    : "text-[#A8A8A8] hover:bg-gray-200/30"
                }`}
              >
                {tab.label}
              </button>
            ))}

          </div>
            {/** Admin publish Button */}
            {admin && mode === "create" && (
                <button 
                  onClick={()=> alert("Published")}
                  className="cursor-pointer flex p-2 text-sm px-3 rounded-lg  gap-2 items-center bg-[#003F7F] text-white"
                >
                  <FiUpload size={17}/> 
                  Publish
                  
                </button>
            )}
      </div>
      

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default ResearcherDashboard;