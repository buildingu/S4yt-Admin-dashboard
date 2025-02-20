import { useParams } from "react-router-dom";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditYourInfo from "@/customComponents/BusinessUpdateInfo";
import AddLearnAndEarnQuestion from "@/customComponents/AddLearnAndEarnQuestion";
import SubmitWinners from "@/customComponents/SubmitWinners";
import ConfirmAttendance from "@/customComponents/ConfirmAttendance";



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
            value="addLearnAndEarnQuestions"
            className="bg-[#333] focus:border-[#F9EB02] text-white mb-4"
          >
            Add Learn and Earn Questions
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
          <EditYourInfo userType="business" />
        </TabsContent>
        <TabsContent value="addLearnAndEarnQuestions">
          <AddLearnAndEarnQuestion id={id}/>
        </TabsContent>
        <TabsContent value="learnAndEarnQuestions">
          {/* do a forEach for learnAndEarnQuestions from the db data to render out as these blocks */}
          {/* <LearnAndEarnQuestion item="placeholderItem" description="placeholderDescription" /> */}
        </TabsContent>
        <TabsContent value="submitWinners">
          <SubmitWinners />
        </TabsContent>
        <TabsContent value="confirmAttendance">
          <ConfirmAttendance />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BusinessAdminPanel;
