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
import ProSportsTrainerPath from "./pro-sports-trainer-path";
import NpbTrainerPath from "./npb-trainer-path";
import MlbTrainerPath from "./mlb-trainer-path";
import JLeagueTrainerPath from "./j-league-trainer-path";
import OverseasSoccerTrainerPath from "./overseas-soccer-trainer-path";
import BasketballTrainerPath from "./basketball-trainer-path";
import PtStudyHoursComparison from "./pt-study-hours-comparison";
import PtKokushiPassRate from "./pt-kokushi-pass-rate";
import PtKokushiStudyPlan from "./pt-kokushi-study-plan";
import PtEvidenceLevelGuide from "./pt-evidence-level-guide";
import PubmedSearchForPt from "./pubmed-search-for-pt";
import PtHowToReadPapers from "./pt-how-to-read-papers";

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
  "pro-sports-trainer-path": ProSportsTrainerPath,
  "npb-trainer-path": NpbTrainerPath,
  "mlb-trainer-path": MlbTrainerPath,
  "j-league-trainer-path": JLeagueTrainerPath,
  "overseas-soccer-trainer-path": OverseasSoccerTrainerPath,
  "basketball-trainer-path": BasketballTrainerPath,
  "pt-study-hours-comparison": PtStudyHoursComparison,
  "pt-kokushi-pass-rate": PtKokushiPassRate,
  "pt-kokushi-study-plan": PtKokushiStudyPlan,
  "pt-evidence-level-guide": PtEvidenceLevelGuide,
  "pubmed-search-for-pt": PubmedSearchForPt,
  "pt-how-to-read-papers": PtHowToReadPapers,
};
