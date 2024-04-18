
CREATE OR REPLACE FUNCTION set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.RowCreated := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE "UserStatus"
(
	"UserStatusId" Serial PRIMARY KEY,
	"StatusName" VARCHAR(20) NOT NULL
);

INSERT INTO "UserStatus"("StatusName")
VALUES('JobSeeker'),('Employer'),('Admin'),('Recruiter');

CREATE TABLE "ApplicationStatus"
(
	"ApplicationStatusId" Serial PRIMARY KEY,
	"StatusName" VARCHAR(20) NOT NULL
);

INSERT INTO "ApplicationStatus"("StatusName")
VALUES('Sent'),('Opened'),('Rejected'),('Offer');

CREATE TABLE "Skills"
(
	"SkillsId" Serial PRIMARY KEY,
	"Skill1" VARCHAR(20),
	"Skill2" VARCHAR(20),
	"Skill3" VARCHAR(20),
	"Skill4" VARCHAR(20),
	"Skill5" VARCHAR(20),
	"Skill6" VARCHAR(20),
	"Skill7" VARCHAR(20),
	"Skill8" VARCHAR(20),
	"Skill9" VARCHAR(20),
	"Skill10" VARCHAR(20)
);

CREATE TABLE "Benefits"
(
	"BenefitsId" Serial PRIMARY KEY,
	"Benefit1" VARCHAR(20),
	"Benefit2" VARCHAR(20),
	"Benefit3" VARCHAR(20),
	"Benefit4" VARCHAR(20),
	"Benefit5" VARCHAR(20),
	"Benefit6" VARCHAR(20),
	"Benefit7" VARCHAR(20),
	"Benefit8" VARCHAR(20),
	"Benefit9" VARCHAR(20),
	"Benefit10" VARCHAR(20)
);

CREATE TABLE "Company"
(
	"CompanyId" Serial PRIMARY KEY,
	"Name" VARCHAR(20) NOT NULL,
	"Address" VARCHAR(20) NOT NULL,
	"Email" VARCHAR(50) NOT NULL,
	"LinkToSite" VARCHAR(100)
);

CREATE TABLE "User"
(
	"UserId" Serial PRIMARY KEY,
	"Name" VARCHAR(20) NOT NULL,
	"LastName" VARCHAR(20) NOT NULL,
	"Password" VARCHAR(100) NOT NULL,
	"Address" VARCHAR(20) NOT NULL,
	"ResumeId" Integer NOT NULL,
	"UserStatusId" Integer NOT NULL 
		REFERENCES "UserStatus"("UserStatusId")
		Default 1,
	"CompanyId" Integer 
		REFERENCES "Company"("CompanyId")
		Default NULL,
	"Email" VARCHAR(50) NOT NULL,
	"PhoneNumber" VARCHAR(15) NOT NULL,
	"SkillsId" Integer UNIQUE NOT NULL REFERENCES "Skills"("SkillsId")
);

CREATE TABLE "JobPosting"
(
	"JobPostingId" Serial PRIMARY KEY,
	"CategoryId" VARCHAR(20) NOT NULL,
	"SkillsId" Integer UNIQUE NOT NULL REFERENCES "Skills"("SkillsId"),
	"CompanyId" Integer NOT NULL REFERENCES "Company"("CompanyId"),
	"SalaryMin" Integer NOT NULL,
	"SalaryMax" Integer NOT NULL,
	"Description" VARCHAR(500) NOT NULL,
	"WhatWeOffer" VARCHAR(500) NOT NULL,
	"ExpirationDate" timestamp with time zone,
	"RowCreated" timestamp with time zone,
	"Experience" VARCHAR(7) NOT NULL,
	"Location" VARCHAR(20) NOT NULL,
	"Hybrid" Boolean NOT NULL,
	"Remote" Boolean NOT NULL,
	"BenefitsId" Integer NOT NULL REFERENCES "Benefits"("BenefitsId")
);

CREATE TRIGGER TrJobPostingRowCreatedTimeStamp
BEFORE INSERT ON "JobPosting"
FOR EACH ROW
EXECUTE FUNCTION set_timestamp();


ALTER TABLE "Skills"
add "UserId" Integer UNIQUE REFERENCES "User"("UserId"),
add "JobPostingId" Integer UNIQUE REFERENCES "JobPosting"("JobPostingId");

CREATE TABLE "Application"
(
	"ApplicationId" Serial PRIMARY KEY,
	"UserId" Integer NOT NULL REFERENCES "User"("UserId"),
	"JobPostingId" Integer NOT NULL REFERENCES "JobPosting"("JobPostingId"),
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
