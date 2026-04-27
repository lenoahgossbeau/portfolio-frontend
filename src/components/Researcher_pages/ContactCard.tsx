import { useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import EditContactInfoModal from "./editContactInfoModal";
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';

export default function ContactCard() {
  const { language } = useLanguage();

  // Données temporaires (à remplacer par API plus tard)
  const [contact, setContact] = useState({
    gmail: "ekwogejunior@gmail.com",
    linkedIn: "https://www.linkedin.com/in/ekwoge",
    whatsapp: "https://wa.me/627151221212",
    x: "https://x.com/username",
    github: "https://github.com/username",
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 h-78">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-base font-medium text-gray-700">{t('contact', language)}</h2>
        <button onClick={() => setIsEditing(true)} className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm">✏️</button>
      </div>

      <EditContactInfoModal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        data={contact}
        onSave={setContact}
      />

      <div className="space-y-4 mt-8 text-sm flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <MdEmail size={20}/>
          <a className="text-blue-600 hover:underline" href="#">
            {contact.gmail}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <FaLinkedin size={20}/>
          <a className="text-blue-600 hover:underline" href="#">
            {contact.linkedIn}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <FaWhatsapp size={20}/>
          <a className="text-blue-600 hover:underline" href="#">
            {contact.whatsapp}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <FaXTwitter size={20}/>
          <a className="text-blue-600 hover:underline" href="#">
            {contact.x}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <FaGithub size={20}/>
          <a className="text-blue-600 hover:underline" href="#">
            {contact.github}
          </a>
        </div>
      </div>
    </div>
  );
}