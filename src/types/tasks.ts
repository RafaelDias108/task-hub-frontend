export interface Task {
    uuid_task?: String | null,
    uuid_project: String | null,
    title_task: String | null,
    description_task: String | null,
    date_task: String | null,
    time_task: String | null,
    is_completed?: boolean | Number | String,
}