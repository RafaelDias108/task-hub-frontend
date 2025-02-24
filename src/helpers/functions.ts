export function ConvertToPercentage(total_tasks: number, total_tasks_completed: number){
    return parseFloat(((total_tasks_completed / total_tasks) * 100).toFixed(2))
}