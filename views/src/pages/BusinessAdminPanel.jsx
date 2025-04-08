import { useParams } from "react-router-dom";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditYourInfo from "@/customComponents/BusinessUpdateInfo";
import SubmitWinners from "@/customComponents/SubmitWinners";
import ConfirmAttendance from "@/customComponents/ConfirmAttendance";
import LearnAndEarnQuestions from "@/customComponents/LearnAndEarnQuestions";



function BusinessAdminPanel() {
  const {id} = useParams();
  return (
    <div>
      <Tabs
        defaultValue="you"
        className="bg-[#333] border-transparent focus:border-[#F9EB02] text-white mb-4 rounded-xl"
      >
        <TabsList className="grid w-full grid-cols-5 bg-[#333] border border-gray-700 focus:border-[#F9EB02] text-white mb-4">
          <TabsTrigger
            value="you"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            You
          </TabsTrigger>
        
          <TabsTrigger
            value="learnAndEarnQuestions"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Learn and Earn Questions
          </TabsTrigger>
          <TabsTrigger
            value="submitWinners"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Submit Winners
          </TabsTrigger>
          <TabsTrigger
            value="confirmAttendance"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Confirm Attendance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="you">
          <EditYourInfo userType="business" id={id}/>
        </TabsContent>

        <TabsContent value="learnAndEarnQuestions">
         <LearnAndEarnQuestions id={id}/>
        </TabsContent>
        <TabsContent value="submitWinners">
          <SubmitWinners id={id}/>
        </TabsContent>
        <TabsContent value="confirmAttendance">
          <ConfirmAttendance />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BusinessAdminPanel;