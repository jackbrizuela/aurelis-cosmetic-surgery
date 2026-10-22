// Treatment menu content for the Aurelis pitch demo.
// Facts (time, recovery, sessions) are typical ranges from general patient
// information. The operating clinic must confirm every value before launch.

const surgeryConsult =
  "Your surgeon reviews your anatomy, medical history and goals. You'll discuss the proposed approach, alternatives and the option of having no treatment.";
const surgeryPlan =
  "Discuss anaesthesia, preparation, scarring, recovery and the risks of the procedure. Results and healing vary. Follow-up visits form part of the plan.";
const skinConsult =
  "Your clinician assesses the area and your medical history, then explains the exact product, its local regulatory status, alternatives and whether it suits you.";
const skinPlan =
  "Benefits, limits, side effects, reasons a treatment may be unsuitable and aftercare depend on the product and on you. A product name in this demo does not confirm approval or availability.";

const surgery = (id, name, group, summary, time, recovery) => ({
  id, name, group, summary, time, recovery, sessions: 'One procedure',
  consult: surgeryConsult, plan: surgeryPlan, kind: 'surgery',
});
const skin = (id, name, group, summary, time, recovery, sessions) => ({
  id, name, group, summary, time, recovery, sessions,
  consult: skinConsult, plan: skinPlan, kind: 'skin',
});

export const categories = {
  surgery: {
    label: 'Surgical',
    interest: 'Cosmetic surgery',
    title: 'Cosmetic surgery',
    intro: "Face, breast and body procedures. Start with an assessment of your goals and the options that may suit you.",
    image: 'menu-surgical',
    alt: "Side-profile portrait of a woman in an ivory top.",
    groups: ['Face', 'Breast', 'Body'],
    items: [
      surgery('blepharoplasty', 'Blepharoplasty', 'Face',
        "Surgery for excess eyelid skin and tissue. The assessment distinguishes appearance concerns from problems that need functional eye care.",
        '1 to 2 hours', 'About 10 to 14 days'),
      surgery('rhinoplasty', 'Rhinoplasty', 'Face',
        "Surgery to change the nose's shape in relation to your face. Discuss breathing, existing structure and any previous surgery.",
        '2 to 3 hours', '1 to 2 weeks, swelling settles over months'),
      surgery('buccal', 'Buccal fat removal', 'Face',
        "Removes selected cheek fat. Discuss how your face may change over time and the risk of a hollow appearance.",
        'Under 1 hour', 'About 1 week'),
      surgery('chin', 'Chin augmentation', 'Face',
        "Surgery to change chin projection and facial proportions. Compare the proposed approach with non-surgical alternatives.",
        '1 to 2 hours', 'About 1 to 2 weeks'),
      surgery('breast-augmentation', 'Breast augmentation', 'Breast',
        "Surgery to change breast volume and proportions. Discuss implant choice, long-term considerations and risks.",
        '1 to 2 hours', 'About 1 to 2 weeks before light work'),
      surgery('breast-lift', 'Breast lift (mastopexy)', 'Breast',
        "Surgery to change breast shape and position. The approach depends on your tissue, skin, goals and the scars involved.",
        '2 to 3 hours', 'About 2 weeks'),
      surgery('breast-reduction', 'Breast reduction', 'Breast',
        "Removes selected breast tissue and skin. Discuss your goals, any related symptoms and the scarring involved.",
        '2 to 4 hours', 'About 2 to 3 weeks'),
      surgery('liposuction', 'Liposuction', 'Body',
        "Removes selected fat deposits to change body contours. It is not a weight-loss treatment; skin quality affects suitability.",
        '1 to 3 hours', 'About 1 to 2 weeks, compression for several weeks'),
      surgery('body-contouring', 'Body contouring', 'Body',
        "A term for different operations that reshape the body and may remove excess skin. Your consultation should define the exact procedure.",
        'Depends on the procedure', 'Depends on the procedure'),
      surgery('abdominoplasty', 'Tummy tuck (abdominoplasty)', 'Body',
        "Surgery for excess abdominal skin and changes in the underlying muscles. Discuss your medical history, future plans and scarring.",
        '2 to 4 hours', 'About 2 to 4 weeks'),
    ],
  },
  skin: {
    label: 'Non-surgical',
    interest: 'Skin and injectables',
    title: 'Skin and injectables',
    intro: "Compare skin treatments, injectables and contouring options, including their limits and aftercare.",
    image: 'menu-skin',
    alt: "Close-up of a face with fingertips resting against the skin.",
    groups: ['Skin', 'Injectables', 'Contour'],
    items: [
      skin('nctf', 'NCTF skin booster', 'Skin',
        "A skin treatment using an NCTF formulation. Ask which formulation is proposed, its intended use and the evidence relevant to your goals.",
        '30 to 45 minutes', 'Small bumps for 1 to 2 days', 'Usually a course of 3 to 5 sessions'),
      skin('prx', 'PRX skin treatment', 'Skin',
        "A peel-based treatment applied to the skin. Discuss the proposed treatment and how it compares with other skin options.",
        'About 30 minutes', 'Little to none', 'Often a short series of sessions'),
      skin('rejuran', 'Rejuran', 'Skin',
        "An injectable skin treatment. Discuss the exact product, its intended use, suitability and local regulatory status.",
        '30 to 45 minutes', 'Small bumps for 1 to 2 days', 'Usually 3 sessions, a few weeks apart'),
      skin('biostimulators', 'Biostimulators', 'Skin',
        "Products intended to produce gradual changes in the skin. Discuss the exact product, expected changes, risks and follow-up.",
        '30 to 45 minutes', 'Swelling for a few days', '1 to 3 sessions, results build over months'),
      skin('botox', 'Botox (anti-wrinkle)', 'Injectables',
        'Botulinum toxin is a prescription medicine. Assessment, prescribing and treatment require an appropriately qualified clinician.',
        '15 to 30 minutes', 'Usually none', 'Repeated every few months if wanted'),
      skin('fillers', 'Dermal fillers', 'Injectables',
        "Fillers are used to add volume or change contours. Discuss the exact product, your anatomy and the risks, including potentially serious complications.",
        '30 to 60 minutes', 'Swelling or bruising for a few days', 'Usually one session, with a review'),
      skin('threads', 'Ultra V threads', 'Contour',
        "Thread treatments vary by material and technique. Discuss the exact proposal, who it may suit, its limits and risks.",
        '45 to 60 minutes', 'Swelling or bruising for about a week', 'Usually one session'),
      skin('aqualyx', 'Aqualyx', 'Contour',
        "An injectable product proposed for small areas of fat. Ask about its local regulatory status, evidence, reasons it may be unsuitable and alternatives.",
        'About 30 minutes', 'Swelling for a few days', 'Usually 2 to 4 sessions'),
      skin('lemon-bottle', 'Lemon Bottle', 'Contour',
        "Discuss the exact product before considering treatment. This demo makes no claim about its approval, safety or effectiveness.",
        'Discussed at consultation', 'Discussed at consultation', 'Discussed at consultation'),
    ],
  },
  wellness: {
    label: 'Stem cell',
    interest: 'Stem cell information',
    title: "Understand stem cell proposals",
    intro: "Learn what is being proposed, what evidence supports it and which questions to ask before deciding.",
    image: 'menu-stemcell',
    alt: "Glass ampoules arranged on a pale surface.",
    groups: [],
    items: [
      {
        id: 'autologous', name: "Cells from your own body", kind: 'wellness',
        summary: "Autologous means cells come from the person receiving them. Ask what tissue is collected, how the cells are prepared and why they would be given back.",
        consult: "Which cells are involved? What condition is the proposal for? Who oversees it, and what local authorisation does it have?",
        plan: "Using your own cells does not by itself make a treatment safe or effective. Many advertised uses are still unproven or under investigation.",
      },
      {
        id: 'evidence', name: "Evidence for the proposed use", kind: 'wellness',
        summary: "Evidence for one cell type, condition or method does not prove that a different treatment works. Ask about the exact proposal.",
        consult: "Ask for evidence for that condition, independent review, regulatory status and details of any registered clinical trial.",
        plan: "Claims should match evidence for the specific treatment and use. This demo makes no promise about anti-ageing or treating a range of conditions.",
      },
      {
        id: 'questions', name: "Questions before you decide", kind: 'wellness',
        summary: "Discuss the treatment, evidence, possible harms, alternatives, cost and follow-up. Ask who is responsible if something goes wrong.",
        consult: "Request written information and verifiable clinician qualifications. Allow time to discuss the proposal with an independent doctor.",
        plan: "Testimonials do not replace clinical evidence. Joining a trial does not guarantee a benefit. Seek relevant evidence and independent medical advice.",
      },
    ],
  },
};

export const references = {
  surgery: [{ label: 'The Aesthetic Society patient resources', href: 'https://www.theaestheticsociety.org/patient-resources' }],
  skin: [{ label: 'The Aesthetic Society patient resources', href: 'https://www.theaestheticsociety.org/patient-resources' }],
  wellness: [
    { label: 'ISSCR patient guide', href: 'https://www.isscr.org/resources/patient-guide' },
    { label: 'US FDA consumer information', href: 'https://www.fda.gov/vaccines-blood-biologics/consumers-biologics/important-patient-and-consumer-information-about-regenerative-medicine-therapies' },
  ],
};

export const doctors = [
  {
    name: 'Dr. Elena Marceau', role: 'Aesthetic surgery', image: 'doctor-1',
    focus: ["Facial assessment", 'Breast surgery', 'Body contouring'],
    bio: "Discusses face, breast and body procedures, including the alternatives, risks and what to expect before deciding on a plan.",
  },
  {
    name: 'Dr. Adrian Reyes', role: 'Facial aesthetics', image: 'doctor-2',
    focus: ['Facial assessment', 'Injectables', 'Treatment planning'],
    bio: "Helps you compare non-surgical facial treatments and understand whether an option suits your goals.",
  },
  {
    name: 'Dr. Isabel Laurent', role: 'Skin and wellness', image: 'doctor-3',
    focus: ['Skin consultations', 'Patient education', 'Follow-up care'],
    bio: "Discusses skin concerns and follow-up care, and helps you understand the questions and evidence behind stem cell proposals.",
  },
];

export const clinics = {
  makati: { venue: 'The Makati Atelier', short: 'Makati' },
  bgc: { venue: 'The BGC Residence', short: 'BGC' },
};
