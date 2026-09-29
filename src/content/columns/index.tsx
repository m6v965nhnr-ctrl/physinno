import type { ComponentType } from "react";
import CasePresentationHowTo from "./case-presentation-how-to";
import CertifiedPtRenewal2026 from "./certified-pt-renewal-2026";
import PortfolioForJobChange from "./portfolio-for-job-change";
import ResumeWritingPt from "./resume-writing-pt";
import SoloPtWorkplace from "./solo-pt-workplace";
import TrainingSeminarSearch from "./training-seminar-search";
import PtOversupplyReality from "./pt-oversupply-reality";
import PtSalaryReality from "./pt-salary-reality";
import PtTokyoFamilyIncome from "./pt-tokyo-family-income";

export const COLUMN_BODIES: Record<string, ComponentType> = {
  "case-presentation-how-to": CasePresentationHowTo,
  "certified-pt-renewal-2026": CertifiedPtRenewal2026,
  "portfolio-for-job-change": PortfolioForJobChange,
  "resume-writing-pt": ResumeWritingPt,
  "solo-pt-workplace": SoloPtWorkplace,
  "training-seminar-search": TrainingSeminarSearch,
  "pt-oversupply-reality": PtOversupplyReality,
  "pt-salary-reality": PtSalaryReality,
  "pt-tokyo-family-income": PtTokyoFamilyIncome,
};
