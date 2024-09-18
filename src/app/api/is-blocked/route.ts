import ipinfo from "ipinfo";
import { BlackList } from "@/app/utils/black";
export const runtime = "edge";
export async function GET(request: any): Promise<void | Response> {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("remote-addr");

  return new Promise((resolve) => {
    ipinfo(ip, (err, cLoc) => {
      const response: any = { ip };
      if (err) {
        console.error(JSON.stringify(response), err);
        response.blocked = true;
        resolve(
          new Response(JSON.stringify(response), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": '*'
            },
          })
        );
      } else {
        console.log(`country: ${cLoc.country}`);
        console.log(`region: ${cLoc.region}`);
        console.log(`city: ${cLoc.city}`);
        if (BlackList.includes(cLoc.country ?? "")) {
          response.blocked = true;
        } else {
          response.blocked = false;
        }
        resolve(
          new Response(JSON.stringify(response), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": '*'
            },
          })
        );
      }
    });
  });
}