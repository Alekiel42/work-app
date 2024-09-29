import Card from "../../common/Card/Card";
import JobCard from "../JobCard/JobCard";
import useFetchJobs from "../../../hooks/useFetchJobs";
import "./JobList.scss"
import {ChangeEvent, useState} from "react";
import {JobsResponse} from "../../../types/jobInterfaces";

function JobList() {
    const [jobTitle, setJobTitle] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { data : jobsInformation, loading} = useFetchJobs(searchTerm);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setJobTitle(event.target.value);
    }

    const handleSearch = () => {
        if (jobTitle.trim() !== "") {
            setSearchTerm(jobTitle);
        }
    }

    if (loading) return <div>Chargement...</div>;

    return (
        <>
            <div className="jobList__search">
                <input
                    type="text"
                    value={jobTitle}
                    onChange={handleInputChange}
                    placeholder="Entrez le titre du poste"
                />
                <button onClick={handleSearch}>Rechercher</button>
            </div>

            <ul className="jobList">
                {jobsInformation && jobsInformation.ads.length > 0 ? (
                    jobsInformation.ads.map((job) => (
                        <li key={job.id} className="jobList__item">
                            <Card>
                                <JobCard job={job} />
                            </Card>
                        </li>
                    ))
                ) : (
                    <li>Aucun job disponible.</li>
                )}
            </ul>
        </>
    )
}

export default JobList;