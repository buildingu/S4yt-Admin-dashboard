import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function SubmitWinners({ className, ...props }) {
    let [first, setFirst] = useState("");
    let [second, setSecond] = useState("");
    let [third, setThird] = useState("");
    function handleFirstChange(e) {
      setFirst(e.target.value);
    }
    function handleSecondChange(e) {
      setSecond(e.target.value);
    }
    function handleThirdChange(e) {
      setThird(e.target.value);
    }
    function handleSubmit() {
      let info = {
        firstID: first,
        secondID: second,
        thirdID: third,
      };
    }
    return (
      <div
        className={cn("flex flex-col gap-6 border-transparent", className)}
        {...props}
      >
        <Card className="bg-[#333] text-white mb-4 border-transparent">
          <CardHeader>
            <CardTitle className="text-2xl">Winners</CardTitle>
            <CardDescription className="text-gray-400">
              Submit the User IDs of the top 3 answers!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="first">First Place</Label>
                  <Input
                    className="text-white-400"
                    id="first"
                    type="text"
                    placeholder="Enter First Place ID"
                    required
                    onChange={handleFirstChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="second">Second Place</Label>
                  <Input
                    className="text-white-400"
                    id="second"
                    type="text"
                    placeholder="Enter Second Place ID"
                    required
                    onChange={handleSecondChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="third">Third Place</Label>
                  <Input
                    className="text-white-400"
                    id="third"
                    type="text"
                    placeholder="Enter Third Place ID"
                    required
                    onChange={handleThirdChange}
                  />
                </div>
                <br />
  
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  Create
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  
  export default SubmitWinners