type Translations = {
  [key: string]: {
    fr: string;
    en: string;
  };
};

export const translations: Translations = {
  // Navbar
  'nav_home': { fr: 'Accueil', en: 'Home' },
  'nav_about': { fr: 'À propos', en: 'About' },
  'nav_project': { fr: 'Projet', en: 'Project' },
  'nav_publication': { fr: 'Publication', en: 'Publication' },
  'nav_resume': { fr: 'CV', en: 'Resume' },
  'nav_about_me': { fr: 'À propos de moi', en: 'About me' },
  'nav_contact': { fr: 'Contact', en: 'Contact' },
  'login': { fr: 'Connexion', en: 'Login' },
  'logout': { fr: 'Déconnexion', en: 'Logout' },
  'register': { fr: 'Inscription', en: 'Register' },
  'software_engineer': { fr: 'Ingénieur logiciel', en: 'Software engineer' },

  // Home page
  'hello_title': { fr: 'Bonjour, je suis', en: 'Hello, I\'m' },
  'get_in_touch': { fr: 'Me contacter', en: 'Get in touch' },
  'about_summary': { fr: 'Un ingénieur logiciel passionné spécialisé dans la création de solutions web modernes, responsives et conviviales.', en: 'A passionate software engineer specializing in building modern, responsive, and user-friendly web solutions.' },

  // Sections
  'project_section': { fr: 'Projets', en: 'Projects' },
  'publication_section': { fr: 'Publications', en: 'Publications' },
  'resume_section': { fr: 'CV', en: 'Resume' },
  'about_section': { fr: 'À propos', en: 'About' },
  'loading': { fr: 'Chargement...', en: 'Loading...' },
  'view_all': { fr: 'Voir tout', en: 'View All' },
  'show_less': { fr: 'Voir moins', en: 'Show Less' },
  'no_data': { fr: 'Aucune donnée disponible', en: 'No data available' },

  // About section
  'hi_im': { fr: 'Salut, je suis', en: 'Hi, I\'m' },
  'about_text': { fr: 'Je suis un ingénieur logiciel passionné par la création de solutions numériques percutantes. Je me concentre sur une architecture propre, des systèmes évolutifs et une conception centrée sur l\'utilisateur pour fournir des applications efficaces et modernes. Mon travail combine l\'excellence technique avec la créativité pour résoudre des problèmes concrets.', en: 'I am a software engineer passionate about building impactful digital solutions. I focus on clean architecture, scalable systems, and user-centered design to deliver efficient and modern applications. My work combines technical excellence with creativity to solve real-world problems.' },

  // Buttons
  'create': { fr: 'Créer', en: 'Create' },
  'cancel': { fr: 'Annuler', en: 'Cancel' },
  'save': { fr: 'Enregistrer', en: 'Save' },
  'delete': { fr: 'Supprimer', en: 'Delete' },
  'edit': { fr: 'Modifier', en: 'Edit' },
  'publish': { fr: 'Publier', en: 'Publish' },
  'export': { fr: 'Exporter', en: 'Export' },

  // Contact
  'contact_name': { fr: 'Nom', en: 'Name' },
  'contact_message': { fr: 'Message', en: 'Message' },
  'contact_send': { fr: 'Envoyer', en: 'Send' },
  'contact_success': { fr: 'Message envoyé avec succès', en: 'Message sent successfully' },

  // Inchtechs / Public pages
  'browse_researchers': { fr: 'Découvrir les chercheurs', en: 'Browse researchers' },
  'welcome_inchtechs': { fr: 'Bienvenue sur InchTechs', en: 'Welcome to InchTechs' },
  'platform_description': { fr: 'Plateforme de portfolios pour chercheurs', en: 'Portfolio platform for researchers' },

  // Resume/CV section
  'my_skills': { fr: 'Mes compétences', en: 'My Skills' },
  'technical_skills': { fr: 'Compétences techniques', en: 'Technical Skills' },
  'soft_skills': { fr: 'Compétences relationnelles', en: 'Soft Skills' },
  'degrees_certifications': { fr: 'Diplômes / Certifications', en: 'Degrees / Certifications' },
  'experience': { fr: 'Expérience', en: 'Experience' },
  'languages_i_speak': { fr: 'Langues parlées', en: 'Languages I speak' },
  'social_media': { fr: 'Réseaux sociaux', en: 'Social Media' },

  // Languages
  'english': { fr: 'Anglais', en: 'English' },
  'french': { fr: 'Français', en: 'French' },
  'spanish': { fr: 'Espagnol', en: 'Spanish' },
  'italian': { fr: 'Italien', en: 'Italian' },

  // Language levels
  'proficient': { fr: 'Courant', en: 'Proficient' },
  'fluent': { fr: 'Courant', en: 'Fluent' },
  'intermediate': { fr: 'Intermédiaire', en: 'Intermediate' },
  'basic': { fr: 'Débutant', en: 'Basic' },

  'ui_design': { fr: 'Design UI', en: 'UI Design' },
  'certificate': { fr: 'Certificat', en: 'Certificate' },
  'sr_ux_designer': { fr: 'Designer UX Senior', en: 'Sr. UX Designer' },
  'bachelors': { fr: 'Licence', en: 'Bachelor\'s' },
  'cloud_computing': { fr: 'Cloud Computing', en: 'Cloud Computing' },

  // Admin Dashboard
  'accounts': { fr: 'Comptes', en: 'Accounts' },
  'subscriptions': { fr: 'Abonnements', en: 'Subscriptions' },
  'total': { fr: 'Total', en: 'Total' },
  'active': { fr: 'Actif', en: 'Active' },
  'inactive': { fr: 'Inactif', en: 'Inactive' },
  'new': { fr: 'Nouveau', en: 'New' },
  'search': { fr: 'Rechercher', en: 'Search' },
  'no_accounts': { fr: 'Aucun compte trouvé', en: 'No accounts found' },
  'no_subscriptions': { fr: 'Aucun abonnement', en: 'No subscriptions' },
  'profile_id': { fr: 'ID Profil', en: 'Profile ID' },
  'start_date': { fr: 'Date début', en: 'Start Date' },
  'end_date': { fr: 'Date fin', en: 'End Date' },
  'type': { fr: 'Type', en: 'Type' },
  'payment_method': { fr: 'Moyen de paiement', en: 'Payment Method' },
  'total_revenue': { fr: 'Revenu total', en: 'Total Revenue' },
  'renewal_rate': { fr: 'Taux de renouvellement', en: 'Renewal Rate' },
  'dashboard_title': { fr: 'Tableau de bord administrateur', en: 'Admin Dashboard' },
  'total_subscriptions': { fr: 'Total des abonnements', en: 'Total Subscriptions' },
  'id': { fr: 'ID', en: 'ID' },

  // Researcher Dashboard
  'dashboard': { fr: 'Tableau de bord', en: 'Dashboard' },
  'profile': { fr: 'Profil', en: 'Profile' },
  'personal_info': { fr: 'Informations personnelles', en: 'Personal Info' },
  'contact': { fr: 'Contact', en: 'Contact' },
  'security': { fr: 'Sécurité', en: 'Security' },
  'password': { fr: 'Mot de passe', en: 'Password' },
  'title': { fr: 'Titre', en: 'Title' },
  'date': { fr: 'Date', en: 'Date' },
  'description': { fr: 'Description', en: 'Description' },
  'link': { fr: 'Lien', en: 'Link' },
  'authors': { fr: 'Auteurs', en: 'Authors' },
  'add_author': { fr: 'Ajouter un auteur et appuyer sur Entrée', en: 'Add author & press Enter' },
};

export function t(key: string, lang: string): string {
  if (translations[key] && translations[key][lang.toLowerCase()]) {
    return translations[key][lang.toLowerCase()];
  }
  return key;
}