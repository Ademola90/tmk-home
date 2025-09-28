export interface LocalGovernment {
  name: string;
  code: string;
}

export interface State {
  name: string;
  code: string;
  localGovernments: LocalGovernment[];
}

export const nigerianStates: State[] = [
  {
    name: "Abia",
    code: "AB",
    localGovernments: [
      { name: "Aba North", code: "ABN" },
      { name: "Aba South", code: "ABS" },
      { name: "Arochukwu", code: "ARO" },
      { name: "Bende", code: "BEN" },
      { name: "Ikwuano", code: "IKW" },
      { name: "Isiala Ngwa North", code: "ISN" },
      { name: "Isiala Ngwa South", code: "ISS" },
      { name: "Isuikwuato", code: "ISU" },
      { name: "Obi Ngwa", code: "OBN" },
      { name: "Ohafia", code: "OHA" },
      { name: "Osisioma", code: "OSI" },
      { name: "Ugwunagbo", code: "UGW" },
      { name: "Ukwa East", code: "UKE" },
      { name: "Ukwa West", code: "UKW" },
      { name: "Umuahia North", code: "UMN" },
      { name: "Umuahia South", code: "UMS" },
      { name: "Umu Nneochi", code: "UMU" },
    ],
  },
  {
    name: "Adamawa",
    code: "AD",
    localGovernments: [
      { name: "Demsa", code: "DEM" },
      { name: "Fufure", code: "FUF" },
      { name: "Ganye", code: "GAN" },
      { name: "Gayuk", code: "GAY" },
      { name: "Gombi", code: "GOM" },
      { name: "Grie", code: "GRI" },
      { name: "Hong", code: "HON" },
      { name: "Jada", code: "JAD" },
      { name: "Lamurde", code: "LAM" },
      { name: "Madagali", code: "MAD" },
      { name: "Maiha", code: "MAI" },
      { name: "Mayo Belwa", code: "MAY" },
      { name: "Michika", code: "MIC" },
      { name: "Mubi North", code: "MUN" },
      { name: "Mubi South", code: "MUS" },
      { name: "Numan", code: "NUM" },
      { name: "Shelleng", code: "SHE" },
      { name: "Song", code: "SON" },
      { name: "Toungo", code: "TOU" },
      { name: "Yola North", code: "YON" },
      { name: "Yola South", code: "YOS" },
    ],
  },
  {
    name: "Osun",
    code: "OS",
    localGovernments: [
      { name: "Aiyedaade", code: "AIY" },
      { name: "Aiyedire", code: "AID" },
      { name: "Atakunmosa East", code: "ATE" },
      { name: "Atakunmosa West", code: "ATW" },
      { name: "Boluwaduro", code: "BOL" },
      { name: "Boripe", code: "BOR" },
      { name: "Ede North", code: "EDN" },
      { name: "Ede South", code: "EDS" },
      { name: "Egbedore", code: "EGB" },
      { name: "Ejigbo", code: "EJI" },
      { name: "Ife Central", code: "IFC" },
      { name: "Ife East", code: "IFE" },
      { name: "Ife North", code: "IFN" },
      { name: "Ife South", code: "IFS" },
      { name: "Ifedayo", code: "IFD" },
      { name: "Ifelodun", code: "IFL" },
      { name: "Ila", code: "ILA" },
      { name: "Ilesa East", code: "ILE" },
      { name: "Ilesa West", code: "ILW" },
      { name: "Irepodun", code: "RLG" },
      { name: "Irewole", code: "IRW" },
      { name: "Isokan", code: "ISO" },
      { name: "Iwo", code: "IWO" },
      { name: "Obokun", code: "OBO" },
      { name: "Odo Otin", code: "ODO" },
      { name: "Ola Oluwa", code: "OLA" },
      { name: "Olorunda", code: "OLO" },
      { name: "Oriade", code: "ORI" },
      { name: "Orolu", code: "ORO" },
      { name: "Osogbo", code: "OSO" },
    ],
  },
  {
    name: "Lagos",
    code: "LA",
    localGovernments: [
      { name: "Agege", code: "AGE" },
      { name: "Ajeromi-Ifelodun", code: "AJE" },
      { name: "Alimosho", code: "ALI" },
      { name: "Amuwo-Odofin", code: "AMU" },
      { name: "Apapa", code: "APA" },
      { name: "Badagry", code: "BAD" },
      { name: "Epe", code: "EPE" },
      { name: "Eti Osa", code: "ETI" },
      { name: "Ibeju-Lekki", code: "IBE" },
      { name: "Ifako-Ijaiye", code: "IFA" },
      { name: "Ikeja", code: "IKE" },
      { name: "Ikorodu", code: "IKO" },
      { name: "Kosofe", code: "KOS" },
      { name: "Lagos Island", code: "LAI" },
      { name: "Lagos Mainland", code: "LAM" },
      { name: "Mushin", code: "MUS" },
      { name: "Ojo", code: "OJO" },
      { name: "Oshodi-Isolo", code: "OSH" },
      { name: "Shomolu", code: "SHO" },
      { name: "Surulere", code: "SUR" },
    ],
  },
  {
    name: "Oyo",
    code: "OY",
    localGovernments: [
      { name: "Afijio", code: "AFI" },
      { name: "Akinyele", code: "AKI" },
      { name: "Atiba", code: "ATI" },
      { name: "Atisbo", code: "ATS" },
      { name: "Egbeda", code: "EGB" },
      { name: "Ibadan North", code: "IBN" },
      { name: "Ibadan North-East", code: "INE" },
      { name: "Ibadan North-West", code: "INW" },
      { name: "Ibadan South-East", code: "ISE" },
      { name: "Ibadan South-West", code: "ISW" },
      { name: "Ibarapa Central", code: "IBC" },
      { name: "Ibarapa East", code: "IBE" },
      { name: "Ibarapa North", code: "IBN" },
      { name: "Ido", code: "IDO" },
      { name: "Irepo", code: "IRE" },
      { name: "Iseyin", code: "ISE" },
      { name: "Itesiwaju", code: "ITE" },
      { name: "Iwajowa", code: "IWA" },
      { name: "Kajola", code: "KAJ" },
      { name: "Lagelu", code: "LAG" },
      { name: "Ogbomoso North", code: "OGN" },
      { name: "Ogbomoso South", code: "OGS" },
      { name: "Ogo Oluwa", code: "OGO" },
      { name: "Olorunsogo", code: "OLO" },
      { name: "Oluyole", code: "OLU" },
      { name: "Ona Ara", code: "ONA" },
      { name: "Orelope", code: "ORE" },
      { name: "Ori Ire", code: "ORI" },
      { name: "Oyo", code: "OYO" },
      { name: "Oyo East", code: "OYE" },
      { name: "Saki East", code: "SAE" },
      { name: "Saki West", code: "SAW" },
      { name: "Surulere", code: "SUR" },
    ],
  },
  // Add more states as needed...
];

export const getStateByName = (stateName: string): State | undefined => {
  return nigerianStates.find(
    (state) => state.name.toLowerCase() === stateName.toLowerCase()
  );
};

export const getLGAsByState = (stateName: string): LocalGovernment[] => {
  const state = getStateByName(stateName);
  return state ? state.localGovernments : [];
};
