/*
 * data.js — THE SINGLE SOURCE OF TRUTH FOR YOUR CONTENT
 * ------------------------------------------------------------------
 * Every word you see on the website comes from this file.
 * Components (in /src/components) only decide HOW things look;
 * this file decides WHAT they say.
 *
 * Why do it this way?
 *  - To update your site (new job, new skill, GitHub link) you edit
 *    ONE file and never touch layout code.
 *  - It's the same idea as separating your Spring @Service (logic)
 *    from application.yml (config) in Java.
 */

export const profile = {
  name: 'Srinadh Chintham', // ← change to your full name as you want it shown
  initials: 'SC', // used in the nav logo
  title: 'Senior Java Full Stack Developer',
  location: 'Aurora, Colorado',
  tagline:
    'I design and ship enterprise systems end to end — Spring Boot microservices, event-driven pipelines on Kafka, cloud-native AWS back ends, and clean Angular and React front ends.',
  // ↓ Contact links. Leave github as '' and the site hides it automatically.
  email: 'srinadhc5100@gmail.com',
  linkedin: 'https://www.linkedin.com/in/srinadh-chintham-10019312a/', // ← paste your real LinkedIn URL
  github: '', // ← add later, e.g. 'https://github.com/your-username'
  resumeFile: '/resume.pdf', // put your PDF at public/resume.pdf
};

// Numbers shown as big "stat" tiles under the hero.
export const stats = [
  { value: '10+', label: 'Years building software' },
  { value: '6', label: 'Organizations' },
  { value: '3', label: 'Domains: government, telecom, aerospace' },
  { value: 'Java 8→21', label: 'Across every LTS release' },
];

export const about = [
  'I’m a senior full stack developer with more than a decade of experience across the full software lifecycle, working in Agile/Scrum teams for state government, telecom, and aerospace.',
  'My core is Java and the Spring ecosystem, but I’m most useful where systems meet: migrating data between platforms, wiring services together with Kafka and Camel, putting them on AWS with Terraform, and building the interfaces people actually use.',
  'Lately I’ve been building AI agents that make engineering teams faster — automated code reviews, test scaffolding, SQL tuning, and turning noisy alerts into clear root-cause summaries.',
];

// "What I do" cards. icon = a short key used by the Icon component.
export const focusAreas = [
  {
    icon: 'server',
    title: 'Microservices & APIs',
    text: 'Spring Boot services exposing REST and SOAP, secured with Spring Security, OAuth 2.0 and JWT, documented with Swagger/OpenAPI.',
  },
  {
    icon: 'stream',
    title: 'Event-Driven Systems',
    text: 'High-volume Kafka processing with Producer, Consumer and Streams APIs, plus Apache Camel, ActiveMQ and JMS integration routes.',
  },
  {
    icon: 'cloud',
    title: 'Cloud-Native on AWS',
    text: 'Lambda, ECS, EKS, API Gateway, Step Functions and DynamoDB, provisioned as code with Terraform and CloudFormation.',
  },
  {
    icon: 'layout',
    title: 'Front-End Engineering',
    text: 'Responsive, role-based UIs in Angular and React with TypeScript, RxJS and reusable component libraries.',
  },
  {
    icon: 'database',
    title: 'Data Migration & ETL',
    text: 'Configuration-driven migrations, complex SQL and PL/SQL in Oracle and SQL Server, tuned with explain plans and indexing.',
  },
  {
    icon: 'spark',
    title: 'AI-Assisted Engineering',
    text: 'Internal AI agents for code review, test scaffolding and incident triage, plus Copilot-driven team workflows.',
  },
];

export const highlights = [
  {
    tag: 'AI Agent',
    title: 'On-Call Incident Assistant',
    text: 'An agent that watches application logs and CloudWatch alerts, summarizes the likely root cause, and recommends remediation steps to the on-call developer.',
    tech: ['CloudWatch', 'Log analysis', 'LLM agents'],
  },
  {
    tag: 'AI Agent',
    title: 'Developer Productivity Agent',
    text: 'Connects to the team’s repositories and JIRA to generate first-pass code reviews, unit-test scaffolds and SQL tuning suggestions.',
    tech: ['Git', 'JIRA', 'Code review', 'SQL'],
  },
  {
    tag: 'Data Platform',
    title: 'Config-Driven Data Migration',
    text: 'A Spring Boot + Apache Camel engine that moves data from legacy CATS tables into the MyUI+ schema feeding Colorado’s unemployment insurance platform.',
    tech: ['Spring Boot', 'Apache Camel', 'Oracle', 'MSSQL'],
  },
  {
    tag: 'Serverless',
    title: 'AWS Resource Automation APIs',
    text: 'Java-based Lambda APIs that manage and automate EKS, EC2, S3, Route 53 and API Gateway in a largely serverless architecture.',
    tech: ['AWS Lambda', 'Java', 'EKS', 'API Gateway'],
  },
  {
    tag: 'Full Stack',
    title: 'Legacy Archive Application',
    text: 'An end-to-end archive app that preserves legacy data and keeps serving it to existing CDLE customers after platform migration.',
    tech: ['Spring Boot', 'Angular', 'Oracle'],
  },
  {
    tag: 'DevOps',
    title: 'Automated CI/CD Pipelines',
    text: 'Azure DevOps pipelines that replaced manual release steps with automated builds and deployments across UAT and production.',
    tech: ['Azure DevOps', 'Gradle', 'Docker'],
  },
];

export const experience = [
  {
    company: 'OIT – State of Colorado (CDLE)',
    role: 'Senior Software Developer',
    place: 'Denver, CO',
    period: 'Sep 2021 – Present',
    points: [
      'Built a configuration-driven data migration solution with Spring Boot and Apache Camel feeding the MyUI+ unemployment insurance platform.',
      'Developed and upgraded Spring Boot microservices on Java 17 and 21, exposing REST and SOAP services for internal and partner integrations.',
      'Built high-volume Kafka processing services and managed broker and topic configuration.',
      'Created Java AWS Lambda APIs automating EKS, EC2, S3, Route 53 and API Gateway; containerized services for ECS and EKS.',
      'Delivered an Angular front end on AWS backed by API Gateway, Lambda and Node.js services on EKS.',
      'Built AI agents for incident triage and first-pass code reviews, and rolled out Copilot-assisted workflows.',
      'Set up Azure DevOps CI/CD pipelines and automated Oracle ETL loads with a Python utility.',
    ],
    stack: ['Java 21', 'Spring Boot', 'Camel', 'Kafka', 'AWS', 'Angular', 'React', 'Oracle'],
  },
  {
    company: 'Dish Network',
    role: 'Senior Java Developer',
    place: 'Denver, CO',
    period: 'Feb 2021 – Sep 2021',
    points: [
      'Built RESTful microservices with Java 11, Spring Boot and Spring Cloud communicating over REST and Kafka.',
      'Migrated applications from Java 8 to 11 and moved selected modules to Kotlin.',
      'Developed serverless workflows with Lambda, Step Functions and DynamoDB Streams, provisioned with Terraform and CloudFormation.',
      'Delivered an APIGEE proxy proof of concept and set up APIGEE Edge environments.',
    ],
    stack: ['Java 11', 'Kotlin', 'Spring Cloud', 'Lambda', 'Terraform', 'APIGEE'],
  },
  {
    company: 'OIT – State of Colorado (CDLE)',
    role: 'Software Developer',
    place: 'Denver, CO',
    period: 'Apr 2019 – Jan 2021',
    points: [
      'Built full stack apps with Java 8, Spring Boot and REST/SOAP services for the myUI+ and uFACTS data conversion programs.',
      'Developed Apache Camel integration routes over Kafka and ActiveMQ with JMS endpoints.',
      'Built Angular 6+ applications and a Node.js tool to trigger ETL validations, with JWT-secured APIs.',
    ],
    stack: ['Java 8', 'Camel', 'ActiveMQ', 'Angular 6+', 'Node.js'],
  },
  {
    company: 'Boeing',
    role: 'Java Developer',
    place: 'Seal Beach, CA',
    period: 'May 2017 – Apr 2019',
    points: [
      'Built OAuth-secured Spring Boot microservices with Hibernate on Oracle.',
      'Implemented SOAP services with JAX-WS and Apache CXF, and REST services with Spring.',
      'Developed Angular and AngularJS features; set up Jenkins CI/CD and a Git-based review workflow.',
    ],
    stack: ['Spring MVC', 'Hibernate', 'Apache CXF', 'Angular', 'Jenkins'],
  },
  {
    company: 'AT&T',
    role: 'Application Developer',
    place: 'Alpharetta, GA',
    period: 'Dec 2016 – May 2017',
    points: [
      'Built Spring Boot microservices for authentication and for connecting a viewer app to machine learning features.',
      'Developed OAuth-secured REST and SOAP services; tuned performance bottlenecks with multithreading and Java 8 streams.',
    ],
    stack: ['Spring Boot', 'Spring-WS', 'Hibernate', 'AngularJS'],
  },
  {
    company: 'Basecamp Technologies',
    role: 'Junior Java Developer',
    place: 'Pune, India',
    period: 'Apr 2014 – Jul 2015',
    points: [
      'Built Struts MVC web apps with JSP and Hibernate, integrating Spring dependency injection.',
      'Consumed third-party SOAP and REST services and designed Oracle tables, procedures and triggers.',
    ],
    stack: ['Struts', 'Spring', 'Hibernate', 'Oracle 9i'],
  },
];

export const skills = [
  { group: 'Languages', items: ['Java 8/11/17/21', 'Kotlin', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'PL/SQL'] },
  { group: 'Back End', items: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Spring Cloud', 'Spring Batch', 'Data JPA', 'Hibernate', 'Apache Camel', 'Apache CXF'] },
  { group: 'Front End', items: ['React', 'Angular', 'AngularJS', 'Node.js', 'RxJS', 'HTML5', 'CSS3', 'Bootstrap'] },
  { group: 'Cloud & Infra', items: ['AWS Lambda', 'ECS', 'EKS', 'EC2', 'API Gateway', 'Step Functions', 'S3', 'Terraform', 'CloudFormation', 'Docker', 'Kubernetes'] },
  { group: 'Messaging', items: ['Kafka', 'Kafka Streams', 'ActiveMQ', 'JMS'] },
  { group: 'Data', items: ['Oracle', 'SQL Server', 'MySQL', 'MongoDB', 'DynamoDB'] },
  { group: 'APIs & Security', items: ['REST', 'SOAP / JAX-WS', 'OpenAPI', 'APIGEE', 'NGINX', 'OAuth 2.0', 'JWT'] },
  { group: 'DevOps & Quality', items: ['Azure DevOps', 'Jenkins', 'GitLab', 'Maven', 'Gradle', 'JUnit', 'Mockito', 'Jest', 'Splunk', 'CloudWatch'] },
  { group: 'AI', items: ['AI agents', 'GitHub Copilot', 'AI code review'] },
];

export const education = [
  {
    degree: 'Master of Science, Computer Science',
    school: 'University of Central Missouri',
    place: 'Missouri, USA',
    year: '2016',
  },
  {
    degree: 'Bachelor of Technology, Computer Science & Engineering',
    school: 'Jawaharlal Nehru Technological University',
    place: 'Hyderabad, India',
    year: '2014',
  },
];
