export interface Job {
    id: string;
    link: string;
    title: string;
    description: string;
    publicationDate: string;
    coordinates: string;
    city: string;
    postalCode: string;
    department: string;
    region: string;
    sector: string;
    jobtitle: string;
    company: string;
    contractType: string[];
    salary: string;
}

export interface Jobs {
    total: number;
    ads: Job[];
}

export interface JobsResponse {
    content: Jobs
}
