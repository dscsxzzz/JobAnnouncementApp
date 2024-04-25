
CREATE OR REPLACE FUNCTION set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.RowCreated := now();
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
VALUES('Frontend'),('Backend'),('Fullstack'),('Dev-Ops');

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
VALUES('Sent'),('Opened'),('Rejected'),('Offer');

CREATE TABLE "Benefit"
(
	"BenefitId" Serial PRIMARY KEY,
	"Name" VARCHAR(20) NOT NULL
);

INSERT INTO "Benefit"("Name")
VALUES('Sent'),('Opened'),('Rejected'),('Offer');

CREATE TABLE "UserSkill"
(
	"UserSkillId" Serial PRIMARY KEY,
	"SkillId1" Integer REFERENCES "Skill"("SkillId"),
	"SkillId2" Integer REFERENCES "Skill"("SkillId"),
	"SkillId3" Integer REFERENCES "Skill"("SkillId"),
	"SkillId4" Integer REFERENCES "Skill"("SkillId"),
	"SkillId5" Integer REFERENCES "Skill"("SkillId"),
	"SkillId6" Integer REFERENCES "Skill"("SkillId"),
	"SkillId7" Integer REFERENCES "Skill"("SkillId"),
	"SkillId8" Integer REFERENCES "Skill"("SkillId"),
	"SkillId9" Integer REFERENCES "Skill"("SkillId"),
	"SkillId10" Integer REFERENCES "Skill"("SkillId")
);

CREATE TABLE "JobBenefit"
(
	"JobBenefitId" Serial PRIMARY KEY,
	"BenefitId1" Integer REFERENCES "Benefit"("BenefitId"),
	"BenefitId2" Integer REFERENCES "Benefit"("BenefitId"),
	"BenefitId3" Integer REFERENCES "Benefit"("BenefitId"),
	"BenefitId4" Integer REFERENCES "Benefit"("BenefitId"),
	"BenefitId5" Integer REFERENCES "Benefit"("BenefitId"),
	"BenefitId6" Integer REFERENCES "Benefit"("BenefitId"),
	"BenefitId7" Integer REFERENCES "Benefit"("BenefitId"),
	"BenefitId8" Integer REFERENCES "Benefit"("BenefitId"),
	"BenefitId9" Integer REFERENCES "Benefit"("BenefitId"),
	"BenefitId10"Integer REFERENCES "Benefit"("BenefitId")
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
	"ResumeId" Integer,
	"UserStatus" VARCHAR(10),
	"CompanyId" Integer 
		REFERENCES "Company"("CompanyId")
		Default NULL,
	"Email" VARCHAR(50) NOT NULL,
	"PhoneNumber" VARCHAR(15) NOT NULL,
	"UserSkillId" Integer UNIQUE REFERENCES "UserSkill"("UserSkillId")
);

CREATE TABLE "JobPosting"
(
	"JobPostingId" Serial PRIMARY KEY,
	"CategoryId" Integer NOT NULL REFERENCES "Category"("CategoryId"),
	"UserSkillId" Integer UNIQUE NOT NULL REFERENCES "UserSkill"("UserSkillId"),
	"UserId" Integer NOT NULL REFERENCES "User"("UserId"),
	"CompanyId" Integer NOT NULL REFERENCES "Company"("CompanyId"),
	"SalaryMin" Integer NOT NULL,
	"SalaryMax" Integer NOT NULL,
	"Description" VARCHAR(500) NOT NULL,
	"WhatWeOffer" VARCHAR(500) NOT NULL,
	"ExpirationDate" timestamp with time zone,
	"RowCreated" timestamp with time zone,
	"ExperienceId" Integer NOT NULL REFERENCES "Experience"("ExperienceId"),
	"Location" VARCHAR(20) NOT NULL,
	"Hybrid" Boolean NOT NULL,
	"Remote" Boolean NOT NULL,
	"JobBenefitId" Integer NOT NULL REFERENCES "JobBenefit"("JobBenefitId")
);

CREATE TRIGGER TrJobPostingRowCreatedTimeStamp
BEFORE INSERT ON "JobPosting"
FOR EACH ROW
EXECUTE FUNCTION set_timestamp();


ALTER TABLE "UserSkill"
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
