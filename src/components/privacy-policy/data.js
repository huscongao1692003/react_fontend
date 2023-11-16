const instructors = [
  {
    title: "Update Personal Information",
    content:
      "Instructors need to provide accurate and complete personal information, including full name, address, phone number, and contact email. This information will be used to verify identity and for necessary communication purposes.",
  },
  {
    title: "Official Instructor Confirmation",
    content:
      "After creating an account, instructors need to update their personal profile information and demonstrate their experience and ability to teach drawing to children. This process may involve providing information about their educational background and relevant qualifications.",
  },
  {
    title: "Content Upload Requirements",
    content:
      "Instructors are required to upload at least 3 artworks and 3 relevant certificates to demonstrate their skills and abilities. This ensures that only those with sufficient drawing skills are allowed to offer courses for sale.",
  },
  {
    title: "Child-Appropriate Content",
    content:
      "Instructors need to ensure that the videos and teaching materials they create are suitable for children. The content should not contain sensitive or violent elements or inappropriate content for children.",
  },
  {
    title: "Quality Requirement",
    content:
      "Instructors need to provide high-quality videos and learning materials that are easy to understand and appropriate for children's skill levels. The instructional content should be clear, well-organized, and facilitate easy understanding and knowledge absorption for children.",
  },
  {
    title: "Copyright Compliance",
    content:
      "Instructors need to ensure that all content uploaded and used in the course does not violate the intellectual property rights of third parties. If using others' works or content in the course, instructors need to obtain permission or comply with copyright regulations.",
  },
  {
    title: "Feedback and Support",
    content:
      "Instructors need to provide feedback and support to students during the learning process. They should offer constructive feedback and assistance to students when they encounter difficulties in completing exercises and finishing the course.",
  },
  {
    title: "Protection of Students' Personal Information",
    content:
      "Instructors need to commit to protecting students' personal information. They should not disclose, share, or use students' personal information for purposes other than course management and student support.",
  },
  {
    title: "Creating a Safe Learning Environment",
    content:
      "Instructors need to create a safe and respectful learning environment for children. They should not accept, encourage, or engage in any form of harassment, discrimination, or violence against students.",
  },
  {
    title: "Clarification of Content Ownership",
    content:
      "Instructors need to clearly define the ownership rights of the content they create in the course. They may decide on the publication, distribution, or reuse of their own content. However, if using students' content in the course, instructors need the consent of the students and comply with privacy and copyright regulations.",
  },
  {
    title: "Compliance with Pricing Regulations",
    content:
      "Instructors need to comply with the pricing regulations set by the website or management. They should not engage in fraudulent, deceptive, or non-transparent pricing activities.",
  },
  {
    title: "Timeliness and Learning Schedule",
    content:
      "Instructors need to ensure that they adhere to the predetermined learning schedule. They should arrive on time and provide sufficient time for students to fully absorb the knowledge.",
  },
  {
    title: "Ensuring Service Quality",
    content:
      "Instructors need to commit to ensuring the quality of their teaching services. They should provide high-quality lectures and continuously assess and improve their teaching methods to meet the needs and desires of students.",
  },
];

const users = [
    {
      title: "Account Creation and Maintenance",
      content: "Users need an account for most activities on the platform, and they must provide and maintain accurate and complete information, including a valid email address. Users are responsible for their accounts and everything that happens on them, and they must not share or transfer their accounts to anyone else. Epora may terminate or suspend accounts for any or no reason, and users may cancel their accounts at any time."
    },
    {
      title: "Content Enrollment and Lifetime Access",
      content: "Users get a license from Epora to access and view the content they enroll in, and they may not resell or use the content for any other purpose. Epora generally grants a lifetime access license, except when the content is disabled for legal or policy reasons. Users have the right to request a refund or credit for most content purchases within 30 days, unless they abuse the refund policy or violate the Terms."
    },
    {
      title: "Payments, Credits, and Refunds",
      content: "Users agree to pay the fees for the content they purchase, and they authorize Epora and its payment service providers to process their payment methods. Epora may offer gift and promotional codes, which may expire and have no cash value. Epora may change the prices and features of its services at any time, and users will be notified of any changes."
    },
    {
      title: "Content and Behavior Rules",
      content: "Users may not use the Services for unlawful purposes, or post any content that violates the law or the rights of others. Epora does not review or edit the content for legal issues, and does not guarantee the reliability, validity, accuracy, or truthfulness of the content. Epora may remove any content that violates the Terms or its Trust & Safety Guidelines, and may ban or restrict users who do so. Users retain ownership of their content, but they grant Epora a license to use and share it. Users also agree to receive communications from Epora and its partners."
    },
    {
      title: "Epora’s Rights",
      content: "Epora owns the platform and services, including the website, apps, APIs, code, and content created by its employees. Users may not tamper with or use them without authorization. Epora may modify or terminate its services at any time, and may enforce these Terms and its policies at its discretion. Epora is not liable for any damages or losses arising from the use of its services, and users agree to indemnify Epora from any claims against it."
    }
  ];

  const Violations = [
    {
      title: "Content Policy Violation",
      content: "If an instructor violates the content policy by uploading inappropriate, sensitive, or copyright-infringing content, the following consequences may occur:",
      subcontents: [
        "Warning or violation notice.",
        "Removal or hiding of the violating content.",
        "Temporary or permanent suspension of access to the instructor account.",
        "Suspension or termination of the cooperation contract with the instructor."
      ]
    },
    {
      title: "Privacy and Security Violation",
      content: "If an instructor violates the privacy or security of students' personal information, the following consequences may occur:",
      subcontents: [
        "Warning or violation notice.",
        "Removal or hiding of the violating information.",
        "Temporary or permanent suspension of access to the instructor account.",
        "Suspension or termination of the cooperation contract with the instructor.",
        "Legal action or prosecution in case of serious violations."
      ]
    },
    {
      title: "Pricing Regulation Violation",
      content: "If an instructor violates the pricing regulations by engaging in fraudulent, deceptive, or non-transparent pricing activities, the following consequences may occur:",
      subcontents: [
        "Warning or violation notice.",
        "Temporary or permanent suspension of access to the instructor account.",
        "Suspension or termination of the cooperation contract with the instructor.",
        "Prohibition from uploading or selling courses for a certain period."
      ]
    },
    {
      title: "Unethical or Unprofessional Conduct",
      content: "If an instructor engages in unethical or unprofessional conduct, the following consequences may occur:",
      subcontents: [
        "Warning or violation notice.",
        "Temporary or permanent suspension of access to the instructor account.",
        "Suspension or termination of the cooperation contract with the instructor."
      ]
    }
  ];

  const penalties = [
    {
      title: "Copyright infringement",
      content: "If a buyer or course participant violates intellectual property rights by copying, distributing, or sharing course content without the permission of the author or copyright owner, they may face penalties. Penalties may include being banned from accessing the educational platform, being removed from the course, or having their account suspended."
    },
    {
      title: "Cheating",
      content: "If a buyer or course participant uses fraudulent methods during tests, assignments, or projects, they may face penalties. Penalties may include loss of points, being denied course completion, or having their account suspended."
    },
    {
      title: "Account misuse",
      content: "If a buyer shares their account with others or uses someone else's account to access a course, they may face penalties. Penalties may include account suspension or termination."
    },
    {
      title: "Harassment or bullying",
      content: "If a buyer or course participant sends harassing, threatening, or bullying messages to teachers or other learners on the educational platform, they may face penalties. Penalties may include being banned from the platform, having their account suspended, or being reported to the appropriate authorities."
    },
    {
      title: "Violation of ethical guidelines",
      content: "If a buyer or course participant engages in unethical behavior such as insulting, discriminating against, or harassing others in the online learning community, they may face penalties. Penalties may include being banned from the platform and having their account suspended."
    }
  ];

export const objects = [
  "Regulations For Instructors",
  "Regulations For Students",
  "Handling Violations",
  "Penalties Users",
];


export const listPolicy = [
    instructors, users, Violations, penalties
]
