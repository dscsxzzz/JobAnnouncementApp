
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
	"UserStatus" VARCHAR(10),
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


CREATE OR REPLACE FUNCTION ForbidMoreThan10SkillsUser()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM "UserSkill"
    WHERE "UserId" = NEW."UserId"
  ) >= 10
  THEN 
    RAISE EXCEPTION 'Cannot add another skill. Exceeded Maximum amount (10).';
  END IF;

  IF EXISTS(
    SELECT "SkillId"
    FROM "UserSkill"
    WHERE "SkillId" = NEW."SkillId"
  )
  THEN 
    RAISE EXCEPTION 'Cannot add another skill. Exceeded Maximum amount (10).';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER TrForbidMoreThan10SkillsUser
BEFORE INSERT ON "UserSkill"
FOR EACH ROW
EXECUTE FUNCTION ForbidMoreThan10SkillsUser();

CREATE OR REPLACE FUNCTION ForbidMoreThan10SkillsJobPosting()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM "JobPostingSkill"
    WHERE "UserId" = NEW."UserId"
  ) >= 10
  THEN 
    RAISE EXCEPTION 'Cannot add another skill. Exceeded Maximum amount (10).';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER TrForbidMoreThan10SkillsJobPosting
BEFORE INSERT ON "JobPostingSkill"
FOR EACH ROW
EXECUTE FUNCTION ForbidMoreThan10SkillsJobPosting();