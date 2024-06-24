
CREATE OR REPLACE FUNCTION set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."RowCreated" := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE "ApplicationStatus"
(
	"ApplicationStatusId" Serial PRIMARY KEY,
	"StatusName" VARCHAR(20) NOT NULL
);

INSERT INTO "ApplicationStatus"("StatusName")
VALUES('Sent'),('Opened'),('Rejected'),('Offer');

CREATE TABLE "Category"
(
	"CategoryId" Serial PRIMARY KEY,
	"Name" VARCHAR(20) NOT NULL
);

INSERT INTO "Category"("Name")
VALUES('Frontend'),('Backend'),('Fullstack'),('DevOps');

CREATE TABLE "Experience"
(
	"ExperienceId" Serial PRIMARY KEY,
	"Name" VARCHAR(7) NOT NULL
);

INSERT INTO "Experience"("Name")
VALUES('Senior'),('Middle'),('Junior'),('Treinee');

CREATE TABLE "Skill"
(
	"SkillId" Serial PRIMARY KEY,
	"Name" VARCHAR(20) NOT NULL
);

INSERT INTO "Skill"("Name")
VALUES('React'),('.NET'),('C#'),('JavaScript');

CREATE TABLE "Benefit"
(
	"BenefitId" Serial PRIMARY KEY,
	"Name" VARCHAR(100) NOT NULL
);

CREATE TABLE "Company"
(
	"CompanyId" Serial PRIMARY KEY,
	"Name" VARCHAR(20) NOT NULL,
	"Address" VARCHAR(20) NOT NULL,
	"Email" VARCHAR(50) NOT NULL,
	"Password" VARCHAR(100) NOT NULL,
	"LinkToSite" VARCHAR(100)
);

CREATE TABLE "User"
(
	"UserId" Serial PRIMARY KEY,
	"Name" VARCHAR(20) NOT NULL,
	"LastName" VARCHAR(20) NOT NULL,
	"Password" VARCHAR(100) NOT NULL,
	"Address" VARCHAR(20) NOT NULL,
	"ResumeId" Integer,
	"UserStatus" VARCHAR(10) DEFAULT 'User',
	"Email" VARCHAR(50) NOT NULL,
	"PhoneNumber" VARCHAR(15) NOT NULL
);

CREATE TABLE "JobPosting"
(
	"JobPostingId" Serial PRIMARY KEY,
	"CategoryId" Integer NOT NULL REFERENCES "Category"("CategoryId"),
	"CompanyId" Integer NOT NULL REFERENCES "Company"("CompanyId"),
	"SalaryMin" Integer NOT NULL,
	"SalaryMax" Integer NOT NULL,
	"Description" VARCHAR(500) NOT NULL,
	"WhatWeOffer" VARCHAR(500) NOT NULL,
	"ExpirationDate" timestamp with time zone,
	"RowCreated" timestamp with time zone,
	"ExperienceId" Integer NOT NULL REFERENCES "Experience"("ExperienceId"),
	"Location" VARCHAR(50) NOT NULL,
	"Hybrid" Boolean NOT NULL,
	"Remote" Boolean NOT NULL
);

CREATE TRIGGER TrJobPostingRowCreatedTimeStamp
BEFORE INSERT ON "JobPosting"
FOR EACH ROW
EXECUTE FUNCTION set_timestamp();

CREATE TABLE "Application"
(
	"ApplicationId" Serial PRIMARY KEY,
	"UserId" Integer NOT NULL REFERENCES "User"("UserId"),
	"JobPostingId" Integer NOT NULL REFERENCES "JobPosting"("JobPostingId"),
	"CompanyId" Integer NOT NULL REFERENCES "Company"("CompanyId"),
	"ApplicationStatusId" Integer NOT NULL 
		REFERENCES "ApplicationStatus"("ApplicationStatusId")
		DEFAULT 1,
	"DesiredSallaryMin" Integer NOT NULL,
	"DesiredSallaryMax" Integer NOT NULL,
	"ExperienceYears" Float NOT NULL,
	"WhenCanStart" VARCHAR(30) NOT NULL,
	"PreviousWorkPlace" VARCHAR(30) NOT NULL,
	"MessageToRecruiter" VARCHAR(500) NOT NULL
);

CREATE TABLE "UserSkill"
(
	"UserId" Integer NOT NULL REFERENCES "User"("UserId"),
	"SkillId" Integer NOT NULL REFERENCES "Skill"("SkillId"),
	PRIMARY KEY ("UserId", "SkillId") 
);

CREATE TABLE "JobPostingSkill"
(
	"JobPostingId" Integer NOT NULL REFERENCES "JobPosting"("JobPostingId"),
	"SkillId" Integer NOT NULL REFERENCES "Skill"("SkillId"),
	PRIMARY KEY ("JobPostingId", "SkillId") 
);

CREATE TABLE "JobPostingBenefit"
(
	"JobPostingId" Integer NOT NULL REFERENCES "JobPosting"("JobPostingId"),
	"BenefitId" Integer NOT NULL REFERENCES "Benefit"("BenefitId"),
	PRIMARY KEY ("JobPostingId", "BenefitId") 
);

-- Sample data for Companies
INSERT INTO "Company"("Name", "Address", "Email", "Password", "LinkToSite")
VALUES 
('Barker & Allen', '2652 Ramos St, WI', 'keith46@costa.net', '289OJDwUs^', 'http://garcia.com/'),
('Case & Neal', '6473 Jones Mews, ID', 'justinstone@warner.com', '^&C_ANJz95', 'http://www.leon.com/'),
('Schmidt & Gonzalez', 'PSC 0273, Box 1135', 'andrea66@cooley-johnston.com', '2b@Z1XgbSA', 'https://www.bradshaw.biz/'),
('Boyd & Jones', '54504 Emily Ln, NE', 'vbailey@wilson.com', '+4eOUGnH#@', 'https://www.velasquez.info/');

-- Sample data for Users
INSERT INTO "User"("Name", "LastName", "Password", "Address", "ResumeId", "UserStatus", "Email", "PhoneNumber")
VALUES 
('Kelly', 'Li', 'J4hPbiBs&8', '81216 Daniels St, NY', NULL, 'inactive', 'joelklein@gmail.com', '+1-903-117-7859'), -- c4a9abc88aaafdccf1f4d621ce87e7dc85a6a75a29cac1de0a9070500c519d21
('Ashley', 'Smith', 'aH2Kb4!oW', '321 Main St, TX', NULL, 'active', 'ashley.smith@gmail.com', '+1-512-345-6789'),
('Chris', 'Brown', 'xR3Tc7^yN', '654 Oak Ave, IL', NULL, 'inactive', 'chris.brown@gmail.com', '+1-217-987-6543'),
('Jordan', 'Taylor', 'pQ8Vz!lR5', '987 Pine Rd, CA', NULL, 'active', 'jordan.taylor@gmail.com', '+1-415-765-4321');

-- Sample data for Job Postings
INSERT INTO "JobPosting"("JobPostingId", "CategoryId", "CompanyId", "SalaryMin", "SalaryMax", "Description", "WhatWeOffer", "ExpirationDate", "ExperienceId", "Location", "Hybrid", "Remote")
VALUES 
(1, 1, 1, 60000, 80000, 'We are looking for a skilled frontend developer...', 'Great benefits including...', '2024-12-31T23:59:59Z', 3, 'New York', TRUE, FALSE),
(2, 2, 2, 70000, 100000, 'Join our backend team and work with cutting-edge...', 'We offer flexible working hours...', '2024-12-31T23:59:59Z', 2, 'San Francisco', FALSE, TRUE),
(3, 3, 3, 75000, 110000, 'As a fullstack developer, you will...', 'Comprehensive health insurance...', '2024-12-31T23:59:59Z', 1, 'Remote', TRUE, TRUE),
(4, 4, 4, 80000, 120000, 'DevOps position with focus on cloud infrastructure...', '401(k) and stock options...', '2024-12-31T23:59:59Z', 4, 'Seattle', FALSE, FALSE);

-- Sample data for Applications
INSERT INTO "Application"("UserId", "JobPostingId", "CompanyId", "ApplicationStatusId", "DesiredSallaryMin", "DesiredSallaryMax", "ExperienceYears", "WhenCanStart", "PreviousWorkPlace", "MessageToRecruiter")
VALUES 
(1, 1, 1, 1, 60000, 80000, 5.2, '2024-07-01', 'Company A', 'Looking forward to discussing how I can contribute...'),
(2, 2, 2, 2, 70000, 100000, 3.5, '2024-08-01', 'Company B', 'Excited about the opportunity to work with your team...'),
(3, 3, 3, 3, 75000, 110000, 2.0, '2024-09-01', 'Company C', 'My skills and experiences are a perfect match...'),
(4, 4, 4, 4, 80000, 120000, 4.5, '2024-10-01', 'Company D', 'Eager to bring my expertise to your innovative projects...');

-- Sample data for User Skills
INSERT INTO "UserSkill"("UserId", "SkillId")
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- Sample data for Job Posting Skills
INSERT INTO "JobPostingSkill"("JobPostingId", "SkillId")
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- Sample data for Benefits
INSERT INTO "Benefit"("Name")
VALUES 
('Health insurance'),
('401(k)'),
('Paid time off'),
('Remote work');


-- Sample data for Job Posting Benefits
INSERT INTO "JobPostingBenefit"("JobPostingId", "BenefitId")
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4);
