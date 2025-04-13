export function ConvertToPercentage(total_tasks: number, total_tasks_completed: number){
    if (total_tasks == 0 && total_tasks_completed == 0){
        return 0
    }
    // return parseFloat(((total_tasks_completed / total_tasks) * 100).toFixed(2))
    return parseInt(((total_tasks_completed / total_tasks) * 100).toFixed(2))
}