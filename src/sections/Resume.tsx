import { useEffect, useRef, useState } from "react";
import DonutChart from "@/components/Donut_Chat";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";


const hideScrollbar = "scrollbar-hide"; // keep your class

type Skill = { name: string; level: number };
type Language = { name: string; percent: number; label: string };
type Degree = { year: string; title: string; field: string; school: string; id: number };
type Experience = { year: string; title: string; company: string; description: string; id: number };

export default function Resume({ editable = true }: { editable?: boolean } ) {

  const skillsRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);
  const degreeRef = useRef<HTMLDivElement | null>(null);
  const expRef = useRef<HTMLDivElement | null>(null);

  // DATA STATE (can be replaced with API data)
  const [technicalSkills, setTechnicalSkills] = useState<Skill[]>([
    { name: "UI Design", level: 90 },
    { name: "C", level: 60 },
    { name: "Python", level: 80 },
    { name: "Java", level: 95 },
  ]);
  const [softSkills, setSoftSkills] = useState<Skill[]>([
    { name: "Communication", level: 85 },
    { name: "Team Work", level: 90 },
    { name: "Problem Solving", level: 80 },
  ]);

  const [languages, setLanguages] = useState<Language[]>([
    { name: "English", percent: 100, label: "Proficient" },
    { name: "French", percent: 50, label: "Fluent" },
    { name: "Spanish", percent: 43, label: "Intermediate" },
    { name: "Italian", percent: 18, label: "Basic" },
  ]);

  // THREE DOT MENU STATE
  const [showMenu, setShowMenu] = useState(false)

  // THREE DOT MENU STATE AND REF
  const [openLangMenu, setOpenLangMenu] = useState<number | null>(null);
  const langMenuRef = useRef<HTMLDivElement | null>(null);


  const [degrees, setDegrees] = useState<Degree[]>([
    { id: 1, year: "2018-2020", title: "Bachelors", field: "Software Engineering", school: "University of Buea" },
    { id: 2, year: "2020", title: "Cloud Computing", field: "Certificate", school: "Udemy" },
  ]);

  const [experience, setExperience] = useState<Experience[]>([
    { id: 1, year: "2018-2025", title: "Sr. UX Designer", company: "Intechs", description: "Maximize your tax returns and minimize common errors with our expert guidance." },
    { id: 2, year: "2018-2025", title: "Sr. UX Designer", company: "Intechs", description: "Maximize your tax returns and minimize common errors with our expert guidance." },
  ]);

  // FORM / MODAL STATE
  const [showForm, setShowForm] = useState(false);
  const [formKind, setFormKind] = useState<"degree" | "experience" | "language" | "skill">("skill");
  const [editingId, setEditingId] = useState<number | null>(null); // id for degree/exp/lang -> use index for skills
  
  // generic form data
  const [form, setForm] = useState<any>({
    // skill fields:
    isTechnical: true,
    name: "",
    level: 50,
    // language fields:
    percent: 50,
    label: "",
    // degree fields:
    year: "",
    title: "",
    field: "",
    school: "",
    // experience fields:
    company: "",
    description: "",
  });

  // validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Open add modal
  const openAddForm = (kind: typeof formKind) => {
    setFormKind(kind);
    setEditingId(null);
    // default values
    setForm({
      isTechnical: kind === "skill" ? true : undefined,
      name: "",
      level: 50,
      percent: 50,
      label: "",
      year: "",
      title: "",
      field: "",
      school: "",
      company: "",
      description: "",
    });
    setErrors({});
    setShowForm(true);
  };

  // Open edit modal with prefill
  const openEditForm = (kind: typeof formKind, idxOrId: number) => {
    setFormKind(kind);
    setEditingId(idxOrId);
    setErrors({});

    if (kind === "skill") {
      // idxOrId is index: first look through both arrays - we encode negative idx for soft skills
      const idx = idxOrId;
      if (idx >= 0) {
        const s = technicalSkills[idx];
        setForm({ isTechnical: true, name: s.name, level: s.level });
      } else {
        const s = softSkills[-idx - 1];
        setForm({ isTechnical: false, name: s.name, level: s.level });
      }
    } else if (kind === "language") {
      const idx = idxOrId;
      const l = languages[idx];
      setForm({ name: l.name, percent: l.percent, label: l.label });
    } else if (kind === "degree") {
      const d = degrees.find((x) => x.id === idxOrId);
      setForm({ year: d?.year ?? "", title: d?.title ?? "", field: d?.field ?? "", school: d?.school ?? "" });
    } else if (kind === "experience") {
      const e = experience.find((x) => x.id === idxOrId);
      setForm({ year: e?.year ?? "", title: e?.title ?? "", company: e?.company ?? "", description: e?.description ?? "" });
    }

    setShowForm(true);
  };

  // Delete handlers
  const deleteSkill = (isTechnical: boolean, idx: number) => {
    if (isTechnical) setTechnicalSkills((s) => s.filter((_, i) => i !== idx));
    else setSoftSkills((s) => s.filter((_, i) => i !== idx));
  };
  const deleteLanguage = (idx: number) => setLanguages((l) => l.filter((_, i) => i !== idx));
  const deleteDegree = (id: number) => setDegrees((d) => d.filter((x) => x.id !== id));
  const deleteExperience = (id: number) => setExperience((e) => e.filter((x) => x.id !== id));

  // Validation
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (formKind === "skill") {
      if (!form.name || form.name.trim() === "") errs.name = "Name required";
      if (!form.level && form.level !== 0) errs.level = "Level required";
    } else if (formKind === "language") {
      if (!form.name || form.name.trim() === "") errs.name = "Name required";
      if (form.percent === undefined || form.percent === null) errs.percent = "Percent required";
      if (!form.label || form.label.trim() === "") errs.label = "Label required";
    } else if (formKind === "degree") {
      if (!form.title || form.title.trim() === "") errs.title = "Title required";
      if (!form.field || form.field.trim() === "") errs.field = "Field required";
      if (!form.school || form.school.trim() === "") errs.school = "School required";
      if (!form.year || form.year.trim() === "") errs.year = "Year required";
    } else if (formKind === "experience") {
      if (!form.title || form.title.trim() === "") errs.title = "Title required";
      if (!form.company || form.company.trim() === "") errs.company = "Company required";
      if (!form.description || form.description.trim() === "") errs.description = "Description required";
      if (!form.year || form.year.trim() === "") errs.year = "Year required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit (create or save)
  const submitForm = () => {
    if (!validateForm()) return;

    // SKILL
    if (formKind === "skill") {
      if (editingId === null) {
        // add
        const entry = { name: form.name.trim(), level: Number(form.level) || 0 };
        if (form.isTechnical) setTechnicalSkills((s) => [...s, entry]);
        else setSoftSkills((s) => [...s, entry]);
      } else {
        // editing: editingId encoding: >=0 technical index, <0 soft index -> -idx-1
        const idx = editingId;
        if (idx >= 0) {
          setTechnicalSkills((s) => s.map((it, i) => (i === idx ? { ...it, name: form.name, level: Number(form.level) } : it)));
        } else {
          const softIdx = -idx - 1;
          setSoftSkills((s) => s.map((it, i) => (i === softIdx ? { ...it, name: form.name, level: Number(form.level) } : it)));
        }
      }
      setShowForm(false);
      return;
    }

    // LANGUAGE
    if (formKind === "language") {
      if (editingId === null) {
        setLanguages((l) => [...l, { name: form.name.trim(), percent: Number(form.percent) || 0, label: form.label.trim() }]);
      } else {
        const idx = editingId;
        setLanguages((l) => l.map((it, i) => (i === idx ? { ...it, name: form.name, percent: Number(form.percent), label: form.label } : it)));
      }
      setShowForm(false);
      return;
    }

    // DEGREE
    if (formKind === "degree") {
      if (editingId === null) {
        setDegrees((d) => [...d, { id: Date.now(), title: form.title.trim(), field: form.field.trim(), school: form.school.trim(), year: form.year.trim() }]);
      } else {
        setDegrees((d) => d.map((it) => (it.id === editingId ? { ...it, title: form.title, field: form.field, school: form.school, year: form.year } : it)));
      }
      setShowForm(false);
      return;
    }

    // EXPERIENCE
    if (formKind === "experience") {
      if (editingId === null) {
        setExperience((e) => [...e, { id: Date.now(), title: form.title.trim(), company: form.company.trim(), description: form.description.trim(), year: form.year.trim() }]);
      } else {
        setExperience((e) => e.map((it) => (it.id === editingId ? { ...it, title: form.title, company: form.company, description: form.description, year: form.year } : it)));
      }
      setShowForm(false);
      return;
    }
  };

  // helpers: open edit skill with special index encoding
  const onEditSkill = (isTechnical: boolean, idx: number) => {
    const encoded = isTechnical ? idx : -idx - 1;
    openEditForm("skill", encoded);
  };


  // close three dot menu when user clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(e.target as Node)
      ) {
        setOpenLangMenu(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
















  return (

    <section 
      id="resume" 
      className={`py-10 relative ${!editable ? "min-h-screen" : "" }`}
    >

      {!editable && (
        <h2 className="text-center text-3xl text-gray-700 tracking-[5px] mb-8">Resume</h2>
      )}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-10">
          {/* Skills */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm tracking-widest text-gray-500">MY SKILLS</h3>
              {editable && (
                <button onClick={() => openAddForm("skill")} className="cursor-pointer rounded-full bg-gray-100 p-2">
                  <FiPlus />
                </button>
              )}
            </div>

            <div ref={skillsRef} className={`bg-white p-6 rounded-xl shadow-md border border-gray-200 max-h-[245px] overflow-y-auto ${hideScrollbar}`}>
              
                  {/** TECHNICAL SKILLS */}
              <h4 className="text-[#33557D] mb-3">Technical Skills</h4>

              {/** for when there are no technical skills */}
              {technicalSkills.length === 0 && (
                <p className="text-gray-500 italic text-center py-4">
                  No skills added yet
                </p>
              )}

              {technicalSkills.map((skill, i) => (
                <div key={i} className="ml-4 mb-4 flex items-center">
                  {editable && (
                    <button onClick={() => deleteSkill(true, i)} className="cursor-pointer mr-3 text-red-400">
                      <FiX />
                    </button>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span className="whitespace-nowrap">{skill.name}</span>

                      <div className="mx-4 w-full h-1 bg-gray-200 rounded">
                        <div className="h-1 bg-blue-900 rounded" style={{ width: `${skill.level}%` }} />
                      </div>

                      <span>{skill.level}%</span>
                    </div>
                  </div>

                  {editable && (
                    <div className="ml-3 flex gap-2">
                      <button onClick={() => onEditSkill(true, i)} className="cursor-pointer text-[#33557D] p-1 rounded-full bg-white shadow-sm"><FiEdit2 /></button>
                    </div>
                  )}
                </div>
              ))}

                    {/** SOFT SKILLS */}
              <h4 className="text-[#33557D] mt-6 mb-3">Soft Skills</h4>

              {/** for when there are no soft skills */}
              {softSkills.length === 0 && (
                <p className="text-gray-500 italic text-center py-4">
                  No skills added yet
                </p>
              )}

              {softSkills.map((skill, i) => (
                <div key={i} className="ml-4 mb-4 flex items-center">
                  {editable && (
                    <button onClick={() => deleteSkill(false, i)} className="cursor-pointer mr-3 text-red-400">
                      <FiX />
                    </button>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span className="whitespace-nowrap">{skill.name}</span>

                      <div className="mx-4 w-full h-1 bg-gray-200 rounded">
                        <div className="h-1 bg-blue-900 rounded" style={{ width: `${skill.level}%`, color: "#33557D"}} />
                      </div>

                      <span>{skill.level}%</span>
                    </div>
                  </div>

                  {editable && (
                    <div className="ml-3 flex gap-2">
                      <button onClick={() => onEditSkill(false, i)} className="cursor-pointer text-[#33557D] p-1 rounded-full bg-white shadow-sm"><FiEdit2 /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

              {/* Languages */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm tracking-widest text-gray-500">LANGUAGES I SPEAK</h3>
              {editable && <button onClick={() => openAddForm("language")} className="cursor-pointer rounded-full bg-gray-100 p-2"><FiPlus /></button>}
            </div>

            <div className="flex justify-center">
              <div ref={langRef} className={`flex gap-0 overflow-x-auto ${hideScrollbar} pb-2`}>
                {languages.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-6">
                      No languages added yet
                   </p>
                ) : (
                  languages.map((lang, i) => (
                  <div key={i} className="flex flex-col items-center min-w-[140px] relative">
                    
                    {/* Three dot menu */}
                    {editable && (
                      <div className="absolute -top-3 right-4 z-20">
                        <button onClick={() =>
                            setOpenLangMenu(openLangMenu === i ? null : i)
                          }
                          className="cursor-pointer p-1 font-semibold text-[#33557D] rounded-full"
                        >
                          ⋮
                        </button>
                      </div>
                    )}

                    {/* edit/delete overlay */}
                    {openLangMenu === i && (
                      <div ref={langMenuRef} className="absolute shadow-lg  right-6 bg-white rounded-bl-xl rounded-tl-xl shadow-md flex flex-col items-center overflow-hidden z-10">
                        <button onClick={() => {openEditForm("language", i); setOpenLangMenu(null); }} className="bg-white p-2 hover:bg-gray-100"><FiEdit2 /></button>
                        <button onClick={() => {deleteLanguage(i); setOpenLangMenu(null); }} className="bg-white p-2 hover:bg-red-100 text-red-600"><FiTrash2 /></button>
                      </div>
                    )}

                    <DonutChart percentage={lang.percent} />

                    <p className="mt-3 text-[#5F5F5F]">{lang.name}</p>
                    <span className="text-xs bg-[#003F7F]/10 text-[#33557D] px-3 py-1 rounded-full mt-1">{lang.label}</span>
                  </div>
                ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-10">
          {/* Degrees */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm tracking-widest text-gray-500">DEGREES / CERTIFICATIONS</h3>
              {editable && <button onClick={() => openAddForm("degree")} className="cursor-pointer rounded-full bg-gray-100 p-2"><FiPlus /></button>}
            </div>

                 {/** for when there are no degree */}
            {degrees.length === 0 && (
              <p className="text-gray-500 italic text-center py-4">
                  No degrees / certifications added yet
              </p>
            )}

            <div className="flex justify-center">
              <div ref={degreeRef} className={`flex gap-6 overflow-x-auto ${hideScrollbar} pb-4`}>
                {degrees.map((d) => (
                  <div key={d.id} className="min-w-[260px] bg-[#2f557f] text-white p-4 rounded-xl shadow-md relative">
                    {/* small overlay icons */}
                    {editable && (
                      <div className="absolute right-3 top-4 flex gap-2">
                        <button onClick={() => openEditForm("degree", d.id)} className="cursor-pointer bg-white/20 p-1 rounded text-white"><FiEdit2 /></button>
                        <button onClick={() => deleteDegree(d.id)} className="cursor-pointer bg-white/20 p-1 rounded text-red-300 "><FiTrash2 /></button>
                      </div>
                    )}

                    <span className={`text-xs bg-white/20 px-3 py-1 rounded-full  ${editable ? "float-left" : "float-right"}`}>{d.year}</span>
                    <h4 className="text-2xl font-bold mt-6">{d.title}</h4>
                    <p>{d.field}</p>
                    <p className="text-sm mt-2">{d.school}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

              {/* Experience */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm tracking-widest text-gray-500">EXPERIENCE</h3>
              {editable && <button onClick={() => openAddForm("experience")} className="cursor-pointer rounded-full bg-gray-100 p-2"><FiPlus /></button>}
            </div>

            {/** for when there are no experiences */}
            {experience.length === 0 && (
              <p className="text-gray-500 italic mt-25 text-center py-4">
                No experiences added yet
              </p>
            )}

            <div ref={expRef} className={`flex gap-6 overflow-x-auto ${hideScrollbar} pb-4`}>
              {experience.map((e) => (
                <div key={e.id} className="min-w-[270px] min-h-[240px] bg-white shadow-md border border-gray-200 p-5 pt-9 pb-9 rounded-xl relative">
                  {editable && (
                    <div className="absolute right-5 top-9 flex gap-2">
                      <button onClick={() => openEditForm("experience", e.id)} className="cursor-pointer bg-white p-1 text-[#33557D] rounded"><FiEdit2 /></button>
                      <button onClick={() => deleteExperience(e.id)} className="cursor-pointer bg-white p-1 rounded text-red-500"><FiTrash2 /></button>
                    </div>
                  )}

                  <span className={`text-xs bg-[#E8EEF3] text-[#33557D] px-3 py-1 rounded-full  ${editable ? "float-left" : "float-right"}`}>{e.year}</span>
                  <h4 className="text-[#33557D] text-2xl font-semibold mt-8">{e.title}</h4>
                  <p className="text-gray-600">{e.company}</p>
                  <p className="text-sm text-gray-500 mt-2">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>






      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowForm(false)} />
          <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold tracking-widest">
                {editingId === null ? "Add" : "Edit"}{" "}
                {formKind === "skill" ? "Skill" : formKind.charAt(0).toUpperCase() + formKind.slice(1)}
              </h3>
              <button onClick={() => setShowForm(false)} className="cursor-pointer hover:text-red-500  text-gray-500 text-lg"><FiX /></button>
            </div>

            <div className="space-y-4 ">
              {formKind === "skill" && (
                <>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" checked={form.isTechnical} onChange={() => setForm((f:any)=>({...f, isTechnical:true}))} />
                      Technical
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" checked={!form.isTechnical} onChange={() => setForm((f:any)=>({...f, isTechnical:false}))} />
                      Soft
                    </label>
                  </div>

                  <div>
                    <input
                      placeholder="Skill name"
                      className="w-full  border-b border-gray-300 px-3 py-2 rounded focus:border-blue-600 outline-none"
                      value={form.name}
                      onChange={(e) => { setForm((f:any)=>({...f, name: e.target.value})); if (errors.name) setErrors((s)=>{ const copy = {...s}; delete copy.name; return copy; }); }}
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Level (%)</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={form.level}
                      onChange={(e) => { setForm((f:any)=>({...f, level: Number(e.target.value)})); if (errors.level) setErrors((s)=>{ const c={...s}; delete c.level; return c; }); }}
                      className="w-full "
                    />
                    <div className="text-sm text-gray-600">{form.level}%</div>
                    {errors.level && <div className="text-red-500 text-sm mt-1">{errors.level}</div>}
                  </div>
                </>
              )}

              {formKind === "language" && (
                <>
                  <div>
                    <input placeholder="Language" className="w-full border-b border-gray-300 px-3 py-2 rounded focus:border-blue-600 outline-none" value={form.name} onChange={(e)=>{ setForm((f:any)=>({...f, name:e.target.value})); if(errors.name) setErrors((s)=>{ const c={...s}; delete c.name; return c; }); }} />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                  </div>
                  <div>
                    <input type="number" min={0} max={100} placeholder="Percent" className="w-full border-b border-gray-300 px-3 py-2 rounded focus:border-blue-600 outline-none" value={form.percent} onChange={(e)=>{ setForm((f:any)=>({...f, percent:Number(e.target.value)})); if(errors.percent) setErrors((s)=>{ const c={...s}; delete c.percent; return c; }); }} />
                    {errors.percent && <div className="text-red-500 text-sm mt-1">{errors.percent}</div>}
                  </div>
                  <div>
                    <input placeholder="Label (e.g. Fluent)" className="w-full border-b border-gray-300 px-3 py-2 rounded focus:border-blue-600 outline-none" value={form.label} onChange={(e)=>{ setForm((f:any)=>({...f, label:e.target.value})); if(errors.label) setErrors((s)=>{ const c={...s}; delete c.label; return c; }); }} />
                    {errors.label && <div className="text-red-500 text-sm mt-1">{errors.label}</div>}
                  </div>
                </>
              )}

              {formKind === "degree" && (
                <>
                  <div><input placeholder="Year (e.g. 2018-2020)" className="focus:border-blue-600 outline-none w-full border-b border-gray-300 px-3 py-2 rounded" value={form.year} onChange={(e)=>{ setForm((f:any)=>({...f, year:e.target.value})); if(errors.year) setErrors((s)=>{ const c={...s}; delete c.year; return c; }); }} />{errors.year && <div className="text-red-500 text-sm mt-1">{errors.year}</div>}</div>
                  <div><input placeholder="Title (e.g. Bachelors)" className="focus:border-blue-600 outline-none w-full border-b border-gray-300 px-3 py-2 rounded" value={form.title} onChange={(e)=>{ setForm((f:any)=>({...f, title:e.target.value})); if(errors.title) setErrors((s)=>{ const c={...s}; delete c.title; return c; }); }} />{errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}</div>
                  <div><input placeholder="Field (e.g. Software Engineering)" className="focus:border-blue-600 outline-none w-full border-b border-gray-300 px-3 py-2 rounded" value={form.field} onChange={(e)=>{ setForm((f:any)=>({...f, field:e.target.value})); if(errors.field) setErrors((s)=>{ const c={...s}; delete c.field; return c; }); }} />{errors.field && <div className="text-red-500 text-sm mt-1">{errors.field}</div>}</div>
                  <div><input placeholder="School" className="focus:border-blue-600 outline-none w-full border-b border-gray-300 focus:border-blue-600 px-3 py-2 rounded" value={form.school} onChange={(e)=>{ setForm((f:any)=>({...f, school:e.target.value})); if(errors.school) setErrors((s)=>{ const c={...s}; delete c.school; return c; }); }} />{errors.school && <div className="text-red-500 text-sm mt-1">{errors.school}</div>}</div>
                </>
              )}

              {formKind === "experience" && (
                <>
                  <div><input placeholder="Year (e.g. 2018-2025)" className="focus:border-blue-600 outline-none w-full border-b border-gray-300 px-3 py-2 rounded" value={form.year} onChange={(e)=>{ setForm((f:any)=>({...f, year:e.target.value})); if(errors.year) setErrors((s)=>{ const c={...s}; delete c.year; return c; }); }} />{errors.year && <div className="text-red-500 text-sm mt-1">{errors.year}</div>}</div>
                  <div><input placeholder="Title" className="focus:border-blue-600 outline-none w-full border-b border-gray-300 px-3 py-2 rounded" value={form.title} onChange={(e)=>{ setForm((f:any)=>({...f, title:e.target.value})); if(errors.title) setErrors((s)=>{ const c={...s}; delete c.title; return c; }); }} />{errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}</div>
                  <div><input placeholder="Company" className="focus:border-blue-600 outline-none w-full border-b border-gray-300 px-3 py-2 rounded" value={form.company} onChange={(e)=>{ setForm((f:any)=>({...f, company:e.target.value})); if(errors.company) setErrors((s)=>{ const c={...s}; delete c.company; return c; }); }} />{errors.company && <div className="text-red-500 text-sm mt-1">{errors.company}</div>}</div>
                  <div><textarea placeholder="Description" rows={4} className="focus:border-blue-600 outline-none w-full border border-gray-300 px-3 py-2 rounded" value={form.description} onChange={(e)=>{ setForm((f:any)=>({...f, description:e.target.value})); if(errors.description) setErrors((s)=>{ const c={...s}; delete c.description; return c; }); }} />{errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}</div>
                </>
              )}

              <div className="flex justify-center gap-4 pt-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 cursor-pointer rounded-3xl border border-gray-400 text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={submitForm} className="px-4 py-2 cursor-pointer rounded-3xl bg-[#003F7F] hover:bg-[#004F9F] text-white">{editingId === null ? "Create" : "Save"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
