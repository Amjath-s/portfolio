import { FiDownload, FiExternalLink } from "react-icons/fi";
import { resume } from "./data/resume";

export default function ResumePanel() {
  return (
    <div className="resume-panel">
      <header className="resume-top">
        <div>
          <h2 className="profile-panel-title">Resume</h2>
          <p className="repo-section-desc">
            View the PDF below or download a copy.
          </p>
        </div>
        <div className="resume-actions">
          <a
            className="project-action"
            href={resume.pdfUrl}
            download={resume.pdfFileName}
          >
            <FiDownload aria-hidden />
            Download PDF
          </a>
          <a
            className="project-action"
            href={resume.pdfUrl}
            target="_blank"
            rel="noreferrer"
          >
            <FiExternalLink aria-hidden />
            Open in new tab
          </a>
        </div>
      </header>

      <div className="resume-pdf-frame-wrap">
        <iframe
          className="resume-pdf-frame"
          title="Amjath S Resume"
          src={`${resume.pdfUrl}#view=FitH`}
        />
      </div>
    </div>
  );
}
