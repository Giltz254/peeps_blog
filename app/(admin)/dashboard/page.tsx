import { BarChartComponent } from "@/components/backend/BarChart"
import DashboardCards from "@/components/backend/DashboardCards"
import { PieChartComponent } from "@/components/backend/PieChart"
import { DataTableDemo } from "@/components/backend/Table"



const Dashboard = () => {
  return (
    <div className="bg-muted h-[calc(100vh-64px)] w-full">
        <div className="bg-white child rounded-md shadow-lg max-sm:p-2 sm:p-6 max-sm:my-2 max-sm:mx-2 sm:mx-6 sm:my-4 h-[calc(100vh-96px)] overflow-y-auto">
          <DashboardCards />
          <div className="mt-4 flex flex-col lg:flex-row w-full gap-4">
            <PieChartComponent />
            <BarChartComponent />
          </div>
        </div>
    </div>
  )
}

export default Dashboard