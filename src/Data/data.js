/* export const pilierData = {
  "1- Gouvernance du système de santé": [
    ["a. Coordination ", "a. Coordination "],
    ["b. Planification", "b. Planification"],
    ["c. Suivi", "c. Suivi"],
    ["d. Evaluation ", "d. Evaluation "],
    ["e. Fonctionnement  ", "e. Fonctionnement "],
  ],

  "2- Infrastructures et Equipements": [
    ["a. Infrastructures", "a. Infrastructures"],
    ["b. Equipement ", "b. Equipement "],
    ["c. Maintenance ", "c. Maintenance "],
  ],

  "3- Prestations de services ": [
    ["a. Curative", "a. Curative"],
    ["b. Préventive", "b. Préventive"],
    ["c. Promotionnel", "c. Promotionnel"],
    ["d. Réadaptation ", "d. Réadaptation "],
  ],

  "4- Système d’information sanitaire et sociale": [
    ["a. Gouvernance  ", "a. Gouvernance  "],
    ["b. Gestion", "b. Gestion"],
    ["c. Utilisation", "c. Utilisation"],
  ],

  "5- Gestion des produits de santé": [
    ["a. Production", "a. Production"],
    ["b. Commande", "b. Commande"],
    ["a. Distribution", "a. Distribution"],
    ["b. Stockage", "b. Stockage"],
  ],

  "6- Ressources humaines en santé ": [
    ["a. Recrutement", "a. Recrutement"],
    ["b. Formation", "b. Formation"],
  ],

  "7- Protection sociale": [
    ["a. Assurance obligatoire ", "a. Assurance obligatoire "],
    ["b. Assurance volontaire ", "b. Assurance volontaire "],
    [
      "c. Assistance médicale psychosociale",
      "c. Assistance médicale psychosociale",
    ],
  ],
}; */

export const pilierData = {
  "Gouvernance du système de santé": [
    ["Coordination ", "Coordination "],
    ["Planification", "Planification"],
    ["Suivi", "Suivi"],
    ["Evaluation ", "Evaluation "],
    ["Fonctionnement  ", "Fonctionnement "],
  ],

  "Infrastructures et Equipements": [
    ["Infrastructures", "Infrastructures"],
    ["Equipement ", "Equipement "],
    ["Maintenance ", "Maintenance "],
  ],

  "Prestations de services ": [
    ["Curative", "Curative"],
    ["Préventive", "Préventive"],
    ["Promotionnel", "Promotionnel"],
    ["Réadaptation ", "Réadaptation "],
  ],

  "Système d’information sanitaire et sociale": [
    ["Gouvernance  ", "Gouvernance  "],
    ["Gestion", "Gestion"],
    ["Utilisation", "Utilisation"],
  ],

  "Gestion des produits de santé": [
    ["Production", "Production"],
    ["Commande", "Commande"],
    ["Distribution", "Distribution"],
    ["Stockage", "Stockage"],
  ],

  "Ressources humaines en santé ": [
    ["Recrutement", "Recrutement"],
    ["Formation", "Formation"],
  ],

  "Protection sociale": [
    ["Assurance obligatoire ", "Assurance obligatoire "],
    ["Assurance volontaire ", "Assurance volontaire "],
    ["Assistance médicale psychosociale", "Assistance médicale psychosociale"],
  ],
};

export const typeOng = [
  ["NATIONAL", "NATIONAL"],
  ["INTERNATIONAL", "INTERNATIONAL"],
];

export const typeStructureRse = [
  ["Centre de santé", "Centre de santé"],
  ["Poste de santé", "Poste de santé"],
  ["Case de santé", "Case de santé"],
  ["Hôpital", "Hôpital"],
];

export const typeBesoinRse = [
  ["Infrastructures", "Infrastructures"],
  ["Logistiques roulantes", "Logistiques roulantes"],
  ["Equipements", "Equipements"],
  ["Formation", "Formation"],
  ["Subvention", "Subvention"],
];

export const niveauUrgence = [
  "Critique",
  "Urgent",
  "Relativement urgent",
  "Pas urgent",
];

export const typeActeurs = {
  ONG: ["NATIONALE", "INTERNATIONALE"],
  PTF: ["BILATERAL", "MULTILATERAL"],
  SPS: [
    "Cabinet médical généraliste",
    "Cabinet médical spécialiste",
    "Cabinet paramédical",
    "Laboratoire",
    "Imagerie",
    "Opticien",
  ],
  EPS: ["Niveau 1", "Niveau 2", "Niveau 3"],
  RSE: ["Ministère", "Enreprise", "Structure de santé", "Collectivité locale"],
};

export const cabinetSpecialite = [
  ["Gynéco-obstétrique", "Gynéco-obstétrique"],
  ["Odontostomatologie", "Odontostomatologie"],
  ["ORL", "ORL"],
  ["Urologie", "Urologie"],
  ["Anesthésie-réanimation", "Anesthésie-réanimation"],
  ["Cardiologie", "Cardiologie"],
  ["Dermatologie", "Dermatologie"],
  ["Endocrinologie-métabolisme", "Endocrinologie-métabolisme"],
  ["Gastro-entérologie", "Gastro-entérologie"],
  ["Médecine interne", "Médecine interne"],
  ["Néphrologie-hémodialyse", "Néphrologie-hémodialyse"],
  ["Neurologie", "Neurologie"],
  ["Ophtalmologie", "Ophtalmologie"],
  ["Pédiatrie", "Pédiatrie"],
  ["Pneumologie", "Pneumologie"],
  ["Psychiatrie/psychologie", "Psychiatrie/psychologie"],
  ["Appareillage", "Appareillage"],
  ["Kinésithérapie", "Kinésithérapie"],
  ["Autre", "Autre"],
];

export const agentExecution = [
  ["ONG", "ONG"],
  ["ASSOCIATION BENEFICIAIRE", "ASSOCIATION BENEFICIAIRE"],
];

export const acteurs = [
  ["EPS", "EPS"],
  ["SPS", "SPS"],
  ["PTF", "PTF"],
  ["ONG", "ONG"],
  ["RSE", "RSE"],
];

export const tyepeSps = [
  ["Publique", "Publique"],
  ["privée", "privée"],
  ["Etc...", "Etc..."],
];

export const sourceFinancements = {
  Etat: [
    ["Institutions", "Institutions"],
    ["Ministères", "Ministères"],
    ["Agences", "Agences"],
  ],

  CT: [
    ["Départements", "Départements"],
    ["Communes", "Communes"],
  ],

  PTF: [
    ["Bilatéral", "Bilatéral"],
    ["Multilatéral", "Multilatéral"],
  ],

  ONG: [
    ["Nationales", "Nationales"],
    ["Internationales", "Internationales"],
  ],

  SPS: [
    ["Entreprises", "Entreprises"],
    ["Etablisements de santé", "Etablisements de santé"],
    ["Agences", "Agences"],
  ],

  EPS: [
    ["Entreprises", "Entreprises"],
    ["Etablisements de santé", "Etablisements de santé"],
    ["Agences", "Agences"],
  ],

  SPNS: [
    ["Entreprises", "Entreprises"],
    ["Agences de santé", "Agences de santé"],
  ],

  Ménages: [
    ["CDS, Conseil d'administration", "CDS Conseil d'administration"],
    ["Particulier", "Particulier"],
  ],

  "Société civile": [
    ["CICODEV", "CICODEV"],
    ["Association consommateurs ", "Association consommateurs "],
  ],
};
export const dimentions = [
  ["mis_en_comun", "Mis en commun"],
  ["achat_service", "Achat service"],
  ["mobilisation_fonds", "mobilisation des fonds"],
];

export const typeAchat = [
  ["Passif", "Passif"],
  ["Stratégique", "Stratégique"],
];

export const mecanismeFinance = [
  ["subvention", "subvention"],
  ["Transfert ", "Transfert"],
  ["Recettes ", "Recettes"],
  ["Dons", "Dons"],
  ["Autres", "Autres"],
];

export const fetchAllContries = function (fn) {
  return fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((data) => fn(data));
};
