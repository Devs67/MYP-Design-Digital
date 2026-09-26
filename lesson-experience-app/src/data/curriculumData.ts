import { ClassData, DesignQuote, StrandDescriptor } from '../types/curriculum';

export const CLASSES_DATA: Record<string, ClassData> = {
  "myp2a": {
    "id": "myp2a",
    "grade": "MYP 2",
    "section": "2A",
    "name": "MYP 2A",
    "unitTitle": "Sensing Our World",
    "status": "Live",
    "kicker": "Lesson Flow — Running Log",
    "title": "Sensing Our World: MYP 2A",
    "intro": "Every logged class session in sequence, from global problem identification through to developing ideas — tracking progress across Criteria A and B.",
    "bannerImage": "images/unit_sensing_world_1790408347692.jpg",
    "facts": [
      {
        "label": "Class",
        "value": "MYP 2A Design"
      },
      {
        "label": "Unit",
        "value": "Sensing Our World"
      },
      {
        "label": "Sessions",
        "value": "6 logged"
      },
      {
        "label": "Updated",
        "value": "25 Sep 2026"
      }
    ],
    "unitFrame": {
      "title": "Unit Overview: Sensing Our World",
      "items": [
        {
          "label": "Key Concept",
          "value": "Systems"
        },
        {
          "label": "Related Concepts",
          "value": "Function · Adaptation"
        },
        {
          "label": "Global Context",
          "value": "Scientific & Technical Innovation"
        },
        {
          "label": "Inquiry Question",
          "value": "How can automated sensor circuits respond to environmental challenges?"
        }
      ],
      "quote": "Statement of Inquiry: Automated sensor systems adapt to environmental needs to enhance human well-being and solve practical challenges.",
      "note": "Students progress from problem analysis and PPC framework to circuit design and isometric enclosure sketches."
    },
    "lessons": [
      {
        "id": "myp2a-1",
        "sessionNumber": 1,
        "date": {
          "day": "08",
          "mon": "Sep",
          "sub": "10:15"
        },
        "title": "Global Problem Identification & Product Analysis",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": false,
        "strands": [
          "Strand i",
          "Strand ii",
          "Strand iii"
        ],
        "paragraphs": [
          "Explored global problem identification and analysis, then how to write a strong research question and simple research plan. Introduced the three research question categories — people, planet, system — with examples for each.",
          "Began product analysis: identifying an existing solution's components/parts and examining each one's purpose, function, and complexity, to surface gaps and opportunities for uniqueness."
        ],
        "note": {
          "label": "Follow-up:",
          "text": "check students can distinguish the three research question types independently, and apply the same components/purpose/function/complexity breakdown to a product of their own choosing."
        },
        "resources": [
          {
            "href": "https://docs.google.com/presentation/d/1cmkAMoP3hZTt7UuMA4QYQolI8zhAL3j8jLdWA09wzdU/edit",
            "label": "PPT ·",
            "text": "Existing Product Analysis & Evaluation"
          }
        ],
        "hasNoResource": false,
        "extraNote": "",
        "type": "lesson"
      },
      {
        "id": "myp2a-2",
        "sessionNumber": 2,
        "date": {
          "day": "10",
          "mon": "Sep",
          "sub": "08:45"
        },
        "title": "Product Analysis Using the PPC Framework",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": false,
        "strands": [
          "Strand iii · ongoing SA"
        ],
        "paragraphs": [
          "Continued applying the PPC Framework (Purpose, Process, Complexity) to an existing product similar to each student's chosen problem — breaking it into components and examining every part's purpose, process, and complexity."
        ],
        "note": {
          "label": "Follow-up:",
          "text": "check students apply all three PPC elements consistently across each component, not just purpose, and are starting to link complexity/process observations back to their own design problem."
        },
        "resources": [],
        "hasNoResource": true,
        "extraNote": "",
        "type": "lesson"
      },
      {
        "id": "myp2a-3",
        "sessionNumber": 3,
        "date": {
          "day": "15",
          "mon": "Sep",
          "sub": "10:15"
        },
        "title": "Completing Strand iii & Introducing Strand iv (Design Brief)",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": false,
        "strands": [
          "Strand iii → complete",
          "Strand iv → introduced"
        ],
        "paragraphs": [
          "Revisited and completed Strand iii — analysing existing sensor-based solutions for what works, what doesn't, and what to carry forward. Moved into Strand iv: the design brief must explicitly draw on findings from Strands i–iii rather than appear on its own."
        ],
        "note": {
          "label": "Follow-up:",
          "text": "finish design briefs, then move into success criteria — sets up Criterion B."
        },
        "resources": [
          {
            "href": "https://docs.google.com/presentation/d/1cmkAMoP3hZTt7UuMA4QYQolI8zhAL3j8jLdWA09wzdU/edit",
            "label": "PPT ·",
            "text": "Crit - A - iii - PPT"
          }
        ],
        "hasNoResource": false,
        "extraNote": "",
        "type": "lesson"
      },
      {
        "id": "myp2a-4",
        "sessionNumber": 4,
        "date": {
          "day": "17",
          "mon": "Sep",
          "sub": ""
        },
        "title": "Design Specifications, Testing & Success Criteria",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": false,
        "strands": [
          "Strand i · introduced"
        ],
        "paragraphs": [
          "Used a duster to model the workbook's six specification categories — Functional, User & Safety, Sensor & Input, Output/Feedback, Sustainability & Community Impact, Practical Constraint — pairing each with a testable success criterion (Part A), then discussing how it would actually be tested (Part B).",
          "Students began writing their own design specifications and success criteria for their sensor-based solution."
        ],
        "note": {
          "label": "Follow-up:",
          "text": "completed Part A across all six categories, then moved into Part B testing criteria."
        },
        "resources": [
          {
            "href": "https://docs.google.com/presentation/d/1rTLNH1OPsKOWqsuyQb4VmKLf_9ZArzpZxLi6qrs0c38/edit",
            "label": "PPT ·",
            "text": "Design Specifications & Testing Criteria"
          }
        ],
        "hasNoResource": false,
        "extraNote": "",
        "type": "lesson"
      },
      {
        "id": "myp2a-5",
        "sessionNumber": 5,
        "date": {
          "day": "22",
          "mon": "Sep",
          "sub": "est."
        },
        "title": "Isometric Sketching FA — Desktop Tissue Box Holder",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": false,
        "strands": [
          "Strand ii · FA"
        ],
        "paragraphs": [
          "Introduced isometric drawing — what it is and how a 3D object is represented along the three isometric axes. Students first practised using an online isometric drawing tool to build confidence before working on paper, and watched three tutorial videos on isometric sketching fundamentals.",
          "Students then completed the FA: a freehand isometric sketch of a desktop tissue box holder on isometric paper, focusing on accurate proportions, straight lines, and clearly representing visible features — building the sketching skill needed to communicate design ideas in Strand ii."
        ],
        "note": {
          "label": "Follow-up:",
          "text": "check line quality and proportion on submitted sketches, not just completion."
        },
        "resources": [
          {
            "href": "https://www.teacherled.com/iresources/shapesapp/index.html",
            "label": "Tool ·",
            "text": "TeacherLed Isometric Shapes App"
          },
          {
            "href": "https://drive.google.com/drive/folders/1eVjUq2zmwfVYfpvDn1v3K9neq1al1gF6?usp=drive_link",
            "label": "Folder ·",
            "text": "Videos to understand Isometric Drawings"
          }
        ],
        "hasNoResource": false,
        "extraNote": "Date estimated from the class's usual Tue/Thu meeting pattern — confirm with Dev.",
        "type": "formative"
      },
      {
        "id": "myp2a-6",
        "sessionNumber": 6,
        "date": {
          "day": "24",
          "mon": "Sep",
          "sub": "est."
        },
        "title": "Developing Ideas — Circuit Diagram & Product Drawing",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": true,
        "strands": [
          "Strand ii · requirements"
        ],
        "paragraphs": [
          "Discussed what Criterion B Strand ii (Developing Ideas) requires: for each design idea, students provide two annotated drawings — a circuit diagram showing how the sensor system is wired (built using Circuito.io), and a product sketch of the outer body/enclosure showing where the circuit will be housed, building directly on the isometric sketching skills from the FA. The workbook calls for three different creative concepts, each annotated to explain how it addresses their design specifications."
        ],
        "note": {
          "label": "Next:",
          "text": "students begin drafting circuit diagrams and product sketches for their design ideas."
        },
        "resources": [
          {
            "href": "https://www.circuito.io/",
            "label": "Tool ·",
            "text": "Circuito.io"
          },
          {
            "href": "https://docs.google.com/presentation/d/1ShcNnBRErrQZ8-nnsJAVSkdznEIGWTZy7jqOZf60ZY0/edit",
            "label": "PPT ·",
            "text": "Crit - B2 Design Workbook"
          }
        ],
        "hasNoResource": false,
        "extraNote": "Date estimated from the class's usual Tue/Thu meeting pattern — confirm with Dev.",
        "type": "lesson"
      }
    ]
  },
  "myp2d": {
    "id": "myp2d",
    "grade": "MYP 2",
    "section": "2D",
    "name": "MYP 2D",
    "unitTitle": "Sensing Our World",
    "status": "Live",
    "kicker": "Lesson Flow — Running Log",
    "title": "Sensing Our World: MYP 2D",
    "intro": "Every logged class session in sequence, from specifications through to technical drawings — tracking progress across Criteria A and B.",
    "bannerImage": "images/unit_sensing_world_1790408347692.jpg",
    "facts": [
      {
        "label": "Class",
        "value": "MYP 2D Design"
      },
      {
        "label": "Unit",
        "value": "Sensing Our World"
      },
      {
        "label": "Sessions",
        "value": "5 logged"
      },
      {
        "label": "Updated",
        "value": "25 Sep 2026"
      }
    ],
    "unitFrame": {
      "title": "Unit Overview: Sensing Our World",
      "items": [
        {
          "label": "Key Concept",
          "value": "Systems"
        },
        {
          "label": "Related Concepts",
          "value": "Function · Adaptation"
        },
        {
          "label": "Global Context",
          "value": "Scientific & Technical Innovation"
        },
        {
          "label": "Inquiry Question",
          "value": "How can automated sensor circuits respond to environmental challenges?"
        }
      ],
      "quote": "Statement of Inquiry: Automated sensor systems adapt to environmental needs to enhance human well-being and solve practical challenges.",
      "note": "Focuses on design specifications, appearance & circuit sketching, isometric FA, and technical drawings."
    },
    "lessons": [
      {
        "id": "myp2d-1",
        "sessionNumber": 1,
        "date": {
          "day": "08",
          "mon": "Sep",
          "sub": "08:45"
        },
        "title": "Writing Specifications",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": false,
        "strands": [
          "Strand i · introduced"
        ],
        "paragraphs": [
          "Completed Criterion A and moved into Criterion B: Developing Ideas, beginning with how to write good design specifications — the requirements a final product must meet to be considered successful. Rather than jumping straight into sketching ideas, the class spent time unpacking what actually makes a specification strong.",
          "Agreed as a class that a good specification must be specific (an exact requirement rather than a vague idea — e.g. an exact dimension rather than \"must fit in a bag\"), measurable (numbers, units, or a clear way to check the requirement has been met, so the final product can be tested against it), and justified (linked back to research or the client/user's needs, rather than personal preference)."
        ],
        "note": {
          "label": "Next:",
          "text": "students draft their own specifications, applying the specific/measurable/justified test to each requirement."
        },
        "resources": [
          {
            "href": "https://docs.google.com/presentation/d/1rTLNH1OPsKOWqsuyQb4VmKLf_9ZArzpZxLi6qrs0c38/edit",
            "label": "PPT ·",
            "text": "Design Specifications & Testing Criteria"
          }
        ],
        "hasNoResource": false,
        "extraNote": "",
        "type": "lesson"
      },
      {
        "id": "myp2d-2",
        "sessionNumber": 2,
        "date": {
          "day": "15",
          "mon": "Sep",
          "sub": "08:40"
        },
        "title": "Developing Feasible Ideas — Sketching Appearance and Circuit",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": false,
        "strands": [
          "Strand ii · introduced"
        ],
        "paragraphs": [
          "Continued Criterion B, focusing on how to develop feasible ideas from the specifications drafted earlier. Students were introduced to two required aspects of their idea sketches: the outer appearance (form, aesthetics, ergonomics of the product) and the circuit (sensor/component wiring and logic underlying the Arduino-based solution).",
          "Students began sketching their own ideas with both aspects in mind, ensuring that each idea is not just visually planned but also technically feasible in terms of the electronics behind it."
        ],
        "note": {
          "label": "Follow-up:",
          "text": "check that students are sketching both aspects for each idea rather than only the outer appearance, and that circuit sketches reflect the sensors/components relevant to their chosen problem."
        },
        "resources": [],
        "hasNoResource": true,
        "extraNote": "",
        "type": "lesson"
      },
      {
        "id": "myp2d-3",
        "sessionNumber": 3,
        "date": {
          "day": "17",
          "mon": "Sep",
          "sub": "10:15"
        },
        "title": "Finalising Idea Sketches, Moving into Evaluation",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": false,
        "strands": [
          "Strand ii · continuing",
          "Strand iii · introduced"
        ],
        "paragraphs": [
          "Continued Criterion B Strand ii, with students completing their idea sketches (outer appearance and circuit) begun in the previous session. Introduced the transition into Strand iii — evaluating each developed idea against the specifications and success criteria drafted earlier — as the basis for narrowing down to one final idea.",
          "Students started comparing their ideas ahead of selecting one final concept to take forward into detailed development."
        ],
        "note": {
          "label": "Next:",
          "text": "ensure each student has at least two to three fully sketched ideas (both aspects covered), then evaluate each against the specifications/success criteria to select one final idea."
        },
        "resources": [],
        "hasNoResource": true,
        "extraNote": "",
        "type": "lesson"
      },
      {
        "id": "myp2d-4",
        "sessionNumber": 4,
        "date": {
          "day": "22",
          "mon": "Sep",
          "sub": "Skills FA"
        },
        "title": "Isometric Sketching — Formative Assessment",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": false,
        "strands": [
          "Strand ii · skill-building"
        ],
        "paragraphs": [
          "Introduced isometric drawing — what it is and how objects are represented in isometric projection — and gave students time to practise using an online isometric drawing tool before moving to paper.",
          "Moved into the formative assessment: students watched three tutorial videos on isometric sketching technique, then applied the techniques to freehand-sketch a desktop tissue box holder on isometric paper, focusing on accurate proportions, straight lines, and clearly representing the product's visible features."
        ],
        "note": {
          "label": "Purpose:",
          "text": "builds the sketching skill students need to communicate their design ideas effectively in Criterion B strand ii."
        },
        "resources": [],
        "hasNoResource": true,
        "extraNote": "",
        "type": "formative"
      },
      {
        "id": "myp2d-5",
        "sessionNumber": 5,
        "date": {
          "day": "24",
          "mon": "Sep",
          "sub": "10:15"
        },
        "title": "Planning the Make & Technical Drawings",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": true,
        "strands": [
          "Strand iv · introduced"
        ],
        "paragraphs": [
          "Introduced Criterion B strand iv: what it covers and what's expected. Students learned they need to produce two things before moving into Criterion C.",
          "First, a plan for how they will create their product — a flowchart of the making process (e.g. collect materials, measure, cut, glue, etc.), split into two sections: how the circuit will be made, and how the product itself will be made. This flowchart sets the base for Criterion C strand i.",
          "Second, detailed and technical drawings of their selected idea — front, top, and side views — together with the circuit diagram."
        ],
        "note": {
          "label": "Next:",
          "text": "students draft their two-part making-process flowchart (circuit + product), then produce front/top/side technical drawings with the circuit diagram."
        },
        "resources": [],
        "hasNoResource": true,
        "extraNote": "",
        "type": "lesson"
      }
    ]
  },
  "myp3b": {
    "id": "myp3b",
    "name": "MYP 3B",
    "grade": "MYP 3",
    "section": "3B",
    "unitTitle": "App Design & User Experience",
    "status": "Live",
    "kicker": "Criterion B — Lesson Flow",
    "title": "Criterion B Lesson Flow: MYP 3B",
    "intro": "Developing mobile application solutions from design specifications through to user flow diagrams and high-fidelity interface wireframes.",
    "bannerImage": "images/unit_coding_change_1790408359855.jpg",
    "facts": [
      {
        "label": "Class",
        "value": "MYP 3B Design"
      },
      {
        "label": "Focus",
        "value": "Criterion B: Developing Ideas"
      },
      {
        "label": "Sessions",
        "value": "4 sessions logged"
      },
      {
        "label": "Cycle",
        "value": "App UX & Prototyping"
      }
    ],
    "unitFrame": {
      "title": "Unit Overview: App Design & User Experience",
      "items": [
        {
          "label": "Key Concept",
          "value": "Development"
        },
        {
          "label": "Related Concepts",
          "value": "Form · Ergonomics"
        },
        {
          "label": "Global Context",
          "value": "Scientific & Technical Innovation"
        },
        {
          "label": "Inquiry Question",
          "value": "How does intuitive interface design influence user behavior and accessibility?"
        }
      ],
      "quote": "Statement of Inquiry: Ergonomic interface development establishes intuitive navigation paths that optimize digital accessibility.",
      "note": "Focuses on user flow diagrams, interface wireframing, and design specification justification."
    },
    "lessons": [
      {
        "id": "myp3b-1",
        "sessionNumber": 1,
        "date": {
          "day": "08",
          "mon": "Sep",
          "sub": "11:35"
        },
        "title": "Developing Design Specifications",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": false,
        "isPlanned": false,
        "strands": [
          "Strand i"
        ],
        "paragraphs": [
          "Reviewed progress on the Design SA, then worked through the specification-development process using a water bottle as a shared example product."
        ],
        "listItems": [
          "Writing specification points that are SMART — Specific, Measurable, Achievable, Realistic, Time-bound",
          "Creating a testing method for each specification",
          "Writing success criteria so the design can be objectively evaluated"
        ],
        "quote": null,
        "resources": [],
        "hasNoResource": false,
        "type": "lesson"
      },
      {
        "id": "myp3b-2",
        "sessionNumber": 2,
        "date": {
          "day": "15",
          "mon": "Sep",
          "sub": "2026"
        },
        "title": "Justifying Ideas Against the Spec",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": false,
        "isPlanned": false,
        "strands": [
          "Strands i & ii"
        ],
        "paragraphs": [
          "Reviewed the Strand i TSC to confirm expectations, then unpacked how Strand ii should be approached — justifying a chosen idea and generating a genuine range of options."
        ],
        "listItems": [
          "What \"justifying against the specification\" means — linking an idea back to specific spec points, not just describing it",
          "What makes a range of ideas genuinely feasible, not small variations on one idea"
        ],
        "quote": null,
        "resources": [],
        "hasNoResource": false,
        "type": "lesson"
      },
      {
        "id": "myp3b-3",
        "sessionNumber": 3,
        "date": {
          "day": "",
          "mon": "",
          "sub": "Not yet delivered"
        },
        "title": "Present & Justify the Chosen Design",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": true,
        "isPlanned": false,
        "strands": [
          "Strand iii"
        ],
        "paragraphs": [
          "Planned as a cut-and-paste wireframe activity: students trial several layout approaches with a printable UI-element kit before committing to one, then justify that choice against specific spec lines rather than aesthetic preference."
        ],
        "listItems": [],
        "quote": null,
        "resources": [],
        "hasNoResource": false,
        "type": "lesson"
      },
      {
        "id": "myp3b-4",
        "sessionNumber": 4,
        "date": {
          "day": "22",
          "mon": "Sep",
          "sub": "11:35"
        },
        "title": "Planning the App: User Flow Diagrams",
        "criterion": "b",
        "critLabel": "Criterion B",
        "isLatest": false,
        "isPlanned": true,
        "strands": [
          "Strand iv"
        ],
        "paragraphs": [
          "Introduced user flow as a planning tool, modelled one in Figma using Spotify as the reference app, then students practiced building their own and received feedback on their portfolios."
        ],
        "listItems": [
          "What a user flow (screen-flow diagram) is and how to build one in Figma",
          "Worked example: mapping Spotify's user flow as a class",
          "Independent practice, plus portfolio feedback"
        ],
        "quote": null,
        "resources": [],
        "hasNoResource": false,
        "type": "lesson"
      }
    ]
  },
  "myp4": {
    "id": "myp4",
    "name": "MYP 4",
    "grade": "MYP 4",
    "section": "Grade 4",
    "unitTitle": "Coding for Change",
    "status": "Live",
    "kicker": "Lesson Flow — Running Log",
    "title": "Coding for Change: MYP 4",
    "intro": "Exploring community problem-solving through computational design, fishbone diagrams, CPFC analysis, and mobile wireframes.",
    "bannerImage": "images/unit_coding_change_1790408359855.jpg",
    "facts": [
      {
        "label": "Class",
        "value": "MYP 4 Design"
      },
      {
        "label": "Unit",
        "value": "Coding for Change"
      },
      {
        "label": "Criteria",
        "value": "Criterion A & B"
      },
      {
        "label": "Sessions",
        "value": "6 logged"
      }
    ],
    "unitFrame": null,
    "lessons": [
      {
        "id": "myp4-1",
        "sessionNumber": 1,
        "date": {
          "day": "03",
          "mon": "Aug",
          "sub": "Mon · 8:45 AM"
        },
        "title": "Digging Deeper with a Fishbone Diagram",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": false,
        "strands": [
          "STRAND I"
        ],
        "paragraphs": [
          "Purpose: Move past a surface-level problem statement toward its underlying causes, using a fishbone (Ishikawa) diagram — six cause categories, wide search before depth.",
          "Activity: Each student populated an individual fishbone diagram, sorting possible causes into categories, then went back through to flag which were already evidence-backed and which were still guesses.",
          "Produced: One populated fishbone diagram per student."
        ],
        "fields": [
          {
            "label": "Purpose",
            "value": "Move past a surface-level problem statement toward its underlying causes, using a fishbone (Ishikawa) diagram — six cause categories, wide search before depth."
          },
          {
            "label": "Activity",
            "value": "Each student populated an individual fishbone diagram, sorting possible causes into categories, then went back through to flag which were already evidence-backed and which were still guesses."
          },
          {
            "label": "Produced",
            "value": "One populated fishbone diagram per student."
          }
        ],
        "meta": {
          "title": "Suggested ATL · Learner Profile · GC link",
          "items": [
            {
              "label": "ATL focus",
              "value": "Critical thinking (Thinking skills) — gather and organise evidence to separate confirmed causes from assumptions."
            },
            {
              "label": "Learner profile",
              "value": "Inquirer, Knowledgeable"
            },
            {
              "label": "GC link",
              "value": "Yes — the causes sorted here are the \"changing physical, psychological, and social needs\" the SOI names."
            }
          ]
        },
        "resources": [],
        "hasNoResource": false,
        "type": "lesson"
      },
      {
        "id": "myp4-2",
        "sessionNumber": 2,
        "date": {
          "day": "05",
          "mon": "Aug",
          "sub": "Wed · 10:05 AM"
        },
        "title": "Planning What Information Is Still Needed",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": false,
        "strands": [
          "STRAND I & II"
        ],
        "paragraphs": [
          "Purpose: Turn the remaining gaps from the fishbone into a research plan matched to real, executable methods — the usual failure mode in Strand ii is a list of topics with no way to actually answer them.",
          "Activity: Students listed everything still needed to finish the strand, classified each item by the method that would genuinely produce it — survey, interview, existing-product analysis, secondary source — then began collecting information against that plan.",
          "Produced: An individual research plan matched to real methods, with the first primary data already coming in."
        ],
        "fields": [
          {
            "label": "Purpose",
            "value": "Turn the remaining gaps from the fishbone into a research plan matched to real, executable methods — the usual failure mode in Strand ii is a list of topics with no way to actually answer them."
          },
          {
            "label": "Activity",
            "value": "Students listed everything still needed to finish the strand, classified each item by the method that would genuinely produce it — survey, interview, existing-product analysis, secondary source — then began collecting information against that plan."
          },
          {
            "label": "Produced",
            "value": "An individual research plan matched to real methods, with the first primary data already coming in."
          }
        ],
        "meta": {
          "title": "Suggested ATL · Learner Profile · GC link",
          "items": [
            {
              "label": "ATL focus",
              "value": "Information literacy (Research skills) — match each information need to a real method for collecting it."
            },
            {
              "label": "Learner profile",
              "value": "Inquirer, Reflective"
            },
            {
              "label": "GC link",
              "value": "Carries forward — the research plan still targets the same lifestyle-choices problem from Strand i."
            }
          ]
        },
        "resources": [],
        "hasNoResource": false,
        "type": "lesson"
      },
      {
        "id": "myp4-3",
        "sessionNumber": 3,
        "date": {
          "day": "10",
          "mon": "Aug",
          "sub": "Mon · 8:45 AM"
        },
        "title": "Formative: Writing Research Questions",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": false,
        "strands": [
          "STRAND II"
        ],
        "paragraphs": [
          "Purpose: Formative check on students' ability to write well-formed research questions, ahead of committing them to the actual Strand ii planning document.",
          "Activity: Covered the different kinds of research questions, then students practised writing their own for Strand ii. Watched for questions that were closed or leading rather than genuinely open, and that traced back to real gaps from Aug 5 rather than duplicating known facts.",
          "Produced: Practice research questions, feeding directly into the planning template."
        ],
        "fields": [
          {
            "label": "Purpose",
            "value": "Formative check on students' ability to write well-formed research questions, ahead of committing them to the actual Strand ii planning document."
          },
          {
            "label": "Activity",
            "value": "Covered the different kinds of research questions, then students practised writing their own for Strand ii. Watched for questions that were closed or leading rather than genuinely open, and that traced back to real gaps from Aug 5 rather than duplicating known facts."
          },
          {
            "label": "Produced",
            "value": "Practice research questions, feeding directly into the planning template."
          }
        ],
        "meta": {
          "title": "Suggested ATL · Learner Profile · GC link",
          "items": [
            {
              "label": "ATL focus",
              "value": "Information literacy (Research skills) — formulate genuinely open, well-focused questions rather than closed or leading ones."
            },
            {
              "label": "Learner profile",
              "value": "Reflective, Knowledgeable"
            },
            {
              "label": "GC link",
              "value": "Carries forward — questions were checked against the real lifestyle-choices gaps from Aug 5, not generic prompts."
            }
          ]
        },
        "resources": [],
        "hasNoResource": false,
        "type": "formative"
      },
      {
        "id": "myp4-4",
        "sessionNumber": 4,
        "date": {
          "day": "17",
          "mon": "Aug",
          "sub": "Mon · 8:45 AM"
        },
        "title": "Analysing Existing Products — CPFC Framework",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": false,
        "strands": [
          "STRAND III"
        ],
        "paragraphs": [
          "Purpose: Analyse existing products that inspire a solution to the design problem, using a structured framework to identify what works, what doesn't, and why.",
          "Activity: Discussed how existing products should be analysed, then introduced CPFC (Components, Purposes, Flow, Complexities) as the working framework — the digital-product adaptation of the TSC's PPC, with Flow added since students are analysing app-based products. Briefly touched on SWOT and ACCESS FM as complementary tools.",
          "Produced: Analysis template introduced; next step is working through it individually toward the target product-count range."
        ],
        "fields": [
          {
            "label": "Purpose",
            "value": "Analyse existing products that inspire a solution to the design problem, using a structured framework to identify what works, what doesn't, and why."
          },
          {
            "label": "Activity",
            "value": "Discussed how existing products should be analysed, then introduced CPFC (Components, Purposes, Flow, Complexities) as the working framework — the digital-product adaptation of the TSC's PPC, with Flow added since students are analysing app-based products. Briefly touched on SWOT and ACCESS FM as complementary tools."
          },
          {
            "label": "Produced",
            "value": "Analysis template introduced; next step is working through it individually toward the target product-count range."
          }
        ],
        "meta": {
          "title": "Suggested ATL · Learner Profile · GC link",
          "items": [
            {
              "label": "ATL focus",
              "value": "Media literacy (Research skills) — seek a range of perspectives across multiple existing products, this unit's own stated ATL strand."
            },
            {
              "label": "Learner profile",
              "value": "Open-minded, Knowledgeable"
            },
            {
              "label": "GC link",
              "value": "Yes, where the products analysed are themselves health/lifestyle apps — same thread as the design problem."
            }
          ]
        },
        "resources": [],
        "hasNoResource": false,
        "type": "lesson"
      },
      {
        "id": "myp4-5",
        "sessionNumber": 5,
        "date": {
          "day": "09",
          "mon": "Sep",
          "sub": "Wed · 10:15 AM"
        },
        "title": "Design Specification FA — SideKick Brief",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": false,
        "strands": [
          "STRAND I"
        ],
        "paragraphs": [
          "Purpose: Turn evidence from a design brief into a testable design specification — a core skill for Criterion B (Developing Ideas), Strand i.",
          "Activity: Students read the \"SideKick\" design brief (a reusable water bottle for the school day, with survey data, interview insights, and a comparison of three existing bottles), then wrote 6–10 specification statements following \"The solution must/should [requirement], verified by [method], because [finding],\" labelling each MUST or SHOULD. Self-checked each statement for testability, a named verification method, and traceability to evidence in the brief.",
          "Produced: An individually written, self-checked design specification."
        ],
        "fields": [
          {
            "label": "Purpose",
            "value": "Turn evidence from a design brief into a testable design specification — a core skill for Criterion B (Developing Ideas), Strand i."
          },
          {
            "label": "Activity",
            "value": "Students read the \"SideKick\" design brief (a reusable water bottle for the school day, with survey data, interview insights, and a comparison of three existing bottles), then wrote 6–10 specification statements following \"The solution must/should [requirement], verified by [method], because [finding],\" labelling each MUST or SHOULD. Self-checked each statement for testability, a named verification method, and traceability to evidence in the brief."
          },
          {
            "label": "Produced",
            "value": "An individually written, self-checked design specification."
          }
        ],
        "meta": {
          "title": "Suggested ATL · Learner Profile · GC link",
          "items": [
            {
              "label": "ATL focus",
              "value": "Communication — paraphrase brief evidence accurately and concisely into testable statements, this unit's own stated Communication strand."
            },
            {
              "label": "Learner profile",
              "value": "Principled, Knowledgeable"
            },
            {
              "label": "GC link",
              "value": "Indirect — SideKick is a stand-in practice brief (a water bottle), not the class's own lifestyle-choices product, though hydration is itself a lifestyle choice."
            }
          ]
        },
        "resources": [],
        "hasNoResource": false,
        "type": "formative"
      },
      {
        "id": "myp4-6",
        "sessionNumber": 6,
        "date": {
          "day": "21",
          "mon": "Sep",
          "sub": "Mon · 8:45 AM"
        },
        "title": "Wireframes, Flow Diagrams & Annotation",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": true,
        "strands": [
          "STRAND I · B2"
        ],
        "paragraphs": [
          "Purpose: Complete a range of three feasible design ideas for the digital product, and check each one against the design specification from Sep 9.",
          "Activity: Students started their design ideas, each using a different navigation or layout approach, drawn as wireframes with annotated, connected flow diagrams, and wrote a short feasibility note for each idea.",
          "Produced: In progress — three wireframe + flow-diagram design ideas, each checked against the specification."
        ],
        "fields": [
          {
            "label": "Purpose",
            "value": "Complete a range of three feasible design ideas for the digital product, and check each one against the design specification from Sep 9."
          },
          {
            "label": "Activity",
            "value": "Students started their design ideas, each using a different navigation or layout approach, drawn as wireframes with annotated, connected flow diagrams, and wrote a short feasibility note for each idea."
          },
          {
            "label": "Produced",
            "value": "In progress — three wireframe + flow-diagram design ideas, each checked against the specification."
          }
        ],
        "meta": {
          "title": "Suggested ATL · Learner Profile · GC link",
          "items": [
            {
              "label": "ATL focus",
              "value": "Creative thinking (Thinking skills) — generate several genuinely different navigation/layout solutions rather than refining one early."
            },
            {
              "label": "Learner profile",
              "value": "Risk-taker, Reflective"
            },
            {
              "label": "GC link",
              "value": "Yes — these wireframes are the actual form of the class's own digital product, the direct answer to the lifestyle-choices problem."
            }
          ]
        },
        "resources": [],
        "hasNoResource": false,
        "type": "lesson"
      }
    ]
  },
  "myp1b": {
    "id": "myp1b",
    "name": "MYP 1B",
    "grade": "MYP 1",
    "section": "1B",
    "unitTitle": "Foundations of Digital Design",
    "status": "Soon",
    "kicker": "Upcoming Unit — Term 2",
    "title": "Foundations of Digital Design: MYP 1B",
    "intro": "An introduction to the MYP Design Cycle, computational thinking, safe digital collaboration, and interactive media creation.",
    "bannerImage": "images/unit_coding_change_1790408359855.jpg",
    "facts": [
      {
        "label": "Class",
        "value": "MYP 1B Design"
      },
      {
        "label": "Unit",
        "value": "Foundations of Digital Design"
      },
      {
        "label": "Status",
        "value": "Launching in Term 2"
      },
      {
        "label": "Sessions",
        "value": "Upcoming"
      }
    ],
    "unitFrame": {
      "title": "Unit Overview: Foundations of Digital Design",
      "items": [
        {
          "label": "Key Concept",
          "value": "Communication"
        },
        {
          "label": "Related Concepts",
          "value": "Form · Function"
        },
        {
          "label": "Global Context",
          "value": "Personal and Cultural Expression"
        },
        {
          "label": "Inquiry Question",
          "value": "How do digital tools allow us to solve everyday problems creatively?"
        }
      ],
      "quote": "Statement of Inquiry: Clear communication across digital mediums empowers communities to interact responsibly with emerging technologies.",
      "note": "Sessions will be logged live once classes begin."
    },
    "lessons": [
      {
        "id": "myp1b-1",
        "sessionNumber": 1,
        "date": {
          "day": "--",
          "mon": "Oct",
          "sub": "Scheduled"
        },
        "title": "Orientation to the MYP Design Cycle & Digital Tools",
        "criterion": "a",
        "critLabel": "Criterion A",
        "isLatest": false,
        "isPlanned": true,
        "strands": [
          "Strand i · Introduction"
        ],
        "paragraphs": [
          "Welcome to MYP Digital Design. Orientation to our lab tools, Google Classroom workspace, and understanding how designers think.",
          "Students will explore the four phases of the design cycle (Inquiring & Analysing, Developing Ideas, Creating, Evaluating) through a 15-minute rapid paper prototype challenge."
        ],
        "resources": [],
        "hasNoResource": false,
        "type": "lesson"
      }
    ]
  }
};

export const DESIGN_QUOTES: DesignQuote[] = [
  {
    "id": 1,
    "quote": "Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects.",
    "author": "Dieter Rams",
    "role": "Industrial Designer, Braun",
    "context": "Ten Principles for Good Design"
  },
  {
    "id": 2,
    "quote": "Design is not just what it looks like and feels like. Design is how it works.",
    "author": "Steve Jobs",
    "role": "Co-founder, Apple",
    "context": "On Product Architecture & UX"
  },
  {
    "id": 3,
    "quote": "A brilliant solution to the wrong problem can be worse than no solution at all: solve the correct problem.",
    "author": "Don Norman",
    "role": "Author of The Design of Everyday Things",
    "context": "Human-Centered Design"
  },
  {
    "id": 4,
    "quote": "Simplicity is about subtracting the obvious and adding the meaningful.",
    "author": "John Maeda",
    "role": "Technologist & Designer",
    "context": "The Laws of Simplicity"
  },
  {
    "id": 5,
    "quote": "It's through mistakes that you actually can grow. You have to get bad in order to get good.",
    "author": "Paula Scher",
    "role": "Graphic Designer, Pentagram",
    "context": "Iterative Prototyping"
  }
];

export const STRAND_DESCRIPTORS: StrandDescriptor[] = [
  {
    "strand": "Strand i",
    "criterion": "a",
    "title": "Explain and justify the need",
    "description": "Explain and justify the need for a solution to a problem for a specified client/target audience."
  },
  {
    "strand": "Strand ii",
    "criterion": "a",
    "title": "Identify and prioritize research",
    "description": "Construct a research plan, which states and prioritizes primary and secondary research needed to develop a solution."
  },
  {
    "strand": "Strand iii",
    "criterion": "a",
    "title": "Analyse existing products",
    "description": "Analyse a range of existing products that inspire a solution to the problem using frameworks like PPC or CPFC."
  },
  {
    "strand": "Strand iv",
    "criterion": "a",
    "title": "Develop a design brief",
    "description": "Develop a detailed design brief which summarizes the analysis of relevant research to guide design specifications."
  },
  {
    "strand": "Strand i",
    "criterion": "b",
    "title": "Develop design specifications",
    "description": "Develop design specifications which clearly state the success criteria for the design of a solution."
  },
  {
    "strand": "Strand ii",
    "criterion": "b",
    "title": "Develop design ideas",
    "description": "Develop a range of feasible design ideas using isometric sketching, circuit schematics, and UI wireframes."
  },
  {
    "strand": "Strand iii",
    "criterion": "b",
    "title": "Present the chosen design",
    "description": "Present the chosen design and justify its selection with reference to the design specifications."
  },
  {
    "strand": "Strand iv",
    "criterion": "b",
    "title": "Develop planning drawings/diagrams",
    "description": "Develop accurate and detailed planning drawings/diagrams and outline the requirements for the creation of the solution."
  }
];
