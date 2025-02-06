import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export default function RaffleItem({
  item,
  description,
  quantity,
  resourceLink,
}) {
  function handleDelete(e) {
    e.target.parentElement.parentElement.remove();
    //call the api
    window.location.reload();
  }
  return (
    <Card className="bg-[#333] border border-gray-700 focus:border-[#F9EB02] text-white w-96 mr-6 ml-6 text-center">
      <CardTitle className="text-2xl mr-6 ml-6 mb-6 mt-6">{item}</CardTitle>
      <CardContent>
        <div className="grid grid-cols-3 grid-rows-3 mr-6 ml-6 gap-4 text-center align-middles">
          <div className="row-span-2">img</div>
          <div className="col-span-2 row-span-2">{description}</div>
          <div>Quantity: {quantity}</div>
          <div className="col-span-2">
            <a href={resourceLink} className="text-center">
              Resource Link
            </a>
          </div>
        </div>
      </CardContent>{" "}
      <CardFooter className="flex justify-center">
        <Button id="delete" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
