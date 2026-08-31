/* Zavoryn portfolio configuration.
   WEBSITE PROJECTS: edit this list when adding a new live website.
   VISUAL CATALOGUES: do NOT edit code; upload images into assets/img/... on GitHub.
*/
window.ZAVORYN_PORTFOLIO = {
  repo: { owner: "zavorynofficial", name: "zavoryn-portfolio", branch: "main" },
  websites: [
    { title:"Dental Growth Experience", category:"Healthcare", description:"Conversion-focused dental website concept with a clear consultation journey.", cover:"assets/img/website-development/dental-growth.svg", url:"project-dental.html", label:"Concept project" },
    { title:"Med Spa Lead System", category:"Beauty & Wellness", description:"A calm, premium lead-generation experience built around offers and enquiry flow.", cover:"assets/img/website-development/medspa-lead-system.svg", url:"project-medspa.html", label:"Concept project" },
    { title:"Property Conversion Site", category:"Real Estate", description:"A property discovery experience designed to make browsing and enquiries simpler.", cover:"assets/img/website-development/property-conversion.svg", url:"project-realestate.html", label:"Concept project" }
  ],
  brandCategories: [
    {key:"logos", label:"Logos", folder:"assets/img/brand-designing/logos"},
    {key:"letterheads", label:"Letterheads", folder:"assets/img/brand-designing/letterheads"},
    {key:"business-cards", label:"Business Cards", folder:"assets/img/brand-designing/business-cards"},
    {key:"stationery", label:"Stationery", folder:"assets/img/brand-designing/stationery"},
  ],
  folders: { social:"assets/img/social-media-management", posts:"assets/img/post-designing", ai:"assets/img/ai-automation" }
};
