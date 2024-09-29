import React from "react";
import "./JobCard.scss";
import {Job} from "../../../types/jobInterfaces";

interface JobCardProps {
    job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <article className="jobCard">
            <header className="jobCard__header">
                <h3 className="jobCard__title">{job.title}</h3>
                <p className="jobCard__company">{job.company}</p>
            </header>
            <section className="jobCard__details">
                <p className="jobCard__description">{job.description} [...]</p>
                <p className="jobCard__publicationDate">
                    <time dateTime={new Date(job.publicationDate).toISOString()}>
                        Publiée le {new Date(job.publicationDate).toLocaleDateString('fr-FR')}
                    </time>
                </p>
                <p className="jobCard__location">
                    <strong>Lieu :</strong> {job.city}, {job.department}
                </p>
                {job.contractType.length > 0 && (
                    <p className="jobCard__contractType">
                        <strong>Type de contrat :</strong> {job.contractType.join(', ')}
                    </p>
                )}
                {job.salary && (
                    <p className="jobCard__salary">
                        <strong>Rémunération :</strong> {job.salary}
                    </p>
                )}
            </section>
            <footer className="jobCard__footer">
                <a
                    href={job.link}
                    className="jobCard__applyButton"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Postuler
                </a>
            </footer>
        </article>
    );
};

export default JobCard;
