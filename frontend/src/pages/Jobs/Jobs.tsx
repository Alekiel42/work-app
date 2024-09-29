import JobList from "../../components/jobs/JobList/JobList";
import "./Jobs.scss"

function Jobs() {
    return (
        <main className="jobs">
            <h1 className="jobs__title">Ton job à Bordeaux</h1>
            <JobList/>
        </main>
    )
}

export default Jobs;