export const  piliers =[
    ['1- Gouvernance du système de santé',[
      ['a. Coordination ','a. Coordination '],
      ['b. Planification','b. Planification'],
      ['c. Suivi','c. Suivi'],
      ['d. Evaluation ','d. Evaluation '],
      ['e. Fonctionnement  ','e. Fonctionnement '],
    ]
    ],

    ['2- Infrastructures et Equipements',[
      ['a. Infrastructures','a. Infrastructures'],
      ['b. Equipement ','b. Equipement '],
      ['c. Maintenance ','c. Maintenance ']
    ]
    ],

    ['3- Prestations de services ',[
      ['a. Curative','a. Curative'],
      ['b. Préventive','b. Préventive'],
      ['c. Promotionnel','c. Promotionnel'],
      ['d. Réadaptation ','d. Réadaptation '],
    ]
    ],

    ['4- Système d’information sanitaire et sociale',[
      ['a. Gouvernance  ','a. Gouvernance  '],
      ['b. Gestion','b. Gestion'],
      ['c. Utilisation','c. Utilisation']
    ]
    ],

    ['5- Gestion des produits de santé',[
      ['a. Production','a. Production'],
      ['b. Commande','b. Commande'],
      ['a. Distribution','a. Distribution'],
      ['b. Stockage','b. Stockage'],
    ]
    ],

    ['6- Ressources humaines en santé ',[
      ['a. Recrutement','a. Recrutement'],
      ['b. Formation','b. Formation']
    ]
    ],

    ['7- Protection sociale',[
      ['a. Assurance obligatoire ','a. Assurance obligatoire '],
      ['b. Assurance volontaire ','b. Assurance volontaire '],
      ['c. Assistance médicale psychosociale','c. Assistance médicale psychosociale'],
    ]
    ],
  ]

  export const typeOng =[
    ['NATIONAL','NATIONAL'],
    ['INTERNATIONAL','INTERNATIONAL']
  ];

  export const typePtf =[
    ['BILATERAL','BILATERAL'],
    ['MULTILATERAL','MULTILATERAL']
  ]
  export const agentExecution =[
    ['ONG','ONG'],
    ['ASSOCIATION BENEFICIAIRE','ASSOCIATION BENEFICIAIRE']
  ]


export const acteurs =[
    ['PTF','PTF'],
    ['ONG','ONG'],
    ['EPS','EPS'],
    ['SPS','SPS'],
    ['Etat','Etat'],
    ['CT','CT', true],
    ['Secteur privé non sanitaire','Secteur privé non sanitaire', true]
  ]

  export const tyepeSps =[
    ['Publique','Publique'],
    ['privée','privée'],
    ['Etc...','Etc...'],
  ]

  export const sourceFinancements ={
    "Etat": [
         ['Institutions','Institutions'],
         ['Ministères','Ministères'],
         ['Agences','Agences'],
       ],
    
   
   "CT": [
          ['Départements','Départements'],
          ['Communes','Communes'],
      ],

   "PTF": [
          ['Bilatéral','Bilatéral'],
          ['Multilatéral','Multilatéral'],
      ],

    "ONG": [
          ['Nationales','Nationales'],
          ['Internationales','Internationales']
      ],

  "SPS": [
          ['Entreprises','Entreprises'],
          ['Etablisements de santé','Etablisements de santé'],
          ['Agences','Agences'],
      ],

  "EPS": [
          ['Entreprises','Entreprises'],
          ['Etablisements de santé','Etablisements de santé'],
          ['Agences','Agences'],
      ],

  "SPNS": [
      ['Entreprises','Entreprises'],
      ['Agences de santé','Agences de santé'],
    ],

  "Ménages" : [
      ['CDS, Conseil d\'administration', 'CDS Conseil d\'administration'],
      ['Particulier','Particulier']
    ],

  "Société civile": [
        ['CICODEV','CICODEV'],
        ['Association consommateurs ','Association consommateurs ']
      ],
    
  }
export const dimentions =[
    ['mis_en_comun','Mis en commun'],
    ['achat_service','Achat service'],
    ['mobilisation_fonds','mobilisation des fonds']
  ]
  
export const typeAchat =[
    ['Passif','Passif'],
    ['Stratégique','Stratégique']
  ]
  
export const districts =[
    ['District ','District 1 selon la commune'],
    ['District 1','District 2 selon la commune']
  ]

  export const mecanismeFinance =[
    ['Budget ','Budget'],
    ['subvention','subvention'],
    ['Dons','Dons'],
    ['Prêts','Prêts'],
    ['Paiements','Paiements'],
  ];

  

  export const fetchAllContries = function(fn){
    return  fetch('http://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => fn(data));
  }